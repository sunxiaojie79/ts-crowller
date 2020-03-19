"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (data, errmsg) {
    if (errmsg) {
        return {
            success: false,
            errmsg: errmsg,
            data: data
        };
    }
    return {
        success: true,
        data: data
    };
};
