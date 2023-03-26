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
import { DocumentDocument } from './document.schema';

// Dtos
import { CreateDocumentDto } from './dtos/create.dto';
import { UpdateDocumentDto } from './dtos/update.dto';

// Documents Dependencies
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @HttpCode(200)
  findAll(@Query() query): Promise<DocumentDocument[]> {
    return this.documentsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<DocumentDocument> {
    return this.documentsService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  insertOne(@Body() data: CreateDocumentDto): Promise<DocumentDocument> {
    return this.documentsService.insertOne(data);
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(
    @Param() params,
    @Body() data: UpdateDocumentDto,
  ): Promise<DocumentDocument> {
    return this.documentsService.updateOne(params.id, data);
  }
}
