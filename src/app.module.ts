import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { environments } from './config/enviroments';
import { CompanyModule } from './company/company.module';
import { UserModule } from './users/user.module';
import { MailModule } from './mail/mail.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(environments.MONGO_URI),
    AuthModule,
    CompanyModule,
    UserModule,
    CandidateModule,
    MailModule,
    ReportModule,
  ],
})
export class AppModule {}
