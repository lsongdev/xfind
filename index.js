const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { promisify } = require('util');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const list = async dir => {
  const files = await readdir(dir);
  return files.map(f => path.join(dir, f));
};

const getDir = str => {
  while (/[\?\*\(\[\{]+/.test(str))
    str = path.dirname(str);
  return str;
};

const noop = () => { };

const walk = async (dir, filter) => {
  var cur;
  const dirs = [dir], result = [];
  while (cur = dirs.pop()) {
    const files = await list(cur);
    const stats = await Promise.all(files.map(file => stat(file).catch(noop)));
    const temps = stats.filter(Boolean).map((st, i) => (st.filename = files[i], st));
    for (const file of temps) {
      file.isDirectory() ? dirs.push(file.filename) : (
        filter(file) && result.push(file.filename)
      );
    }
  }
  return result;
};

const compile = str => {
  var exp = '';
  var flags = [];
  var dir = getDir(str);
  var glob = str.substr(dir.length);
  ~glob.indexOf('/') && (glob = glob.substr(1));
  for (const c of glob.split('')) {
    switch (c) {
      case '*':
        exp += '.*';
        break;
      case '.':
        exp += '\\.';
        break;
      case '!':
        exp += '?!.*?';
        break;
      default:
        exp += c;
        break;
    }
  }
  return {
    dir,
    expr: new RegExp(`^${exp}$`, flags)
  };
};

const xfind = (pattern, cb = noop) => {
  assert.ok(pattern);
  const { dir, expr } = compile(pattern);
  const filter = file => expr.test(file.filename) && (cb(file) !== false);
  return walk(dir, filter);
};

xfind.walk = walk;
xfind.compile = compile;

module.exports = xfind;