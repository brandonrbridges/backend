// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { TicketDocument } from './ticket.schema';

// Dtos
import { CreateTicketDto } from './dtos/create.dto';
import { UpdateTicketDto } from './dtos/update.dto';

// Services
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel('Ticket')
    private subscriptionModel: Model<TicketDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findAll(query): Promise<TicketDocument[]> {
    let data: TicketDocument[];

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

  async findById(id: string): Promise<TicketDocument> {
    const data = await this.subscriptionModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);

    return data;
  }

  async insertOne(data: CreateTicketDto): Promise<TicketDocument> {
    const created = new this.subscriptionModel(data);

    return created.save();
  }

  async updateOne(id: string, data: UpdateTicketDto): Promise<TicketDocument> {
    return await this.subscriptionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
