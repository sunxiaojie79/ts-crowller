"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (constuctor) {
        for (var key in constuctor.prototype) {
            var path = (Reflect.getMetadata('path', constuctor.prototype, key));
            var method = (Reflect.getMetadata('method', constuctor.prototype, key));
            var middlewares = Reflect.getMetadata('middlewares', constuctor.prototype, key);
            var handler = constuctor.prototype[key];
            if (path && method) {
                var fullPath = root === '/' ? path : "" + root + path;
                if (middlewares && middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArrays([fullPath], middlewares, [handler]));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
