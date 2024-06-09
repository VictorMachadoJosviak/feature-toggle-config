import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-store';
import { CacheOptions, TtlType, ttlValues } from './cache.types';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache & RedisStore,
  ) {}

  get<T>(key: string) {
    return this.cacheManager.get<T>(key);
  }

  set<T>(key: string, value: T, options?: CacheOptions) {
    const ttlType = options.ttl === 0 ? TtlType.PERMANENT : options.ttlType;

    const ttlValue = ttlValues[ttlType] || ttlValues.PERMANENT;

    const ttl = options.ttl * ttlValue;

    return this.cacheManager.set(key, value, { ttl }, null);
  }

  del(key: string) {
    return this.cacheManager.del(key);
  }

  getTTL(key: string) {
    return this.cacheManager.store.ttl(key);
  }
}
