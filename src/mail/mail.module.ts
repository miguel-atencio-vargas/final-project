import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environments } from '../config/enviroments';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environments.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: environments.MAIL_USER,
          pass: environments.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: environments.MAIL_FROM,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
