/// <reference path="../node_modules/moment/moment.d.ts" />
import * as fs from 'fs';
import * as nodedir from 'node-dir';
import * as jsdom from 'jsdom';
const { JSDOM } = jsdom;
import * as prettyBytes from 'pretty-bytes';
import * as moment from '../node_modules/moment/min/moment.min.js';

export class api {
  constructor(app) {
    app.get('/api/files', this.getPresentations);
  }

  getPresentations(req, res) {
    let files = [];
    let self = this;
    nodedir.readFiles('./src/presentations', { recursive: true, sync: true }, (err, content, fileName, nextFile) => {
      let isWin = process.platform === 'win32';
      let group = '';
      let href = '';
      if (isWin) {
        group = fileName.split('\\')[2];
        href = fileName.replace('src\\', '/').split('\\').join('/');
      } else {
        group = fileName.split('/')[2];
        href = fileName.replace('src/', '/');
      }

      if (group === 'index.html' || href.indexOf('/images/') > 0) {
        nextFile();
        return;
      }
      group = group.replace('-', ' ');
      // group = self.toTitleCase(group);
      group = group.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      group = group.replace('script', 'Script');
      group = group.replace('Css', 'CSS');
      let title = '';
      let author = '';
      let presented = '';
      let venue = '';

      let dom = new JSDOM(content);
      let document = dom.window.document;
      let head = document.getElementsByTagName('head')[0];
      if (head && head.children.length > 0) {
        title = document.title ? document.title : '';

        let elAuthor = head.querySelector('meta[name="author"]');
        author = elAuthor ? elAuthor['content'] : '';

        let elPresented = head.querySelector('meta[name="presented"]');
        presented = elPresented ? elPresented['content'] : '';

        let elVenue = head.querySelector('meta[name="venue"]');
        venue = elVenue ? elVenue['content'] : '';
      }

      let stats = fs.statSync(fileName);
      let size = prettyBytes(stats.size);
      let modified = moment(stats.mtime).toString();
      let newFile = { group, title, href, author, venue, presented, modified, size };
      files.push(newFile);

      nextFile();
    }, (err, output) => {
      res.send(files);
    });
  }

  public toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}