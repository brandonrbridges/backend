// Nest
import {
  Body,
  Controller,
  Get,
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
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<UserDocument> {
    return this.usersService.findById(params.id);
  }

  @Post()
  insertOne(): Promise<UserDocument> {
    return;
  }

  @Patch(':id')
  updateOne(@Param() params, @Body() data) {
    return this.usersService.updateOne(params.id, data);
  }

  @Post(':id/upload-avatar')
  @UseInterceptors(
    GCloudStorageFileInterceptor('file', undefined, {
      prefix: `users/avatars`,
    }),
  )
  uploadAvatar(@Param() params, @UploadedFile() file: UploadedFileMetadata) {
    return this.usersService.updateOne(params.id, {
      avatar_url: file.storageUrl,
    });
  }
}
