import nodemailer from 'nodemailer';

import { mailer } from '../configs/contactConfig';
import type { ContactRequestBody, RequestBody } from '../types/contactTypes';

const transporter = nodemailer.createTransport({
  port: Number(mailer.port),
  host: mailer.host,
  auth: {
    user: mailer.user,
    pass: mailer.pass,
  },
  secure: true,
});

function isContactRequestBody(body: unknown): body is RequestBody {
  if (typeof body !== 'object' || body === null) return false;
  const { name, message } = body as Record<string, unknown>;

  return typeof name === 'string' && typeof message === 'string';
}

export async function sendmail(req: ContactRequestBody): Promise<void> {
  await new Promise((resolve, reject) => {
    if (!isContactRequestBody(req.body)) {
      reject(new Error('Invalid request body'));

      return;
    }

    const { name, message } = req.body;

    const textContent = `
      フォームからお問い合わせがありました。
      ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
      【名前】${name}
      【お問い合わせ内容】${message}
      ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    `;

    const toAdminMail = {
      from: mailer.user,
      to: mailer.user,
      subject: `【お問い合わせ】${name}様より`,
      text: textContent,
    };

    transporter.sendMail(toAdminMail, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
