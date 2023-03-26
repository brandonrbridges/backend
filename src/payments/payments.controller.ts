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
import { PaymentDocument } from './payments.schema';

// Dtos
import { CreatePaymentDto } from './dtos/create.dto';
import { UpdatePaymentDto } from './dtos/update.dto';

// Payments Dependencies
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<PaymentDocument[]> {
    return this.paymentsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<PaymentDocument> {
    return this.paymentsService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(@Body() data: CreatePaymentDto): Promise<PaymentDocument> {
    return this.paymentsService.insertOne(data);
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(
    @Param() params,
    @Body() data: UpdatePaymentDto,
  ): Promise<PaymentDocument> {
    return this.paymentsService.updateOne(params.id, data);
  }
}
