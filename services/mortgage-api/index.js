/*
 * mortgage-api — mock edge service for the mortgage-origination application.
 *
 * Deliberately dependency-free (Node's built-in http module) so the estate can
 * be started on a laptop without pulling anything from Artifactory. In
 * production these routes are served by the HOME_LOANS service mesh.
 */
'use strict';

const http = require('http');
const fixtures = require('./fixtures.json');

const PORT = process.env.PORT || 7003;
const LOB = 'HOME_LOANS';

const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0];
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Bofa-Lob', LOB);

  if (path === '/health') {
    res.end(JSON.stringify({ status: 'UP', service: 'mortgage-api', lob: LOB }));
    return;
  }

  if (Object.prototype.hasOwnProperty.call(fixtures, path)) {
    res.end(JSON.stringify(fixtures[path]));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'NOT_FOUND', path: path }));
});

server.listen(PORT, () => {
  console.log('[mortgage-api] listening on http://localhost:' + PORT);
});
