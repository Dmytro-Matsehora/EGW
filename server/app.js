import cherio from 'cherio';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { getPageContent } from './helpers/puppeteer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE = 'https://egw.news/counterstrike/news'

async function main() {
  try {
    const url = SITE
    const pageContent = await getPageContent(url);
    const $ = cherio.load(pageContent);
    const newsArray = [];
    const savePath = path.join(__dirname, '..', '.', 'client', 'src', 'data', 'data.json');

    $('.iEven_item__kdKvV').each((i, item) => {
      const href = $(item).attr('href');
      const title = $(item.children[1].children[0]).text();
      const description = $(item.children[1].children[1]).text();
      const time = $(item.children[2].children[0]).text();
      const viewed = $(item.children[2].children[1]).text();
      const id = newsArray.length + 1;

      newsArray.push({
        id,
        href,
        title,
        description,
        time,
        viewed,
      })
    })

    const data = JSON.stringify(newsArray)

    fs.writeFile(savePath, data, err => {
      if (err) {
        console.log(chalk.red('cant create data file'));
      }
  
      console.log(chalk.green('data file was created \n'));
    })

  } catch(err) {
    console.log(chalk.red('An error has occured \n'));
    console.log(err);
  }
}

main()

const app = express()

app.get('/proxy/*', async (req, res) => {
  let data = '';
  let adress = req.path.replace('/proxy', '');

  await axios.get(`https://egw.news${adress}`)
    .then(res => {
      data = res.data
        .replace('<div id="root"><style>.content,.h1,.news-time{opacity:0}</style>', '')
        .split(' ')
        .map(word => (word.length >= 6 ? word.toUpperCase() : word))
        .join(' ')
    })
    .catch(error => {
      console.error(error);
    }); 
  
  res.send(data);
})

app.listen(8080, () => console.log("Proxy is listening on 8080"))

/**
const PORT = 5000;
const HOST = "localhost";
const API_SERVICE_URL = "https://egw.news/counterstrike/news";


app.use(morgan('dev'));


app.get('/', (req, res, next) => {
  res.send(res.data.replace('<div id="root"><style>.content,.h1,.news-time{opacity:0}</style>', ''));
});

// Proxy endpoints
app.use('/', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

**/


/** app.get('/', async (req, res) => {
  const url = 'https://egw.news/counterstrike/news/20502/slukhi-nipl-zamenit-sdy-v-sostave-navi-yDIdsqgfV';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  let document = await page.evaluate(() => document.body.outerHTML)

  console.log(document);
  res.send(document);
})

app.listen(8080, () => console.log("Proxy is listening on 8080")) **/
