import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './gaurds';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() signInDto: Record<string, any>,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto.emailId, signInDto.password);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refreshToken')
  async generateNewRefreshToken(@Request() req) {
    return this.authService.generateNewRefreshToken(req.user);
  }
}
