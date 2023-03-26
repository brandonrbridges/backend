// Nest
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

// Property Dependencies
import { PropertyDocument } from './property.schema';
import { PropertiesService } from './properties.service';

// Dtos
import { CreatePropertyDto } from './dtos/create.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<PropertyDocument[]> {
    return this.propertiesService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<PropertyDocument> {
    return this.propertiesService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(@Body() data: CreatePropertyDto): Promise<PropertyDocument> {
    return this.propertiesService.insertOne(data);
  }
}
