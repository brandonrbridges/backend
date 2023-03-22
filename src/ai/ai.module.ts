// Nest
import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// AI Dependencies
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AIPromptSchema } from './ai.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AIPrompt', schema: AIPromptSchema }]),
  ],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
