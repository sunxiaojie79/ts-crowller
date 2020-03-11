import fs from 'fs';
import cheerio from 'cheerio';

import { Analyzer } from './crowller';

interface Book {
  title: string,
  price: number
}

interface BookResults {
  time: number;
  data: Book[];
}

interface Content {
  [propName: number]: Book[]
}

export default class BookAnalyzer implements Analyzer{
  private static instance: BookAnalyzer;

  private constructor () {}

  static getInstance () {
    if (!BookAnalyzer.instance) {
      BookAnalyzer.instance = new BookAnalyzer();
    }
    return BookAnalyzer.instance;
  }
  
  private getBookInfo (html: string): BookResults {
    const $ = cheerio.load(html);
    const bookItems = $('.market-books .list-col .info');
    const bookInfos: Book[]= [];
    bookItems.map((index, element) => {
      const title = $(element).find('.title a').text();
      const price = parseInt($(element).find('.price').text().split('￥')[1], 10);
      bookInfos.push({title, price});
    });
    return {
      time: new Date().getTime(),
      data: bookInfos
    }
  }

  private generateJsonContent (info: BookResults, filePath: string): Content {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[info.time] = info.data;
    return fileContent;
  }

  public analyze (html: string, filePath: string) {
    const info = this.getBookInfo(html);
    const fileContent = this.generateJsonContent(info, filePath);
    return JSON.stringify(fileContent);
  }
}