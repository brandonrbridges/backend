import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification')
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async findAll(query?: object): Promise<NotificationDocument[]> {
    if (query) {
      return this.notificationModel.find(query).exec();
    }

    return this.notificationModel.find().exec();
  }

  async findById(id: string): Promise<NotificationDocument> {
    return this.notificationModel.findById(id).exec();
  }

  async findOne(args: object): Promise<NotificationDocument> {
    return this.notificationModel.findOne(args).exec();
  }
}
