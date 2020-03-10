import fs from 'fs';
import path from 'path';
import sueragent from 'superagent';
import cheerio from 'cheerio';

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
class Crowller {
  private url = 'https://book.douban.com/';

  constructor () {
    this.initSpiderProcess();
  }

  async initSpiderProcess () {
    let filePath = path.resolve(__dirname, '../data/book.json');
    const html = await this.getRowHtml(this.url);
    const info = this.getBookInfo(html);
    const fileContent = this.generateJsonContent(info);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }
  
  async getRowHtml (url: string) {
    const result = await sueragent.get(url);
    return result.text;
  }

  getBookInfo (html: string) {
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

  generateJsonContent (info: BookResults) {
    let filePath = path.resolve(__dirname, '../data/book.json');
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[info.time] = info.data;
    return fileContent;
  }
}

const crowller = new Crowller();