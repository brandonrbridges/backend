// Nest
import { Inject, Injectable, Query } from '@nestjs/common';

// Schema
import { UserDocument } from 'src/users/user.schema';

// Service
import { UsersService } from 'src/users/users.service';
import { PropertiesService } from 'src/properties/properties.service';

@Injectable()
export class TenantsService {
  constructor(
    @Inject(UsersService) private readonly usersService,
    @Inject(PropertiesService) private readonly propertiesService,
  ) {}

  async findAll(query): Promise<UserDocument[]> {
    const properties = await this.propertiesService.findAll(query);

    const tenants: UserDocument[] = [];

    properties.forEach((property) => {
      if (property.tenant_id) tenants.push(property.tenant);
    });

    return tenants;
  }
}
