import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/user.schema';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  _id: mongoose.Schema.Types.ObjectId;

  user_id: mongoose.Schema.Types.ObjectId;
  user: User;

  name: string;

  address: {
    line_1: { type: String; required: true };
    line_2: { type: String };
    city: { type: String; required: true };
    county: { type: String; required: true };
    postcode: { type: String; required: true };
  };

  status: string;

  type: string;

  bedrooms: number;
  bathrooms: number;

  deposit: number;
  rent: number;

  tenant_id?: mongoose.Schema.Types.ObjectId;
  tenant?: User;

  tasks: Array<any>;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
