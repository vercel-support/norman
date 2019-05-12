const _ = require('lodash');
const next = require('next');
const express = require('express');
const Bluebird = require('bluebird');
const compression = require('compression');
const favicon = require('serve-favicon');
const path = require('path');

const superagent = require('superagent').agent();

const request = Bluebird.promisifyAll(superagent);

const srt2vtt = require('./utils/srt-to-vtt');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const handlerRedirection = async (req, res, redirectUrl) => Bluebird.resolve()
  .then(async () => {
    const response = await request.get(redirectUrl);

    const contentType = response.headers['content-type'];

    if (contentType.indexOf('image') >= 0) {
      const img = Buffer.from(response.body, 'base64');

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': img.length,
      });

      return res.end(img);
    }

    if (_.endsWith(redirectUrl, '.srt')) {
      res.setHeader('Content-type', contentType);

      const parsedSrt = srt2vtt(response.text);

      return res.send(parsedSrt);
    }

    if (contentType) {
      res.setHeader('Content-type', contentType);

      return res.send(response.text);
    }

    return res.send(response.text);
  });

app.prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

    server.get('/', async (req, res) => {
      return app.render(req, res, '/', { queryObject: req.query });
    });

    server.get('/redirect', async (req, res) => {
      const { url } = req.query;

      if (!url) {
        return handle(req, res);
      }

      return handlerRedirection(req, res, url);
    });

    server.get('/:slug', (req, res) => {
      return app.render(req, res, '/movie', { slug: req.params.slug });
    });

    server.get('/:slug/play', (req, res) => {
      return app.render(req, res, '/play', { slug: req.params.slug });
    });

    // For all other routes, use next.js.
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);

    process.exit(1);
  });
