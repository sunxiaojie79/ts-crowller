import fs from 'fs';
import path from 'path';
import sueragent from 'superagent';
import BookAnalyzer from './bookAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/book.json');
  constructor (private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  async initSpiderProcess () {
    const html = await this.getRowHtml(this.url);
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
  
  private async getRowHtml (url: string) {
    const result = await sueragent.get(url);
    return result.text;
  }
   private writeFile (content: string) {
    fs.writeFileSync(this.filePath, content);
   }
  
}
const url = 'https://book.douban.com/';
const analyzer = BookAnalyzer.getInstance();
new Crowller(url, analyzer);