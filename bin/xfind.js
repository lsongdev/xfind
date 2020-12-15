#!/usr/bin/env node

const xfind = require('..');

const [ pattern ] = process.argv.slice(2);

xfind(pattern, file => {
  console.log(file.filename);
});