const glob = require('..');

(async () => {

  const files = await glob('/tmp/*.js(on)?');
  console.log(files);

})();