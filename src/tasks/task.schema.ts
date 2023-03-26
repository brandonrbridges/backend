// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

// Schemas
import { User } from 'src/users/user.schema';
import { Property } from 'src/properties/property.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Task extends Document {
  _id?: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  landlord_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  landlord: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  })
  property_id?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Property })
  property?: Property;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  update_history: Array<UpdateHistory>;

  @Prop({ required: true })
  messages: Array<Message>;
}

export interface UpdateHistory {
  _id?: mongoose.Schema.Types.ObjectId;
  message: string;
  status?: string | null;
  user_id?: mongoose.Schema.Types.ObjectId;
  created_at?: Date;
}

export interface Message {
  _id?: mongoose.Schema.Types.ObjectId;
  content: string;
  user_id?: mongoose.Schema.Types.ObjectId;
  user?: User;
  created_at?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
