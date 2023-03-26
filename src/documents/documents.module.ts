// Nest
import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Documents Dependencies
import { DocumentsController } from './documents.controller';
import { DocumentSchema } from './document.schema';
import { DocumentsService } from './documents.service';

// Modules
import { UsersModule } from 'src/users/users.module';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
    PropertiesModule,
    UsersModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
