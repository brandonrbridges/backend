import {
  Body,
  Controller,
  HttpException,
  Inject,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body): Promise<any> {
    const user = await this.usersService.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return {
      user: user.toJSON(),
      token,
    };
  }

  @Post('register')
  async register(@Body() body): Promise<any> {
    const user = await this.usersService.findOne({ email: body.email });
    if (user) {
      throw new HttpException('User already exists', 401);
    }

    const createdUser = await this.usersService.insertOne({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      roles: ['unverifed'],
    });

    return {
      user: createdUser.toJSON(),
    };
  }
}
