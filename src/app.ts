import cors from 'cors';
import express, { type Application } from 'express';

import { serverPort } from './configs/contactConfig';
import router from './routes/contactRoute';

const app: Application = express();
app.use(
  cors({
    origin: 'https://sample-express-nodemailer.netlify.app', // アクセス許可するオリジン
    credentials: true, // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, // レスポンスstatusを200に設定
  }),
);

//POSTのパラメータを取得
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

const port = serverPort;
app.listen(port, () => console.log(`Server is running on port ${port}`)); // eslint-disable-line
app.use(router);

export const viteNodeApp = app;
