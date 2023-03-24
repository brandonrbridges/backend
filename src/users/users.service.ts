import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserDocument } from 'src/users/user.schema';

import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findOne(args: object): Promise<UserDocument> {
    return this.userModel.findOne(args).exec();
  }

  async insertOne(args: object): Promise<UserDocument> {
    const createdUser = new this.userModel(args);

    return createdUser.save();
  }

  async updateOne(id: string, data: object) {
    const updatedUser = this.userModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();

    return updatedUser;
  }
}
