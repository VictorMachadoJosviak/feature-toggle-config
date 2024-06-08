import { TtlType } from '../../common/services/cache/cache.types';

export class FeatureToggle {
  key: string;

  description: string;

  ttl: number;

  ttlType: TtlType;

  databasePercentage?: number;

  active: boolean;

  constructor(featureToggle: FeatureToggle) {
    this.key = featureToggle.key;
    this.description = featureToggle.description;
    this.ttl = featureToggle.ttl;

    this.ttlType =
      featureToggle.ttl === 0 ? TtlType.PERMANENT : featureToggle.ttlType;

    this.databasePercentage =
      featureToggle.databasePercentage === 0
        ? 100
        : featureToggle.databasePercentage;

    this.active = featureToggle.active;
  }
}
