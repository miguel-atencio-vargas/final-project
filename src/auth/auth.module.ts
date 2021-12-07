import { Module } from '@nestjs/common';
import { AppController } from './auth.controllers';
import { AppService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AuthModule {}
