import { TemplateEmail } from '../enum/type-mail.enum';

/**
 *  @property to email to be sended
 *  @property subject of the mail that will be sended
 *  @property template of the email
 */
export class ConfigMailDto {
  constructor(
    private to: string,
    private subject: string,
    private template: TemplateEmail,
  ) {}
}

/**
 *  @property candidateName its the formal name of the content of the email
 *  @property openingTitle that will be appear in the email
 */
export class ContextMailDto {
  constructor(private candidateName: string, private openingTitle: string) {}
}
