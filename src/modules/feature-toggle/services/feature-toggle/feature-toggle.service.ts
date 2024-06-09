import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '../../../common/services/cache/cache.service';
import { FeatureToggleResquestDto } from '../../dto/request/feature-toggle.dto';
import { FeatureToggleResponseDto } from '../../dto/response/feature-toggle.dto';
import { FeatureToggle } from '../../entities/feature-toggle.entity';
import { formatTTL } from '../../helpers/ttl/format-ttl.helper';

@Injectable()
export class FeatureToggleService {
  constructor(private readonly cacheService: CacheService) {}

  create(createFeatureToggleDto: FeatureToggleResquestDto) {
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

    if (!featureToggle.active) {
      return false;
    }

    const calculateDatabasePercentage = Math.random() * 100;

    if (calculateDatabasePercentage > featureToggle.databasePercentage) {
      return false;
    }

    return true;
  }

  async details(key: string): Promise<FeatureToggleResponseDto> {
    const featureToggle = await this.cacheService.get<FeatureToggle>(key);

    if (!featureToggle) {
      throw new NotFoundException(`Key ${key} not found`);
    }

    const ttl = await this.cacheService.getExpiresIn(key);

    return {
      key: featureToggle.key,
      description: featureToggle.description,
      ttl: featureToggle.ttl,
      ttlType: featureToggle.ttlType,
      databasePercentage: featureToggle.databasePercentage,
      active: featureToggle.active,
      expiresIn: formatTTL(ttl),
    };
  }

  remove(key: string) {
    return this.cacheService.del(key);
  }
}
