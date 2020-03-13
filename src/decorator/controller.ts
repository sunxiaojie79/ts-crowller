import { RequestHandler } from 'express';
import router from '../router';
import { Methods } from './request';

export function controller(root: string) {
  return function (constuctor: new (...args: any[]) => any) {
    for(let key in constuctor.prototype) {
      const path: string = (Reflect.getMetadata('path', constuctor.prototype, key));
      const method: Methods = (Reflect.getMetadata('method', constuctor.prototype, key));
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', constuctor.prototype, key);
      const handler = constuctor.prototype[key];
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  }
}