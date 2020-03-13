import 'reflect-metadata';

import { LoginController, CrowllerController } from '../controller';
import { RequestHandler } from 'express';

export function useMiddleWare (middleware: RequestHandler) {
  return function(target: LoginController | CrowllerController, key: string, descriptor: PropertyDescriptor){
    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}