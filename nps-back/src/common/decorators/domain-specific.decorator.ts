import { HttpException, HttpStatus } from '@nestjs/common';

export function ValidateNpsScore() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (result && typeof result.npsScore === 'number') {
        if (result.npsScore < -100 || result.npsScore > 100) {
          throw new HttpException(
            'NPS Score deve estar entre -100 e 100',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      return result;
    };

    return descriptor;
  };
}

export function ClassifyCustomerType() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (result && result.rating !== undefined) {
        let customerType: string;

        if (result.rating >= 4) {
          customerType = 'promoter';
        } else if (result.rating === 3) {
          customerType = 'neutral';
        } else {
          customerType = 'detractor';
        }

        return {
          ...result,
          customerType,
        };
      }

      return result;
    };

    return descriptor;
  };
}

export function EnrichNpsResponse() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (result && result.rating !== undefined) {
        const enrichedData = {
          ...result,
          responseMetadata: {
            submittedAt: new Date().toISOString(),
            isValid: result.rating >= 0 && result.rating <= 5,
            category:
              result.rating >= 4
                ? 'promoter'
                : result.rating === 3
                  ? 'neutral'
                  : 'detractor',
            sentiment:
              result.rating >= 4
                ? 'positive'
                : result.rating === 3
                  ? 'neutral'
                  : 'negative',
          },
        };

        return enrichedData;
      }

      return result;
    };

    return descriptor;
  };
}

export function ValidateMinimumResponses(minResponses: number = 10) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (result && result.totalResponses !== undefined) {
        if (result.totalResponses < minResponses) {
          return {
            ...result,
            warning: `Amostra pequena: apenas ${result.totalResponses} respostas. Recomendamos pelo menos ${minResponses} para maior confiabilidade.`,
            isReliable: false,
          };
        }

        return {
          ...result,
          isReliable: true,
        };
      }

      return result;
    };

    return descriptor;
  };
}
