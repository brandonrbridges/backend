// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { PaymentDocument } from './payments.schema';

// Dtos
import { CreatePaymentDto } from './dtos/create.dto';
import { UpdatePaymentDto } from './dtos/update.dto';

// Services
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel('Payment') private paymentModel: Model<PaymentDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findAll(query): Promise<PaymentDocument[]> {
    let data: PaymentDocument[];

    if (query) {
      data = await this.paymentModel.find(query).exec();
    } else {
      data = await this.paymentModel.find().exec();
    }

    const collated = data?.map(async (payment) => {
      payment.user = await this.usersService.findById(payment.user_id);

      return payment;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<PaymentDocument> {
    const data = await this.paymentModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);

    return data;
  }

  async insertOne(data: CreatePaymentDto): Promise<PaymentDocument> {
    const created = new this.paymentModel(data);

    return created.save();
  }

  async updateOne(
    id: string,
    data: UpdatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
