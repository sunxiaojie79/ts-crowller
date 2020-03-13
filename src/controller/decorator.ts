import { Router, RequestHandler } from 'express';
export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
}

export function controller(constuctor: any) {
  for(let key in constuctor.prototype) {
    const path = (Reflect.getMetadata('path', constuctor.prototype, key));
    const method: Method = (Reflect.getMetadata('method', constuctor.prototype, key));
    const handler = constuctor.prototype[key];
    const middleware = Reflect.getMetadata('middleware', constuctor.prototype, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

export function useMiddleWare (middleware: RequestHandler) {
  return function(target: any, key: string, descriptor: PropertyDescriptor){
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

function getRequestDecorator (type: string) {
  return function(path: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor){
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');
export const del = getRequestDecorator('delete');