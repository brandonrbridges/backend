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
import { SubscriptionDocument } from './subscription.schema';

// Dtos
import { CreateSubscriptionDto } from './dtos/create.dto';
import { UpdateSubscriptionDto } from './dtos/update.dto';

// Subscriptions Dependencies
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<SubscriptionDocument[]> {
    return this.subscriptionsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<SubscriptionDocument> {
    return this.subscriptionsService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(
    @Body() data: CreateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionsService.insertOne(data);
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(
    @Param() params,
    @Body() data: UpdateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionsService.updateOne(params.id, data);
  }
}
