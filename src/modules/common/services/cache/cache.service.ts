import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheOptions, TtlType, ttlValues } from './cache.types';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string) {
    return this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, options?: CacheOptions) {
    const ttlType = options.ttl === 0 ? TtlType.PERMANENT : options.ttlType;

    const ttlValue = ttlValues[ttlType] || ttlValues.PERMANENT;

    const ttl = options.ttl * ttlValue;

    return this.cacheManager.set(key, value, ttl);
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }
}
