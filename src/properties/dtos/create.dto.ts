import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  address: {
    line_1: string;
    line_2?: string;
    city: string;
    county: string;
    postcode: string;
  };

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  tenant_id?: string;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsInt()
  deposit: number;

  @IsInt()
  rent: number;
}
