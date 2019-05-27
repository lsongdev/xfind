const glob = require('..');

;(async () => {
  // touch /tmp/{a,b,c}.js /tmp/{d,e,f}.txt /tmp/g.json
  // const files = await glob('/tmp/(!node_modules/)*.js(on)?');
  const files = await glob('/Users/Lsong/Projects/**/package.js(on)?', file => {
    console.log(file.filename)
    return false;
  });
  /* outputs: [
  '/tmp/a.js',
  '/tmp/b.js',
  '/tmp/c.js',
  '/tmp/g.json' ] */
})();