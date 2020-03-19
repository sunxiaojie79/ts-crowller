"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var bookAnalyzer_1 = __importDefault(require("../utils/bookAnalyzer"));
var checkLogin = function (req, res, next) {
    debugger;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.send(util_1.getResponseData(false, '请登录后查看'));
    }
};
var test = function (req, res, next) {
    debugger;
    next();
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        var url = 'https://book.douban.com/';
        var analyzer = bookAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send(util_1.getResponseData(true));
    };
    ;
    CrowllerController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/book.json');
            var content = fs_1.default.readFileSync(filePath, 'utf-8');
            res.send(util_1.getResponseData(JSON.parse(content)));
        }
        catch (e) {
            res.send(util_1.getResponseData(false, "\u5C1A\u672A\u722C\u53D6\u5230\u5185\u5BB9"));
        }
    };
    ;
    __decorate([
        decorator_1.get('/getData'),
        decorator_1.useMiddleWare(checkLogin),
        decorator_1.useMiddleWare(test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        decorator_1.get('/showData'),
        decorator_1.useMiddleWare(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        decorator_1.controller('/api')
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
