import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from '../candidate/candidate.module';
import { AppController } from './auth.controllers';
import { AuthService } from './auth.service';
import { Jti, JtiSchema } from './schemas/jwt.schema';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategyService } from './strategies/jwt.strategy';
import { JtiService } from './jti.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    CandidateModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Jti.name,
        schema: JtiSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, GoogleStrategy, JtiService, JwtStrategyService],
})
export class AuthModule {}
