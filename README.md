## xfind [![xfind](https://img.shields.io/npm/v/xfind.svg)](https://npmjs.org/xfind)

> Simple and fast glob alternative in Node.js

### Installation

```bash
$ npm install xfind
```

### Example

```js
const glob = require('xfind');

;(async () => {
  // touch /tmp/{a,b,c}.js /tmp/{d,e,f}.txt /tmp/g.json
  const files = await glob('/tmp/*.js(on)?');
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