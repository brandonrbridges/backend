import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, HydratedDocument } from 'mongoose';

import { User } from 'src/users/user.schema';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  user: User;

  @Prop({ type: String })
  name: string;

  @Prop(
    raw({
      line_1: { type: String, required: true },
      line_2: { type: String },
      city: { type: String, required: true },
      county: { type: String, required: true },
      postcode: { type: String, required: true },
    }),
  )
  address: object;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  _type: string; // _ to avoid conflict with JS type

  @Prop({ type: Number, required: true })
  rent: string;

  @Prop({ type: Number, required: true })
  deposit: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  tenant_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  tenant: User;

  @Prop({ type: Array })
  tasks?: Array<any>;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
