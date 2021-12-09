import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { environments } from './config/enviroments';
import { UserModule } from './users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(environments.mongoUri),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
