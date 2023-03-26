import { PartialType } from '@nestjs/mapped-types';

import { CreateSubscriptionDto } from './create.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
