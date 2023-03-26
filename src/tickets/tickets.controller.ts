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
import { TicketDocument } from './ticket.schema';

// Dtos
import { CreateTicketDto } from './dtos/create.dto';
import { UpdateTicketDto } from './dtos/update.dto';

// Tickets Dependencies
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<TicketDocument[]> {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<TicketDocument> {
    return this.ticketsService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(@Body() data: CreateTicketDto): Promise<TicketDocument> {
    return this.ticketsService.insertOne(data);
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(
    @Param() params,
    @Body() data: UpdateTicketDto,
  ): Promise<TicketDocument> {
    return this.ticketsService.updateOne(params.id, data);
  }
}
