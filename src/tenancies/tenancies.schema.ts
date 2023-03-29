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
  tenant_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: User })
  tenant: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  })
  property_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Property })
  property: Property;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: Date })
  start_date: Date;

  @Prop({ type: Date })
  end_date: Date;
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy);
