// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { TenancyDocument } from './tenancies.schema';

// Dtos
import { CreateTenancyDto } from './dtos/create.dto';

// Services
import { PropertiesService } from 'src/properties/properties.service';
import { UsersService } from 'src/users/users.service';
import { UpdateTenancyDto } from './dtos/update.dto';

@Injectable()
export class TenanciesService {
  constructor(
    @InjectModel('Tenancy') private tenancyModel: Model<TenancyDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(PropertiesService)
    private readonly propertiesService: PropertiesService,
  ) {}

  async findAll(query): Promise<TenancyDocument[]> {
    let data: TenancyDocument[];

    if (query) {
      data = await this.tenancyModel.find(query).exec();
    } else {
      data = await this.tenancyModel.find().exec();
    }

    const collated = data?.map(async (tenancy) => {
      tenancy.user = await this.usersService.findById(tenancy.user_id);
      tenancy.property = await this.propertiesService.findById(
        tenancy.property_id,
      );

      return tenancy;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<TenancyDocument> {
    const data = await this.tenancyModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);
    data.property = await this.propertiesService.findById(data.property_id);

    return data;
  }

  async insertOne(data: CreateTenancyDto): Promise<TenancyDocument> {
    const created = new this.tenancyModel(data);

    return created.save();
  }

  async updateOne(
    id: string,
    data: UpdateTenancyDto,
  ): Promise<TenancyDocument> {
    return await this.tenancyModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
