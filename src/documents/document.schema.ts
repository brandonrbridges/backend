// Mongoose
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schemas
import { Property } from 'src/properties/property.schema';
import { User } from 'src/users/user.schema';

export type DocumentDocument = HydratedDocument<_Document>;

@Schema({ autoIndex: true, toJSON: { virtuals: true } })
export class _Document extends Document {
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
}

export const DocumentSchema = SchemaFactory.createForClass(_Document);
