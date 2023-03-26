// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

// Schemas
import { User } from 'src/users/user.schema';
import { Property } from 'src/properties/property.schema';

export type TenancyDocument = HydratedDocument<Tenancy>;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class Tenancy extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  })
  property_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Property })
  property: Property;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  end_date: Date;
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy);
