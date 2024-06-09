import { ApiProperty } from '@nestjs/swagger';
import { TtlType } from '../../../common/services/cache/cache.types';

export class FeatureToggleResponseDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ttl: number;

  @ApiProperty({
    enum: TtlType,
  })
  ttlType: TtlType;

  @ApiProperty()
  databasePercentage: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  expiresIn: string;
}
