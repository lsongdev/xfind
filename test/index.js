const xfind = require('..');
const assert = require('assert');

const r = xfind.compile('/tmp/*.js');

assert.equal(r.dir, '/tmp');
