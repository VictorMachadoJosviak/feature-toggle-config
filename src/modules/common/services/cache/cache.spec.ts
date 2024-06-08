import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CacheService } from './cache.service';
import { CacheOptions, TtlType } from './cache.types';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    cacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
      reset: jest.fn(),
      store: undefined,
      wrap: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        { provide: CACHE_MANAGER, useValue: cacheManager },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get value from cache', async () => {
    const key = 'testKey';
    const value = 'testValue';
    (cacheManager.get as jest.Mock).mockResolvedValue(value);

    expect(await service.get(key)).toBe(value);
    expect(cacheManager.get).toHaveBeenCalledWith(key);
  });

  it('should set value to cache', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const options: CacheOptions = { ttl: 1, ttlType: TtlType.SECONDS };

    await service.set(key, value, options);
    expect(cacheManager.set).toHaveBeenCalledWith(key, value, 1000);
  });

  it('should set value to cache expires 1 hour', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const options: CacheOptions = { ttl: 1, ttlType: TtlType.HOURS };

    await service.set(key, value, options);
    expect(cacheManager.set).toHaveBeenCalledWith(key, value, 3600000);
  });

  it('should delete value from cache', async () => {
    const key = 'testKey';

    await service.del(key);
    expect(cacheManager.del).toHaveBeenCalledWith(key);
  });
});
