// Nest
import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Tenancies Dependencies
import { TenanciesController } from './tenancies.controller';
import { TenancySchema } from './tenancies.schema';
import { TenanciesService } from './tenancies.service';

// Modules
import { UsersModule } from 'src/users/users.module';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenancy', schema: TenancySchema }]),
    PropertiesModule,
    UsersModule,
  ],
  controllers: [TenanciesController],
  providers: [TenanciesService],
})
export class TenanciesModule {}
