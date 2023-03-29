// Nest
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

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
import { NotFoundError } from 'rxjs';

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
      tenancy.tenant = await this.usersService.findById(tenancy.tenant_id);
      tenancy.property = await this.propertiesService.findById(
        tenancy.property_id,
      );

      return tenancy;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<TenancyDocument> {
    const data = await this.tenancyModel.findById(id).exec();

    data.tenant = await this.usersService.findById(data.tenant_id);
    data.property = await this.propertiesService.findById(data.property_id);

    return data;
  }

  async findByPropertyId(property_id): Promise<TenancyDocument> {
    let data = await this.tenancyModel.findOne({ property_id }).exec();

    if (!data) return null;

    data.tenant = await this.usersService.findById(data.tenant_id);
    data.property = await this.propertiesService.findById(data.property_id);

    return data;
  }

  async insertOne(data: CreateTenancyDto): Promise<TenancyDocument> {
    const created = new this.tenancyModel(data);

    return await created.save();
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
