import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from '../candidate/candidate.module';
import { AuthController } from './controllers/auth.controllers';
import { AuthService } from './services/auth.service';
import { Jti, JtiSchema } from './schemas/jwt.schema';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategyService } from './strategies/jwt.strategy';
import { UserModule } from '../users/user.module';
import { JtiService } from './services/jti.service';

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
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JtiService, JwtStrategyService],
})
export class AuthModule {}
