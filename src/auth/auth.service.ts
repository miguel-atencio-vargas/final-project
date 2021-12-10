import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { Candidate } from '../candidate/schemas/candidate.schema';
import { JtiService } from './jti.service';

@Injectable()
export class AuthService {
  constructor(
    private jtiService: JtiService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param user
   * @returns an object that contains a new access_token
   *
   */
  generateToken(user: Candidate) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user._id,
        jti: nanoid(),
      }),
    };
  }

  /**
   *
   * @param jti storaged on the access_token
   * @returns jti obj saved in the DB
   */
  public async logOut(jti: string) {
    return await this.jtiService.saveJti(jti);
  }
}
