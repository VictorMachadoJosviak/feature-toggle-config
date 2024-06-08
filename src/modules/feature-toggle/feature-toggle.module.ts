import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { FeatureToggleController } from './controllers/feature-toggle/feature-toggle.controller';
import { FeatureToggleService } from './services/feature-toggle/feature-toggle.service';

@Module({
  imports: [CommonModule],
  controllers: [FeatureToggleController],
  providers: [FeatureToggleService],
})
export class FeatureToggleModule {}
