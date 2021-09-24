## xfind

> Simple and fast glob alternative in Node.js

[![xfind](https://img.shields.io/npm/v/xfind.svg)](https://npmjs.org/xfind)
[![Build Status](https://travis-ci.org/song940/xfind.svg?branch=master)](https://travis-ci.org/song940/xfind)

### Installation

```bash
$ npm install xfind
```

### Example

```js
const xfind = require('xfind');

;(async () => {
  // touch /tmp/{a,b,c}.js /tmp/{d,e,f}.txt /tmp/g.json
  const files = await xfind.collect('/tmp/(!node_modules/)*.js(on)?');
  console.log(files);
  /* outputs: [
  '/tmp/a.js',
  '/tmp/b.js',
  '/tmp/c.js',
  '/tmp/g.json' ] */
})();

```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---