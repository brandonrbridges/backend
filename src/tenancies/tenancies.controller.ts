import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// Schemas
import { TenancyDocument } from './tenancies.schema';

// Dtos
import { CreateTenancyDto } from './dtos/create.dto';
import { UpdateTenancyDto } from './dtos/update.dto';

// Tenancies Dependencies
import { TenanciesService } from './tenancies.service';

@Controller('tenancies')
export class TenanciesController {
  constructor(private readonly tenanciesService: TenanciesService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<TenancyDocument[]> {
    return this.tenanciesService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<TenancyDocument> {
    return this.tenanciesService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(@Body() data: CreateTenancyDto): Promise<TenancyDocument> {
    return this.tenanciesService.insertOne(data);
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(
    @Param() params,
    @Body() data: UpdateTenancyDto,
  ): Promise<TenancyDocument> {
    return this.tenanciesService.updateOne(params.id, data);
  }
}
