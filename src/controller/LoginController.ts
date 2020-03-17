import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { get, post, controller} from '../decorator';
import { getResponseData } from '../utils/util';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller('/api')
export class LoginController {
  static isLogin (req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/isLogin')
  isLogin(req: RequestWithBody, res: Response): void{
    const isLogin = LoginController.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @get('/logout')
  logout(req: RequestWithBody, res: Response): void{
    if (req.session) {
      req.session.login = undefined;
    }
    res.send(getResponseData(true));
  }

  @post('/login')
  login(req: RequestWithBody, res: Response): void{
    const isLogin = LoginController.isLogin(req);
    const {password} = req.body
    if (isLogin) {
      res.send(getResponseData(true, `${req.customProp}, 已登录`));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.send(getResponseData(true));
      } else {
        res.send(getResponseData(false, `${req.customProp}, 登录失败`));
      }
    }
  }
}