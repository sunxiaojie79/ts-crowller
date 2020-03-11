"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var BookAnalyzer = /** @class */ (function () {
    function BookAnalyzer() {
    }
    BookAnalyzer.getInstance = function () {
        if (!BookAnalyzer.instance) {
            BookAnalyzer.instance = new BookAnalyzer();
        }
        return BookAnalyzer.instance;
    };
    BookAnalyzer.prototype.getBookInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var bookItems = $('.market-books .list-col .info');
        var bookInfos = [];
        bookItems.map(function (index, element) {
            var title = $(element).find('.title a').text();
            var price = parseInt($(element).find('.price').text().split('￥')[1], 10);
            bookInfos.push({ title: title, price: price });
        });
        return {
            time: new Date().getTime(),
            data: bookInfos
        };
    };
    BookAnalyzer.prototype.generateJsonContent = function (info, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[info.time] = info.data;
        return fileContent;
    };
    BookAnalyzer.prototype.analyze = function (html, filePath) {
        var info = this.getBookInfo(html);
        var fileContent = this.generateJsonContent(info, filePath);
        return JSON.stringify(fileContent);
    };
    return BookAnalyzer;
}());
exports.default = BookAnalyzer;
