[![Build Status](https://travis-ci.org/alexbaumgertner/sails-hook-bem-render.svg)](https://travis-ci.org/alexbaumgertner/sails-hook-bem-render) [![GitHub Release](https://img.shields.io/github/release/alexbaumgertner/sails-hook-bem-render.svg)](https://github.com/alexbaumgertner/sails-hook-bem-render/releases)

### BEM template render for Sails js

* BEM: http://bem.info
* Sailsjs: http://sailsjs.org

### Install [![NPM version](https://badge.fury.io/js/sails-hook-bem-render.svg)](http://badge.fury.io/js/sails-hook-bem-render)
(sails >= 0.11)
* add this hook to package.json: `npm i sails-hook-bem-render --save`
* use in your controllers `res.render(data)`

(sails < 0.11) also needs explicit hooks declaration:
* create `bem-render` folder in `api/hooks`
* create `index.js` file in `api/hooks/bem-render/`
* write in `api/hooks/bem-render/index.js` this:
```js
   module.exports = require('sails-hook-bem-render');
```
### Usage
For example project see [sails-bem-project-stub](https://github.com/alexbaumgertner/sails-bem-project-stub).

1. Create a `/views/common` directory for BEM blocks.
2. Create `/views/.enb` directory with make-config file for [`enb` assembler](https://github.com/enb-make/enb).
You can copy config from [sails-bem-project-stub/views/.enb/make.js](https://github.com/alexbaumgertner/sails-bem-project-stub/blob/master/views/.enb/make.js). Notice: there is only `desktop` config yet.
3. Create `/views/desktop.bundles/index/index.bemdecl.js` file – dependency declaration for `enb` assembler:
```js
exports.blocks = [
    {block: 'page'} // Other dependencies will be declare in `page` block.
];
```
4. Add dependencies:
4.1 npm dependency for BEM and enb to package.json:
```js
  "dependencies": {
    "vow": "^0.4.5",
    "ym": "^0.1.0"
  },
  "devDependencies": {
    "bem": "^0.9.0",
    "borschik": "^1.3.0",
    "borschik-tech-cleancss": "^1.0.0",
    "bower": "^1.3.9",
    "enb": "^0.13.7",
    "enb-autoprefixer": "^0.1.1",
    "enb-bem": "0.1.0-beta2",
    "enb-bemxjst": "^1.3.2",
    "enb-borschik": "^1.1.1",
    "enb-diverse-js": "^0.1.0",
    "enb-modules": "^0.2.0",
    "enb-stylus": "1.1.2"
    }
```
4.2 bower:
```js
  "dependencies": {
    "bem-core": "2.6.0"
  }
```
Don't forget to add `.bowerrc` file:
```js
{
    "directory": "views/libs"
}
```
5. After you add your blocks, run `node_modules/.bin/enb make -d views --no-cache`. It will compile BEMTREE, BEMHTML, assemble js, CSS into `views/desktop.bundles/merged` folder.
6. So, in BEMTREE-template `page` block you can access data by `this.ctx.data`.
NB: you can find `req` (`req.session`, `req.path` and other useful stuff) object in `this.ctx.data.req`.
