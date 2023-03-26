import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipient_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  opened: boolean;

  @Prop({ type: String, required: true })
  type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
