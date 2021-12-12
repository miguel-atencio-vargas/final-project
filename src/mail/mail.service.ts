import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  Email = require('email-templates');
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ernesto1991diaz@gmail.com',
      pass: 'gegzcjluilqvatcf',
    },
  });

  /**
   *
   *
   * @returns obj info to wrap the email template
   */
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const info = await this.transporter.sendMail({
      from: `Company companyName`, // sender address
      to,
      subject: 'Important information for openings ' + subject,
      text,
      html: `<strong>${text}</strong><br>${html}`,
    });
    return info;
  }
}
