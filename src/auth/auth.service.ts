import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { CandidateService } from '../candidate/candidate.service';
import { CreateCandidateDto } from '../candidate/dto/create-candidate.dto';
import { UserService } from '../users/user.service';
import { GoogleUserDto } from './dto/google-user.dto';
import { JtiService } from './jti.service';

@Injectable()
export class AuthService {
  constructor(
    private jtiService: JtiService,
    private readonly jwtService: JwtService,
    private readonly candidateService: CandidateService,
    private readonly userService: UserService,
  ) {}

  /**
   *
   * @param googleUser
   * @returns an object that contains a new access_token
   *
   */
  async generateTokenForCandidate(googleUser: GoogleUserDto) {
    let candidateDB = await this.candidateService.findOneByEmail(
      googleUser.email,
    );
    if (!candidateDB) {
      const candidateData = new CreateCandidateDto();
      candidateData.email = googleUser.email;
      candidateData.firstName = googleUser.firstName;
      candidateData.lastName = googleUser.lastName;
      candidateDB = await this.candidateService.create(candidateData);
    }
    const access_token = this.jwtService.sign({
      jti: nanoid(),
      sub: candidateDB._id,
      email: candidateDB.email,
    });
    return { access_token };
  }

  /**
   *
   * @param googleUser
   * @returns an object that contains a new access_token
   *
   */
  async generateTokenForUser(googleUser: GoogleUserDto) {
    const userDB = await this.userService.findOneByEmail(googleUser.email);
    if (!userDB) return;
    const access_token = this.jwtService.sign({
      jti: nanoid(),
      sub: userDB._id,
      email: userDB.email,
      role: userDB.role,
    });
    return { access_token };
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
