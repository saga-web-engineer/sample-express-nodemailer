import express, { type Response } from 'express';

import { sendmail } from '../controllers/contactController';
import type { ContactRequestBody } from '../types/contactTypes';

const router = express.Router();

router.post('/contact', (req: ContactRequestBody, res: Response) => {
  sendmail(req)
    .then(() => {
      res.status(201).send('ok');
    })
    .catch(() => {
      res.status(500).send('Internal Server Error');
    });
});

export default router;
