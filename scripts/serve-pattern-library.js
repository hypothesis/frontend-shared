/* eslint-env node */
'use strict';

const path = require('path');

const express = require('express');
const mustacheExpress = require('mustache-express');

const log = require('fancy-log');

function servePatternLibrary(port = 4001) {
  const app = express();
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', [path.join(__dirname, '../templates')]);

  app.use('/scripts', express.static(path.join(__dirname, '../build/scripts')));

  app.use('/styles', express.static(path.join(__dirname, '../build/styles')));

  app.get('/:path?', (req, res) => {
    res.render('pattern-library');
  });

  app.listen(port, () => {
    log(`Pattern library available at http://localhost:${port}`);
  });
}

module.exports = servePatternLibrary;
