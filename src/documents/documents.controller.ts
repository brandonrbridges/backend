import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

// Schemas
import { DocumentDocument } from './document.schema';

// Dtos
import { CreateDocumentDto } from './dtos/create.dto';
import { UpdateDocumentDto } from './dtos/update.dto';

// Documents Dependencies
import { DocumentsService } from './documents.service';
import {
  GCloudStorageFileInterceptor,
  UploadedFileMetadata,
} from '@aginix/nestjs-gcloud-storage';
import { FormDataRequest } from 'nestjs-form-data';

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

  @Post('upload')
  @HttpCode(201)
  @FormDataRequest()
  @UseInterceptors(
    GCloudStorageFileInterceptor('file', undefined, {
      // prefix: `avatars/`,
    }),
  )
  uploadDocument(
    @Param() params,
    @UploadedFile() file: UploadedFileMetadata,
    @Body() body,
  ) {
    console.log(params);
    console.log(file);
    console.log(body);

    return {
      message: 'File uploaded successfully',
      url: file.storageUrl,
    };
  }
}
