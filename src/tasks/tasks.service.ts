// Nest
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

// Schemas
import { Message, TaskDocument, UpdateHistory } from './task.schema';

// Services
import { UsersService } from 'src/users/users.service';
import { PropertiesService } from 'src/properties/properties.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private taskModel: Model<TaskDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(PropertiesService)
    private readonly propertiesService: PropertiesService,
  ) {}

  async findAll(query?): Promise<TaskDocument[]> {
    let data: TaskDocument[];

    if (query) {
      data = await this.taskModel
        .find(
          query.user_id
            ? {
                $or: [
                  { user_id: query.user_id },
                  { landlord_id: query.user_id },
                ],
              }
            : query,
        )
        .exec();
    } else {
      data = await this.taskModel.find().exec();
    }

    const collated = data?.map(async (task) => {
      task.user = await this.usersService.findById(task.user_id);

      if (task.property_id)
        task.property = await this.propertiesService.findById(task.property_id);

      return task;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();

    task.user = await this.usersService.findById(task.user_id);

    if (task.property_id) {
      const property = await this.propertiesService.findById(task.property_id);

      task.property = property;
    }

    return task;
  }

  async findMessages(id: string): Promise<Message[]> {
    const task = await this.taskModel.findById(id).exec();

    const collated = task.messages?.map(async (message) => {
      const user = await this.usersService.findById(message.user_id);

      return {
        ...message,
        user,
      };
    });

    return Promise.all(collated).then((data) => data);
  }

  async findUpdateHistory(id: string): Promise<UpdateHistory[]> {
    const task = await this.taskModel.findById(id).exec();
    const update_history = task.update_history;

    if (!update_history || update_history.length === 0)
      throw new NotFoundException('No data found');

    const collated = [];

    let currentMessage = '';
    let consecutiveMessages = 0;

    for (const update of update_history) {
      if (!update.user_id) continue;

      const user = await this.usersService.findById(update.user_id);

      if (update.message !== currentMessage) {
        currentMessage = update.message;
        consecutiveMessages = 1;

        collated.push({
          ...update,
          user: user,
        });
      } else {
        consecutiveMessages++;

        if (consecutiveMessages >= 4) {
          const update: UpdateHistory = {
            message: `+${consecutiveMessages - 3} more updates like this`,
          };

          collated.pop();

          collated.push(update);
        } else {
          collated.push({
            ...update,
            user,
          });
        }
      }
    }

    if (collated.length >= 3 && update_history.length >= 3) {
      const message = update_history[update_history.length - 1];
      const user = await this.usersService.findById(message.user_id);

      collated.push({
        ...message,
        user: user,
      });
    }

    return Promise.all(collated).then((data) => data);
  }

  async findOne(args: object): Promise<TaskDocument> {
    return this.taskModel.findOne(args).exec();
  }

  async insertOne(data): Promise<TaskDocument> {
    let task = new this.taskModel(data);

    return await task.save();
  }

  async insertMessage(id: string, data): Promise<TaskDocument> {
    const _id = new mongoose.Types.ObjectId();
    const created_at = new Date();

    return await this.taskModel
      .findByIdAndUpdate(id, {
        $push: {
          messages: {
            _id,
            ...data,
            created_at,
          },
          update_history: {
            _id,
            message: 'New message added',
            user_id: data.user_id,
            created_at,
          },
        },
      })
      .exec();
  }

  async deleteMessage(id: string, message_id: mongoose.Schema.Types.ObjectId) {
    try {
      const task = await this.taskModel.findById(id).exec();

      const messages = task.messages.filter(
        (message) => message._id.toString() !== message_id.toString(),
      );

      const update_history = task.update_history.filter(
        (update) => update._id.toString() !== message_id.toString(),
      );

      if (!messages && !update_history)
        throw new NotFoundException('Message not found');

      return await this.taskModel
        .findByIdAndUpdate(
          id,
          {
            messages,
            update_history,
          },
          {
            new: true,
          },
        )
        .exec();
    } catch (err) {
      throw new BadRequestException('Unable to delete message');
    }
  }
}
