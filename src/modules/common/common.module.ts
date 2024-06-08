import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache/cache.service';

@Module({
  imports: [CacheModule.register({})],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
