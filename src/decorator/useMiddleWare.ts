import { LoginController, CrowllerController } from '../controller';
import { RequestHandler } from 'express';

export function useMiddleWare (middleware: RequestHandler) {
  return function(target: LoginController | CrowllerController, key: string, descriptor: PropertyDescriptor){
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}