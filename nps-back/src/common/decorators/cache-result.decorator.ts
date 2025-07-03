import { Logger } from '@nestjs/common';

interface CacheEntry {
  result: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export function CacheResult(ttlMinutes: number = 5) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const logger = new Logger(target.constructor.name);

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
      const now = Date.now();
      const ttlMs = ttlMinutes * 60 * 1000;

      const cached = cache.get(cacheKey);
      if (cached && now - cached.timestamp < ttlMs) {
        logger.log(`Cache hit for ${propertyKey}`);
        return cached.result;
      }

      const result = await originalMethod.apply(this, args);

      cache.set(cacheKey, {
        result,
        timestamp: now,
      });

      logger.log(`Cache miss for ${propertyKey} - result cached`);

      return result;
    };

    return descriptor;
  };
}
