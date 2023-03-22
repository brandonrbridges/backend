// Nest
import { Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// AI Dependencies
import { AIPromptDocument } from './ai.schema';

@Injectable()
export class AiService {
  constructor(
    @InjectModel('AIPrompt')
    private aiPromptModel: Model<AIPromptDocument>,
  ) {}

  async findOne(prompt: string): Promise<AIPromptDocument> {
    return this.aiPromptModel.findOne({ prompt });
  }

  async insertOne(data: object): Promise<AIPromptDocument> {
    const createdAIPrompt = await this.aiPromptModel.create(data);

    return createdAIPrompt;
  }
}
