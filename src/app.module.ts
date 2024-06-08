import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { FeatureToggleModule } from './modules/feature-toggle/feature-toggle.module';

@Module({
  imports: [CommonModule, FeatureToggleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
