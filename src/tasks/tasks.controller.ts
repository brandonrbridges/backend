import type { Message, UpdateHistory } from './task.schema';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TaskDocument } from './task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Promise<TaskDocument[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<TaskDocument> {
    return this.tasksService.findById(params.id);
  }

  @Post()
  insertOne(@Body() data): Promise<TaskDocument> {
    return this.tasksService.insertOne(data);
  }

  @Get(':id/messages')
  findMessages(@Param() params): Promise<Message[]> {
    return this.tasksService.findMessages(params.id);
  }

  @Get(':id/update-history')
  findUpdateHistory(@Param() params): Promise<UpdateHistory[]> {
    return this.tasksService.findUpdateHistory(params.id);
  }

  @Post(':id/new-message')
  insertMessage(@Param() params, @Body() data): Promise<TaskDocument> {
    return this.tasksService.insertMessage(params.id, data);
  }

  @Patch(':id/delete-message')
  deleteMessage(@Param() params, @Body() data): Promise<TaskDocument> {
    return this.tasksService.deleteMessage(params.id, data.message_id);
  }
}
