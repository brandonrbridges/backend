import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data): Promise<any> {
    return await this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data): Promise<any> {
    return await this.authService.register(data);
  }

  @Post('refresh-token')
  async refresh(@Body() data): Promise<any> {
    const { token } = data;

    const decoded = await this.authService.verifyRefreshToken(token);
    const user = await this.authService.getUserById(decoded.id);
    const accessToken = this.authService.generateAccessToken(user);

    return {
      user: user.toJSON(),
      accessToken,
    };
  }
}
