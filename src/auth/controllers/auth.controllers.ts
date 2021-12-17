import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() { user }) {
    if (!user) throw new NotFoundException('User has not be found');
    const userToken = await this.authService.generateTokenForUser(user);
    if (userToken) return userToken;
    return this.authService.generateTokenForCandidate(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() { user }) {
    return this.authService.logOut(user.jti);
  }
}
