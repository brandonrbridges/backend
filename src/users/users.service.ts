import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { UserDocument } from 'src/users/user.schema';

import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(
    id: mongoose.Schema.Types.ObjectId | string,
  ): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findOne(args: object): Promise<UserDocument> {
    return this.userModel.findOne(args).exec();
  }

  async searchByEmail(email: string): Promise<UserDocument[]> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (email.length < 3) {
      throw new BadRequestException('Email must be at least 3 characters');
    }

    const regex = new RegExp(this.escapeRegex(email), 'gi');

    const results = await this.userModel.find({ email: regex }).exec();

    return results;
  }

  async insertOne(args: object): Promise<UserDocument> {
    const createdUser = new this.userModel(args);

    return createdUser.save();
  }

  async updateOne(id: mongoose.Schema.Types.ObjectId | string, data: object) {
    const updatedUser = this.userModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();

    return updatedUser;
  }

  escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
