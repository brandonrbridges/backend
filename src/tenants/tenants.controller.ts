// Nest
import { Controller, Get, Query } from '@nestjs/common';

// Schema
import { UserDocument } from 'src/users/user.schema';

// Services
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get()
  findAll(@Query() query): Promise<UserDocument[]> {
    return this.tenantsService.findAll(query);
  }
}
