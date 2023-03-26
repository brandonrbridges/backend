// Mongoose
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schemas
import { User } from 'src/users/user.schema';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Ticket extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  user: User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
