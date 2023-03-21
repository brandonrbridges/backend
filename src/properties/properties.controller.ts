import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { PropertyDocument } from './property.schema';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  findAll(@Query() query): Promise<PropertyDocument[]> {
    if (query) {
      return this.propertiesService.findAll(query);
    }

    return this.propertiesService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<PropertyDocument> {
    return this.propertiesService.findById(params.id);
  }

  @Post()
  insertOne(): Promise<PropertyDocument> {
    return;
  }
}
