
export function controller(constuctor: any) {
  for(let key in constuctor.prototype) {
    console.log(Reflect.getMetadata('path', constuctor.prototype, key));
  }
}
export function get(path: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor){
    Reflect.defineMetadata('path', path, target, key)
  }
}