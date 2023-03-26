// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

// Schemas
import { PropertyDocument } from './property.schema';

// Services
import { UsersService } from 'src/users/users.service';
import { CreatePropertyDto } from './dtos/create.dto';
import { UpdatePropertyDto } from './dtos/update.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel('Property') private propertyModel: Model<PropertyDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findAll(query): Promise<PropertyDocument[]> {
    let data: PropertyDocument[];

    if (query) {
      data = await this.propertyModel.find(query).exec();
    } else {
      data = await this.propertyModel.find().exec();
    }

    const collated = data?.map(async (property) => {
      if (property.tenant_id) {
        property.tenant = await this.usersService.findById(property.tenant_id);
      }

      return property;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<PropertyDocument> {
    const data = await this.propertyModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);

    if (data.tenant_id) {
      data.tenant = await this.usersService.findById(data.tenant_id);
    }

    return data;
  }

  async findOne(args: object): Promise<PropertyDocument> {
    return this.propertyModel.findOne(args).exec();
  }

  async insertOne(data: CreatePropertyDto): Promise<PropertyDocument> {
    const createdProperty = new this.propertyModel({
      ...data,
      status: 'setup',
      created_at: new Date(),
    });

    return createdProperty.save();
  }

  async updateOne(
    id: mongoose.Schema.Types.ObjectId,
    data: UpdatePropertyDto,
  ): Promise<PropertyDocument> {
    return await this.propertyModel.findOneAndUpdate(id, data, { new: true });
  }
}
