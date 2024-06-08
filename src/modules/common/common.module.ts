import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheService } from './services/cache/cache.service';
import { SettingsService } from './services/settings/settings.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configs: SettingsService) => ({
        isGlobal: true,
        max: 10_000,
        store: (): any =>
          redisStore({
            socket: {
              host: configs.get('REDIS_HOST').toString(),
              port: Number(configs.get('REDIS_PORT')),
            },
          }),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CacheService, SettingsService],
  exports: [CacheService, SettingsService],
})
export class CommonModule {}
