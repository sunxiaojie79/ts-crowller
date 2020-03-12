import { Router, Request, Response} from 'express';
import Crowller from './crowller';
import BookAnalyzer from './bookAnalyzer';
import fs from 'fs';
import path from 'path';

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

router.get('/', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/getData"> 爬取数据</a>
          <a href="/showData"> 展示数据</a>
          <a href="/logout"> 退出</a>
        </body>
      </html>
    `)
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password"/>
            <button>提交</button>
          </form>
        </body>
      </html>
    `)
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  const {password} = req.body
  if (isLogin) {
    res.redirect('/');
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      res.send('login success');
    } else {
      res.send(`${req.customProp}, login fail`);
    }
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.redirect('/')
});

router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const url = 'https://book.douban.com/';
    const analyzer = BookAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data success');
  } else {
    res.send(`${req.customProp}, get data fail`);
  }
});

router.get('/showData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    try {
      const filePath = path.resolve(__dirname, '../data/book.json');
      const content = fs.readFileSync(filePath, 'utf-8');
      res.send(JSON.parse(content));
    } catch (e){
      res.send(`${e}, 尚未爬取到内容`);
    }
  } else {
    res.send('请登录后查看');
  }
});
export default router;