import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { TtlType } from '../../../common/services/cache/cache.types';

export class FeatureToggleResquestDto {
  @IsString()
  @ApiProperty()
  key: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @Min(0)
  ttl: number;

  @ApiProperty({
    enum: TtlType,
  })
  @IsEnum(TtlType)
  ttlType: TtlType;

  @ApiProperty()
  @Min(0)
  @Max(100)
  @IsInt()
  @IsOptional()
  databasePercentage: number = 100;

  @ApiProperty()
  @IsOptional()
  active: boolean = true;
}
