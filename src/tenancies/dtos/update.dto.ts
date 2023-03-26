import { PartialType } from '@nestjs/mapped-types';

import { CreateTenancyDto } from './create.dto';

export class UpdateTenancyDto extends PartialType(CreateTenancyDto) {}
