import express, { Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controller/LoginController';
import './controller/CowllerController';
import {router} from './controller/decorator';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.customProp = '这是在Request上面➕的一个自定义属性';
  next();
})

app.use(router);

app.listen(7001, () => {
  console.log('server is running...')
})