import { Logger } from '@nestjs/common';

export function AuditLog(operation: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const logger = new Logger(target.constructor.name);

    descriptor.value = async function (...args: any[]) {
      const timestamp = new Date().toISOString();

      logger.log(`[${timestamp}] Starting ${operation}`);

      try {
        const result = await originalMethod.apply(this, args);

        logger.log(`[${timestamp}] ${operation} completed successfully`);

        return result;
      } catch (error) {
        logger.error(`[${timestamp}] ${operation} failed: ${error.message}`);
        throw error;
      }
    };

    return descriptor;
  };
}
