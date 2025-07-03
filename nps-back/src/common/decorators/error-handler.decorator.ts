import { HttpException, HttpStatus } from '@nestjs/common';

export function ErrorHandler(
  defaultMessage: string,
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(defaultMessage, statusCode);
      }
    };

    return descriptor;
  };
}
