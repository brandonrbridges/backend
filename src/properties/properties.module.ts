import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Property Dependencies
import { PropertySchema } from './property.schema';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { PropertiesGateway } from './properties.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
    UsersModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, PropertiesGateway],
  exports: [PropertiesService],
})
export class PropertiesModule {}
