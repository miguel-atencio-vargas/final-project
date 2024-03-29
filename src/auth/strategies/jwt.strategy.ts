import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CandidateService } from '../../candidate/services/candidate.service';

import { UserService } from '../../users/user.service';
import { JtiService } from '../services/jti.service';
import { environments } from '../../config/enviroments';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private candidateService: CandidateService,
    private tokenService: JtiService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environments.JWT_SECRET,
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
    if (outUser) {
      throw new UnauthorizedException('This token was invalidated');
    }
    const candidate = await this.candidateService.findOneByEmail(payload.email);
    if (candidate) {
      return {
        jti: payload.jti,
        _id: candidate._id,
        email: candidate.email,
        stageId: candidate.stageId,
      };
    }
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) return;
    return {
      jti: payload.jti,
      _id: user._id,
      email: user.email,
      roles: user.role,
      companyId: user.companyId,
    };
  }
}
