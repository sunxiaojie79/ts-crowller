import express, { Request, Response} from 'express';
import router from './router';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(router);

app.listen(7001, () => {
  console.log('server is running...')
})