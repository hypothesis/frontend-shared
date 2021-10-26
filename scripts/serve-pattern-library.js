import * as path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import log from 'fancy-log';
import mustacheExpress from 'mustache-express';

export function servePatternLibrary(port = 4001) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const app = express();
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', [path.join(dirname, '../templates')]);
  app.use('/scripts', express.static(path.join(dirname, '../build/scripts')));
  app.use('/styles', express.static(path.join(dirname, '../build/styles')));
  app.get('/:path?', (req, res) => {
    res.render('pattern-library');
  });

  app.listen(port, () => {
    log(`Pattern library available at http://localhost:${port}`);
  });
}
