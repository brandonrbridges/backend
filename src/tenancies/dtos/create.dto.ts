import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenancyDto {
  @IsString()
  @IsNotEmpty()
  property_id: string;

  @IsString()
  @IsNotEmpty()
  tenant_id: string;
}
