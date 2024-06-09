import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TtlType } from '../../../common/services/cache/cache.types';
import { FeatureToggleResquestDto } from '../../dto/request/feature-toggle.dto';
import { FeatureToggleResponseDto } from '../../dto/response/feature-toggle.dto';
import { FeatureToggleService } from '../../services/feature-toggle/feature-toggle.service';

@ApiTags('feature-toggle')
@Controller('feature-toggle')
export class FeatureToggleController {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    description: 'Feature toggle details',
    type: FeatureToggleResquestDto,
    examples: {
      example: {
        description: 'Feature toggle description',
        value: {
          key: 'feature-key',
          description: 'Feature toggle description',
          ttl: 100,
          ttlType: `(Enum) ${TtlType.MINUTES}, ${TtlType.HOURS}, ${TtlType.DAYS}, ${TtlType.WEEKS}, ${TtlType.MONTHS}, ${TtlType.YEARS}`,
          databasePercentage: 100,
          active: true,
        },
      },
    },
  })
  create(@Body() createFeatureToggleDto: FeatureToggleResquestDto) {
    return this.featureToggleService.create(createFeatureToggleDto);
  }

  @Get(':key')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Feature enabled',
    type: Boolean,
  })
  findOne(@Param('key') key: string) {
    return this.featureToggleService.findOne(key);
  }

  @Get(':key/details')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Feature toggle details',
    type: FeatureToggleResponseDto,
  })
  details(@Param('key') key: string) {
    return this.featureToggleService.details(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.featureToggleService.remove(key);
  }
}
