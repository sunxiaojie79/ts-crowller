import { Router, Request, Response} from 'express';
import Crowller from './crowller';
import BookAnalyzer from './bookAnalyzer'

const router = Router();

router.get('/getData', (req: Request, res: Response) => {
  const url = 'https://book.douban.com/';
  const analyzer = BookAnalyzer.getInstance();
  new Crowller(url, analyzer);
  res.send('get data');
});

export default router;