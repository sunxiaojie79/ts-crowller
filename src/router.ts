// import fs from 'fs';
// import path from 'path';
// import { Router, Request, Response, NextFunction } from 'express';
// import Crowller from './utils/crowller';
// import BookAnalyzer from './utils/bookAnalyzer';
// import { getResponseData } from './utils/util';


// const router = Router();

// interface RequestWithBody extends Request {
//   body: {
//     [key: string]: string | undefined;
//   };
// }

// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.send(getResponseData(false, '请登录后查看'));
//   }
// }

// router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
//   const url = 'https://book.douban.com/';
//   const analyzer = BookAnalyzer.getInstance();
//   new Crowller(url, analyzer);
//   res.send(getResponseData(true));
// });

// router.get('/showData', (req: RequestWithBody, res: Response) => {
//   try {
//     const filePath = path.resolve(__dirname, '../data/book.json');
//     const content = fs.readFileSync(filePath, 'utf-8');
//     res.send(getResponseData(JSON.parse(content)));
//   } catch (e){
//     res.send(getResponseData(false, `尚未爬取到内容`));
//   }
// });
// export default router;