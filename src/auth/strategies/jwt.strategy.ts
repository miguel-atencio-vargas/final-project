import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CandidateService } from '../../candidate/candidate.service';
import { JtiService } from '../jti.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private candidateService: CandidateService,
    private tokenService: JtiService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   *
   * @param payload from the controllers JwtAuthGuard
   * @returns an object which contains
   * the info of a valid user logged in
   *
   */
  async validate(payload) {
    const outUser = await this.tokenService.getTokenByJti(payload.jti);
    if (outUser) throw new UnauthorizedException('This token was invalidated');
    const candidate = await this.candidateService.findOneByEmail(payload.email);
    return {
      _id: candidate._id,
      email: candidate.email,
      jti: payload.jti,
    };
  }
}
