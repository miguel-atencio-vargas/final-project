import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail() {
    await this.mailerService.sendMail({
      to: 'ernesto1991diaz@gmail.com',
      subject: 'Welcome to Node Trainee Program',
      template: './rejected',
      context: {
        name: 'Miguel',
        opening: 'Node js',
      },

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
