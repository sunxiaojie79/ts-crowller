import { LoginController, CrowllerController } from '../controller';

export enum Methods {
  get = 'get',
  post = 'post',
}

function getRequestDecorator (type: Methods) {
  return function(path: string) {
    return function(target: LoginController | CrowllerController, key: string, descriptor: PropertyDescriptor){
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);