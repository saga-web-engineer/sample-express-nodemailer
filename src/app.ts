import cors from 'cors';
import { config } from 'dotenv';
import express, { type Application } from 'express';

import { router } from './routes/sendMailRoute';

config();

const app: Application = express();
app.use(cors({}));

//POSTのパラメータを取得
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

const port = Number(process.env.PORT) || 3002;
app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(router);

export const viteNodeApp = app;
