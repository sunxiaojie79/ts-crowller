import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { get, post, controller} from './decorator';
import { getResponseData } from '../utils/util';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller
class LoginController {
  @get('/logout')
  logout(req: RequestWithBody, res: Response){
    if (req.session) {
      req.session.login = undefined;
    }
    res.send(getResponseData(true));
  }

  @post('/login')
  login(req: RequestWithBody, res: Response){
    const isLogin = req.session ? req.session.login : false;
    const {password} = req.body
    if (isLogin) {
      res.send(getResponseData(false, `${req.customProp}, 已登录`));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.send(getResponseData(true));
      } else {
        res.send(getResponseData(false, `${req.customProp}, 登录失败`));
      }
    }
  }

  @get('/')
  home(req: RequestWithBody, res: Response){
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
  }
}