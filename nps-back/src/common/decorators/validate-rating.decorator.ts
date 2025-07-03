import { HttpException, HttpStatus } from '@nestjs/common';

export function ValidateRating(parameterIndex: number = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const dto = args[parameterIndex];

      if (dto && dto.rating !== undefined) {
        if (dto.rating < 0 || dto.rating > 5) {
          throw new HttpException(
            'A avaliação deve estar entre 0 e 5 estrelas',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
