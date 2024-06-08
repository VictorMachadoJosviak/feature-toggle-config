import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheService } from './services/cache/cache.service';
import { SettingsService } from './services/settings/settings.service';

@Module({
  imports: [
    CacheModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CacheService, SettingsService],
  exports: [CacheService, SettingsService],
})
export class CommonModule {}
