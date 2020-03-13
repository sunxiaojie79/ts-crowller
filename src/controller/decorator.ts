import { Router } from 'express';
export const router = Router();

export function controller(constuctor: any) {
  for(let key in constuctor.prototype) {
    const path = (Reflect.getMetadata('path', constuctor.prototype, key));
    const handler = constuctor.prototype[key];
    if (path) {
      router.use(path, handler);
    }
  }
}
export function get(path: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor){
    Reflect.defineMetadata('path', path, target, key)
  }
}