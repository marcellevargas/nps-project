import { HttpException, HttpStatus } from '@nestjs/common';

interface ValidateRequiredOptions {
  field: string;
  message: string;
  parameterIndex?: number;
}

export function ValidateRequired(options: ValidateRequiredOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const dto = args[options.parameterIndex || 0];

      if (dto && dto[options.field] !== undefined) {
        const value = dto[options.field];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          throw new HttpException(options.message, HttpStatus.BAD_REQUEST);
        }
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
