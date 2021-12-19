import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { environments } from '../../config/enviroments';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: environments.GOOGLE_CLIENT_ID,
      clientSecret: environments.GOOGLE_SECRET,
      callbackURL: `${environments.APP_DOMAIN}/google/redirect`,
      scope: ['email', 'profile'],
      session: false,
      acessType: 'offline',
      approvalPrompt: 'force',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
