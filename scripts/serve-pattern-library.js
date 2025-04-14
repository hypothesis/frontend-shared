import express from 'express';
import log from 'fancy-log';
import * as path from 'path';
import { fileURLToPath } from 'url';

export function servePatternLibrary(port = 4001) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const app = express();

  // Map paths from which we serve static files
  app.use('/scripts', express.static(path.join(dirname, '../build/scripts')));
  app.use('/styles', express.static(path.join(dirname, '../build/styles')));
  app.use('/images', express.static(path.join(dirname, '../images')));
  app.use(
    '/examples',
    express.static(path.join(dirname, '../src/pattern-library/examples')),
  );

  // For any other path, serve the index.html file to allow client-side routing
  app.get('/{:path}', (req, res) => {
    res.sendFile(path.join(dirname, '../templates/index.html'));
  });

  app.listen(port, () => {
    log(`Pattern library available at http://localhost:${port}`);
  });
}
