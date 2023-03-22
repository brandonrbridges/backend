// Nest
import { Body, Controller, Post } from '@nestjs/common';

// Open AI
import { OpenAIClient } from '@platohq/nestjs-openai';

// AI Dependencies
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly openAIClient: OpenAIClient,
  ) {}

  @Post()
  async getCompletion(
    @Body('prompt') prompt: string,
    @Body('user_id') user_id: string,
  ): Promise<any> {
    const existing: any = await this.aiService.findOne(prompt);

    if (existing) return existing.response.choices.map((choice) => choice.text);

    const prefix =
      'You are a Property Management AI Model. You are integrated into a property management platform called Hello Home. You are assisting a user with the following task: ';

    const { data } = await this.openAIClient.createCompletion({
      model: 'text-davinci-002',
      max_tokens: 200,
      temperature: 0.4,
      prompt: prefix + prompt,
    });

    await this.aiService.insertOne({
      user_id,
      prompt,
      response: data,
    });

    return data.choices.map((choice) => choice.text);
  }
}
