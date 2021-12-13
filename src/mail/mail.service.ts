import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail() {
    await this.mailerService.sendMail({
      to: 'ernesto1991diaz@gmail.com',
      from: 'Consultation <m***@gmail.com>',
      subject: 'Welcome to Node Trainee Program',
      template: './acceptCandidate', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'Miguel',
        opening: 'Node js',
      },
    });
  }
}
