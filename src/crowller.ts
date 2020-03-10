import sueragent from 'superagent';
class Crowller {
  private url = 'https://movie.douban.com/';
  private rowHtml = ''
  constructor () {
    this.getRowHtml(this.url);
  }
  async getRowHtml (url: string) {
    const result = await sueragent.get(url);
    this.rowHtml = result.text;
  }
}

const crowller = new Crowller();