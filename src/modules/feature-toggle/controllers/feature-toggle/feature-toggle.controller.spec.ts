import { Test, TestingModule } from '@nestjs/testing';

import { FeatureToggleService } from '../../services/feature-toggle/feature-toggle.service';
import { FeatureToggleController } from './feature-toggle.controller';

describe('FeatureToggleController', () => {
  let controller: FeatureToggleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureToggleController],
      providers: [FeatureToggleService],
    }).compile();

    controller = module.get<FeatureToggleController>(FeatureToggleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
