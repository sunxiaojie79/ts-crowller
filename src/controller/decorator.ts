import { Router } from 'express';
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
    if (path && method && handler) {
      router[method](path, handler);
    }
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