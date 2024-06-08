import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '../../../common/services/cache/cache.service';
import { FeatureToggleDto } from '../../dto/feature-toggle.dto';
import { FeatureToggle } from '../../entities/feature-toggle.entity';

@Injectable()
export class FeatureToggleService {
  constructor(private readonly cacheService: CacheService) {}

  create(createFeatureToggleDto: FeatureToggleDto) {
    console.log(createFeatureToggleDto);

    return this.cacheService.set(
      createFeatureToggleDto.key,
      new FeatureToggle(createFeatureToggleDto),
      {
        ttl: createFeatureToggleDto.ttl,
        ttlType: createFeatureToggleDto.ttlType,
      },
    );
  }

  async findOne(key: string) {
    const featureToggle = await this.details(key);

    const calculateDatabasePercentage = Math.random() * 100;

    if (calculateDatabasePercentage > featureToggle.databasePercentage) {
      return false;
    }

    return true;
  }

  async details(key: string) {
    const featureToggle = await this.cacheService.get<FeatureToggleDto>(key);

    if (!featureToggle) {
      throw new NotFoundException(`Key ${key} not found`);
    }

    return featureToggle;
  }

  remove(key: string) {
    return this.cacheService.del(key);
  }
}
