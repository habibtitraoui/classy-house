import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleShippingFeesRequest, loadLocalEnv } from './api/yalidine-fees.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, 'dist');
const port = Number.parseInt(process.env.PORT ?? '4173', 10);

loadLocalEnv(root);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function serveStatic(req, res) {
  const requestUrl = new URL(req.url ?? '/', `http://localhost:${port}`);
  const decodedPath = decodeURIComponent(requestUrl.pathname);
  const requestedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.normalize(path.join(distDir, requestedPath));

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : path.join(distDir, 'index.html');
  const extension = path.extname(finalPath);

  res.writeHead(200, {
    'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
  });
  fs.createReadStream(finalPath).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/api/shipping-fees')) {
    handleShippingFeesRequest(req, res).catch(() => {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Unable to load shipping fees.' }));
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Classy House server running at http://localhost:${port}`);
});
