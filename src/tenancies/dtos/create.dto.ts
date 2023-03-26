import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenancyDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  property_id: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
