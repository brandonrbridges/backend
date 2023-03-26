// Nest
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

// User dependencies
import { UserDocument } from './user.schema';
import { UsersService } from './users.service';

// Google Cloud Storage
import {
  GCloudStorageFileInterceptor,
  UploadedFileMetadata,
} from '@aginix/nestjs-gcloud-storage';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param() params): Promise<UserDocument> {
    return this.usersService.findById(params.id);
  }

  @Get('search/:query')
  @HttpCode(200)
  search(@Param() params): Promise<UserDocument[]> {
    return this.usersService.searchByEmail(params.query);
  }

  @Post()
  @HttpCode(201)
  insertOne(): Promise<UserDocument> {
    return;
  }

  @Patch(':id')
  @HttpCode(201)
  updateOne(@Param() params, @Body() data) {
    return this.usersService.updateOne(params.id, data);
  }

  @Post(':id/upload-avatar')
  @HttpCode(201)
  @UseInterceptors(
    GCloudStorageFileInterceptor('file', undefined, {
      prefix: `avatars/`,
    }),
  )
  uploadAvatar(@Param() params, @UploadedFile() file: UploadedFileMetadata) {
    return this.usersService.updateOne(params.id, {
      avatar_url: file.storageUrl,
    });
  }
}
