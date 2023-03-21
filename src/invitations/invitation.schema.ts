import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema()
export class Invitation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  })
  property_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
  })
  status: string;

  @Prop({ type: String })
  message: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
