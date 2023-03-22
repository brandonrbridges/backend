import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type AIPromptDocument = HydratedDocument<AIPrompt>;

@Schema()
export class AIPrompt {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  prompt: string;

  @Prop({
    type: Object,
    required: true,
  })
  response: object;
}

export const AIPromptSchema = SchemaFactory.createForClass(AIPrompt);
