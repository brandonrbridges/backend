// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { SubscriptionDocument } from './subscription.schema';

// Dtos
import { CreateSubscriptionDto } from './dtos/create.dto';
import { UpdateSubscriptionDto } from './dtos/update.dto';

// Services
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel('Subscription')
    private subscriptionModel: Model<SubscriptionDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findAll(query): Promise<SubscriptionDocument[]> {
    let data: SubscriptionDocument[];

    if (query) {
      data = await this.subscriptionModel.find(query).exec();
    } else {
      data = await this.subscriptionModel.find().exec();
    }

    const collated = data?.map(async (subscription) => {
      subscription.user = await this.usersService.findById(
        subscription.user_id,
      );

      return subscription;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<SubscriptionDocument> {
    const data = await this.subscriptionModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);

    return data;
  }

  async insertOne(data: CreateSubscriptionDto): Promise<SubscriptionDocument> {
    const created = new this.subscriptionModel(data);

    return created.save();
  }

  async updateOne(
    id: string,
    data: UpdateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    return await this.subscriptionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
