import { AiModule } from './ai/ai.module';
// NestJS Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Application Dependencies
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Application Modules
import { AuthModule } from './auth/auth.module';
import { InvitationsModule } from './invitations/invitations.module';
import { PropertiesModule } from './properties/properties.module';
import { TasksModule } from './tasks/tasks.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { GCloudStorageModule } from '@aginix/nestjs-gcloud-storage';
import { OpenAIModule } from '@platohq/nestjs-openai';

@Module({
  imports: [
    // NestJS Modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GCloudStorageModule.withConfig({
      keyFile: require('./service_account.json'),
      defaultBucketname: 'hello-home.app',
      storageBaseUri: 'https://storage.googleapis.com',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    OpenAIModule.register({
      apiKey: process.env.OPENAI_KEY,
    }),
    // Application Modules
    AiModule,
    AuthModule,
    InvitationsModule,
    PropertiesModule,
    TasksModule,
    TenantsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
