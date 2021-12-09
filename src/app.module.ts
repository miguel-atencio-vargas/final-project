import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { environments } from './config/enviroments';
import { CompanyModule } from './company/company.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(environments.mongoUri),
    AuthModule,
    CompanyModule,
  ],
})
export class AppModule {}
