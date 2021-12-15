import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigMailDto, ContextMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendConfirmationEmail(
    configMailDto: ConfigMailDto,
    contextMailDto: ContextMailDto,
  ) {
    return this.mailerService.sendMail({
      ...configMailDto,
      context: contextMailDto,
      attachments: [
        {
          filename: 'image-1.png',
          path: __dirname + `/templates/images/image-1.png`,
          cid: 'twitter',
        },
        {
          filename: 'image-2.png',
          path: __dirname + `/templates/images/image-2.png`,
          cid: 'instagram',
        },
        {
          filename: 'image-3.png',
          path: __dirname + `/templates/images/image-3.png`,
          cid: 'linkeding',
        },
        {
          filename: 'image-4.png',
          path: __dirname + `/templates/images/image-4.png`,
          cid: 'youtube',
        },
        {
          filename: 'image-5.png',
          path: __dirname + `/templates/images/image-5.png`,
          cid: 'heroImage',
        },
      ],
    });
  }
}
