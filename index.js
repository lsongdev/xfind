
const fs = require('fs').promises;
const { join, dirname } = require('path');

/**
 * walk
 * @param {*} dir 
 */
async function* walk(dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name)
    if (d.isDirectory()) yield* walk(entry)
    else if (d.isFile()) yield entry
  }
}

/**
* path without *?(){}
* "/path/to/dir/*.js" => "/path/to/dir"
* "/tmp/(!node_modules/)*.js(on)?" => "/tmp"
*/
const getDir = str => {
  while (/[\?\*\(\[\{]+/.test(str))
    str = dirname(str);
  return str;
};

/**
 * compile
 * @param {*} str 
 * @returns 
 */
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

/**
 * xfind
 * @param {*} pattern 
 * @param {*} cb 
 */
const xfind = async (pattern, cb = noop) => {
  const { dir, expr } = compile(pattern);
  for await (const file of walk(dir)) {
    expr.test(file) && cb(file);
  }
};

/**
 * collect
 * @param {*} pattern 
 * @returns 
 */
const collect = async pattern => {
  const files = [];
  await xfind(pattern, file => files.push(file));
  return files;
};

xfind.walk = walk;
xfind.compile = compile;
xfind.collect = collect;

module.exports = xfind;
