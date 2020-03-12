import { Router, Request, Response} from 'express';
import Crowller from './crowller';
import BookAnalyzer from './bookAnalyzer'

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password"/>
          <button>提交</button>
        </form>
      </body>
    </html>
  `)
});
router.post('/getData', (req: Request, res: Response) => {
  if (req.body.password === '123') {
    const url = 'https://book.douban.com/';
    const analyzer = BookAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data success');
  } else {
    res.send('get data fail');
  }
});

export default router;