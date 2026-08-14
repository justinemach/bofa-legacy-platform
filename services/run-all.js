/*
 * Starts every mock edge service in one terminal:  npm run services
 */
'use strict';

const { fork } = require('child_process');
const path = require('path');

const services = [
  'accounts-api',
  'cards-api',
  'mortgage-api',
  'wealth-api',
  'payments-api',
];

const children = services.map((name) =>
  fork(path.join(__dirname, name, 'index.js'), [], { stdio: 'inherit' })
);

process.on('SIGINT', () => {
  children.forEach((child) => child.kill('SIGINT'));
  process.exit(0);
});
