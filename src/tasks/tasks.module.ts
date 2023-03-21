import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Task Dependencies
import { TaskSchema } from './task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// Modules
import { UsersModule } from 'src/users/users.module';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    UsersModule,
    PropertiesModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
