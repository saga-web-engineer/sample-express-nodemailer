import type { Request } from 'express';
import nodemailer from 'nodemailer';

import type { RequestBody } from '../types/sendMailTypes';

class MailService {
  private createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      port: Number(process.env.MAILER_PORT),
      host: process.env.MAILER_HOST,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
      secure: true,
    });
  }

  private isContactRequestBody(body: unknown): body is RequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const { name, message } = body as Record<string, unknown>;

    return typeof name === 'string' && typeof message === 'string';
  }

  async sendContactMail(body: Request): Promise<void> {
    if (!this.isContactRequestBody(body)) {
      throw new Error('Invalid request body');
    }

    const { name, message } = body;

    const textContent = `
      フォームからお問い合わせがありました。
      ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
      【名前】${name}
      【お問い合わせ内容】${message}
      ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    `;

    const toAdminMail = {
      from: process.env.MAILER_USER,
      to: process.env.MAILER_USER,
      subject: `【お問い合わせ】${name}様より`,
      text: textContent,
    };

    await this.createTransporter().sendMail(toAdminMail);
  }
}

export const sendMailService = new MailService();
