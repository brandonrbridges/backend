// Nest
import { Controller, Get, Param, Post, Query } from '@nestjs/common';

// Notifications Dependencies
import { NotificationDocument } from './notification.schema';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  findAll(@Query() query): Promise<NotificationDocument[]> {
    if (query) {
      return this.notificationsService.findAll(query);
    }

    return this.notificationsService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<NotificationDocument> {
    return this.notificationsService.findById(params.id);
  }

  @Post()
  insertOne(): Promise<NotificationDocument> {
    return;
  }
}
