import fs from 'fs';
import renderTemplate from './renderTemplate.mjs';
import { toAbsolute } from './root.mjs';
import print from './print.mjs';

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8').replace(/>\s+</g, '><');

const bootstrap = async () => {
  const { render, names } = await import('../dist-ssr/entry-server.js');
  const staticNames = names.filter((name) => !name.includes('['));

  // eslint-disable-next-line no-restricted-syntax
  for (const _url of staticNames) {
    const url = `/${_url.replace(/(\.\/pages\/)|(index)|(\.[tj]sx)/g, '')}`;
    const headTags = [];
    // eslint-disable-next-line no-await-in-loop
    const appHtml = await render(url, headTags);

    const html = renderTemplate(template, appHtml, headTags);

    const filePath = `dist${url === '/' ? '/index' : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
    print('pre-rendered:', filePath);
  }
};

bootstrap();
