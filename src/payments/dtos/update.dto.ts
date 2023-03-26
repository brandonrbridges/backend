import { PartialType } from '@nestjs/mapped-types';

import { CreatePaymentDto } from './create.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
