#!/usr/bin/env node

const xfind = require('..');

const [ pattern ] = process.argv.slice(2);

xfind(pattern, filename => {
  console.log(filename);
});