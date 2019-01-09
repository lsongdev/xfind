const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const list = async dir => {
  const files = await readdir(dir);
  return files.map(f => path.join(dir, f));
};

const getDir = str => {
  while(/[\?\*\(\[\{]+/.test(str)){
    str = path.dirname(str);
  }
  return str;
};

const walk = async dir => {
  const files = await list(dir);
  for(const filename of files){
    const st = await stat(filename);
    if(st.isDirectory()){
      const next = await walk(filename);
      files.push.apply(files, next);
    }
  }
  return files;
};

const compile = str => {
  var exp = '';
  var flags = [];
  var dir = getDir(str);
  var glob = str.substr(dir.length);
  ~glob.indexOf('/') && (glob = glob.substr(1));
  for(const c of glob.split('')){
    switch(c){
      case '*':
        exp += '.*';
        break;
      case '.':
        exp += '\\.';
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

const filter = (files, expr) => {
  return files.filter(f => expr.test(f));
};

module.exports = async (pattern, options) => {
  const { dir, expr } = compile(pattern);
  const files = await walk(dir, options);
  return filter(files, expr);
};