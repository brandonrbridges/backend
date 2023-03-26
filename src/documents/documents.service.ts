// Nest
import { Inject, Injectable } from '@nestjs/common';

// Mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { DocumentDocument } from './document.schema';

// Dtos
import { CreateDocumentDto } from './dtos/create.dto';
import { UpdateDocumentDto } from './dtos/update.dto';

// Services
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('Document') private documentModel: Model<DocumentDocument>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findAll(query): Promise<DocumentDocument[]> {
    let data: DocumentDocument[];

    if (query) {
      data = await this.documentModel.find(query).exec();
    } else {
      data = await this.documentModel.find().exec();
    }

    const collated = data?.map(async (document) => {
      document.user = await this.usersService.findById(document.user_id);

      return document;
    });

    return Promise.all(collated).then((data) => data);
  }

  async findById(id: string): Promise<DocumentDocument> {
    const data = await this.documentModel.findById(id).exec();

    data.user = await this.usersService.findById(data.user_id);

    return data;
  }

  async insertOne(data: CreateDocumentDto): Promise<DocumentDocument> {
    const created = new this.documentModel(data);

    return created.save();
  }

  async updateOne(
    id: string,
    data: UpdateDocumentDto,
  ): Promise<DocumentDocument> {
    return await this.documentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
