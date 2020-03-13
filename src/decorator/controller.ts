import { RequestHandler } from 'express';
import router from '../router';
import { Methods } from './request';

export function controller(root: string) {
  return function (constuctor: new (...args: any[]) => any) {
    for(let key in constuctor.prototype) {
      const path: string = (Reflect.getMetadata('path', constuctor.prototype, key));
      const method: Methods = (Reflect.getMetadata('method', constuctor.prototype, key));
      const middleware: RequestHandler = Reflect.getMetadata('middleware', constuctor.prototype, key);
      const handler = constuctor.prototype[key];
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  }
}