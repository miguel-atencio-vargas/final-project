import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail() {
    await this.mailerService.sendMail({
      to: 'atencio947@gmail.com',
      //from: 'foobar@example.com',
      subject: 'Welcome to Node Trainee Program',
      template: './approvedCandidate', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'Miguel',
        opening: 'Node js',
      },

      attachments: [
        {
          filename: 'image-1.png',
          path: __dirname + `/templates/images/image-1.png`,
          cid: 'twitter', //same cid value as in the html img src
        },
        {
          filename: 'image-2.png',
          path: __dirname + `/templates/images/image-2.png`,
          cid: 'instagram', //same cid value as in the html img src
        },
        {
          filename: 'image-3.png',
          path: __dirname + `/templates/images/image-3.png`,
          cid: 'linkeding', //same cid value as in the html img src
        },
        {
          filename: 'image-4.png',
          path: __dirname + `/templates/images/image-4.png`,
          cid: 'youtube', //same cid value as in the html img src
        },
        {
          filename: 'image-5.png',
          path: __dirname + `/templates/images/image-5.png`,
          cid: 'heroImage', //same cid value as in the html img src
        },
      ],
    });
  }
}
