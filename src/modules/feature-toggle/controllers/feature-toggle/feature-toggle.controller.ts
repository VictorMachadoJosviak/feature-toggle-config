import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FeatureToggleDto } from '../../dto/feature-toggle.dto';
import { FeatureToggleService } from '../../services/feature-toggle/feature-toggle.service';

@ApiTags('feature-toggle')
@Controller('feature-toggle')
export class FeatureToggleController {
  constructor(private readonly featureToggleService: FeatureToggleService) {}

  @Post()
  create(@Body() createFeatureToggleDto: FeatureToggleDto) {
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
    type: FeatureToggleDto,
  })
  details(@Param('key') key: string) {
    return this.featureToggleService.details(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.featureToggleService.remove(key);
  }
}
