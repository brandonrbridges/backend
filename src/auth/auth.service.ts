// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// Services
import { UsersService } from 'src/users/users.service';

// Modules
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  }

  async register(data): Promise<any> {
    const user = await this.usersService.findOne({ email: data.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = await this.usersService.insertOne({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
      roles: ['waitlist'],
    });

    const accessToken = this.generateAccessToken(createdUser);
    const refreshToken = this.generateRefreshToken(createdUser);

    return {
      user: createdUser.toJSON(),
      accessToken,
      refreshToken,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<any> {
    try {
      return jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  generateAccessToken(user: any): string {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m', // set the expiration time for the access token
    });

    return accessToken;
  }

  generateRefreshToken(user: any): string {
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // set the expiration time for the refresh token
    });

    return refreshToken;
  }
}
