// Mongoose
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schemas
import { User } from 'src/users/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Payment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  user: User;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
