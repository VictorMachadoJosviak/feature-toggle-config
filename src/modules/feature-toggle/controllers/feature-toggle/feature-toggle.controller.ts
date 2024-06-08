import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  findOne(@Param('key') key: string) {
    return this.featureToggleService.findOne(key);
  }

  @Get(':key/details')
  details(@Param('key') key: string) {
    return this.featureToggleService.details(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.featureToggleService.remove(key);
  }
}
