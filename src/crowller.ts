import sueragent from 'superagent';
import cheerio from 'cheerio';

interface Book {
  title: string,
  price: number
}
class Crowller {
  private url = 'https://book.douban.com/';
  constructor () {
    this.getRowHtml(this.url);
  }
  getBookInfo (html: string) {
    const $ = cheerio.load(html);
    const bookItems = $('.market-books .list-col .info');
    const bookInfos: Book[]= [];
    bookItems.map((index, element) => {
      const title = $(element).find('.title a').text();
      const price = parseInt($(element).find('.price').text().split('￥')[1], 10);
      bookInfos.push({title, price})
    });
    const result = {
      time: new Date().getTime(),
      data: bookInfos
    }
    console.log(result)
  }
  async getRowHtml (url: string) {
    const result = await sueragent.get(url);
    this.getBookInfo(result.text);
  }
}

const crowller = new Crowller();