"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function useMiddleWare(middleware) {
    return function (target, key, descriptor) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.useMiddleWare = useMiddleWare;
