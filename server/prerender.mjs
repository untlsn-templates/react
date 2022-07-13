import fs from 'fs';
import renderTemplate from './renderTemplate.mjs';
import { toAbsolute } from './root.mjs';
import print from './print.mjs';

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8').replace(/>\s+</g, '><');

const bootstrap = async () => {
  const { render, names } = await import('../dist-ssr/entry-server.js');
  const staticNames = names.filter((name) => !name.includes('['));
  const prerenderArr = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const _url of staticNames) {
    let url = `/${_url.replace(/(\.\/pages\/)|(index)|(\.[tj]sx)/g, '')}`;

    const headTags = [];
    // eslint-disable-next-line no-await-in-loop
    const appHtml = await render(url, headTags);

    const html = renderTemplate(template, appHtml, headTags);

    if (url.endsWith('/')) {
      url = `${url}index`
    }

    const filePath = `dist${url === '/' ? '/index' : url}.html`;
    const absPath = toAbsolute(filePath);

    try {
      fs.writeFileSync(absPath, html);
    } catch {
      fs.mkdirSync(absPath.split('/').slice(0, -1).join('/'), { recursive: true })
      fs.writeFileSync(absPath, html);
    }
    prerenderArr.push(url.replace('index', ''));
  }

  prerenderArr.sort().forEach((path) => {
    print('λ', path)
  })
};

bootstrap();
