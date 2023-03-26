import { PartialType } from '@nestjs/mapped-types';

import { CreatePropertyDto } from './create.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
