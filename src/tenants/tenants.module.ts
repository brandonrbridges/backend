import { Module } from '@nestjs/common';

// Tenants Dependencies
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

// Modules
import { UsersModule } from 'src/users/users.module';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  imports: [UsersModule, PropertiesModule],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
