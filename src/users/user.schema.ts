import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  avatar_url: string;

  @Prop({ type: Array, required: true })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
