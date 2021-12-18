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
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Redirects an user to the Google Login url.' })
  @ApiResponse({
    status: 200,
    description: 'Google auth urld',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return;
  }

  @ApiExcludeEndpoint()
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() { user }) {
    if (!user) throw new NotFoundException('User has not been found');
    const userToken = await this.authService.generateTokenForUser(user);
    if (userToken) return userToken;
    return this.authService.generateTokenForCandidate(user);
  }

  @ApiOperation({ summary: 'Takes an user out of the Api' })
  @ApiParam({ name: 'jti', description: 'jti to be added to the blacklist' })
  @ApiResponse({
    status: 200,
    description: 'Adds a jti to the banned tokens list',
  })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() { user }) {
    return this.authService.logOut(user.jti);
  }
}
