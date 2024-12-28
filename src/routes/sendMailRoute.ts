import express, { type Request, type Response } from 'express';

import { sendMailService } from '../service/sendMailService';

export const router = express.Router();

router.post('/contact', (req: Request, res: Response) => {
  sendMailService
    .sendContactMail(req.body)
    .then(() => res.status(201).send('ok'))
    .catch(() => res.status(500).send('Internal Server Error'));
});
