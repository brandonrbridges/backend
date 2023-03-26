// NestJS Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Application Dependencies
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Application Modules
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { PropertiesModule } from './properties/properties.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TenanciesModule } from './tenancies/tenancies.module';
import { TasksModule } from './tasks/tasks.module';
import { TenantsModule } from './tenants/tenants.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

// Third Party Modules
import { GCloudStorageModule } from '@aginix/nestjs-gcloud-storage';
import { OpenAIModule } from '@platohq/nestjs-openai';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    // NestJS Modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GCloudStorageModule.withConfig({
      keyFile: './service_account.json',
      defaultBucketname: 'hello-home.app',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    NestjsFormDataModule.config({
      isGlobal: true,
    }),
    OpenAIModule.register({
      apiKey: process.env.OPENAI_KEY,
    }),
    // Application Modules
    AiModule,
    AuthModule,
    DocumentsModule,
    NotificationsModule,
    PaymentsModule,
    PropertiesModule,
    SubscriptionsModule,
    TasksModule,
    TenanciesModule,
    TenantsModule,
    TicketsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
