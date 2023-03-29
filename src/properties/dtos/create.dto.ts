import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsObject()
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

  @IsString()
  tenant_id?: string;

  @IsNotEmpty()
  @IsInt()
  bedrooms: number;

  @IsNotEmpty()
  @IsInt()
  bathrooms: number;

  @IsNotEmpty()
  @IsInt()
  deposit: number;

  @IsNotEmpty()
  @IsInt()
  rent: number;
}
