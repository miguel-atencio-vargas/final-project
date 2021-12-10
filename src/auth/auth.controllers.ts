import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CandidateService } from '../candidate/candidate.service';
import { CreateCandidateDto } from '../candidate/dto/create-candidate.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly authService: AuthService,
  ) {}

  @Get('google/candidate')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return '';
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() { user }) {
    if (!user) throw new NotFoundException('User has not be found');
    const candidate = await this.candidateService.findOneByEmail(user.email);
    if (candidate) return this.authService.generateToken(user);

    const candidateData = new CreateCandidateDto();
    candidateData.email = user.email;
    candidateData.firstName = user.firstName;
    candidateData.lastName = user.lastName;
    await this.candidateService.create(candidateData);
    return this.authService.generateToken(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() { user }) {
    return this.authService.logOut(user.jti);
  }
}
