import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InvitationDocument } from './invitation.schema';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel('Invitation')
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async findAll(query?: object): Promise<InvitationDocument[]> {
    if (query) {
      return this.invitationModel.find(query).exec();
    }

    return this.invitationModel.find().exec();
  }

  async findById(id: string): Promise<InvitationDocument> {
    return this.invitationModel.findById(id).exec();
  }

  async findOne(args: object): Promise<InvitationDocument> {
    return this.invitationModel.findOne(args).exec();
  }
}
