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
For example see [sails-bem-project-stub](https://github.com/alexbaumgertner/sails-bem-project-stub).

1. Create a `/views/common` directory for BEM blocks.
2. Create `/views/.enb` directory with make-config file for [`enb` assembler](https://github.com/enb-make/enb).
You can copy config from [sails-bem-project-stub/views/.enb/make.js](https://github.com/alexbaumgertner/sails-bem-project-stub/blob/master/views/.enb/make.js). Notice: there is only `desktop` config yet.
3. Create `/views/desktop.bundles/index/index.bemdecl.js` file – dependency declaration for `enb` assembler:
```js
exports.blocks = [
    {block: 'page'} // Other dependencies will be declare in `page` block.
];
```
4. After you add your blocks, run `node_modules/.bin/enb make -d views --no-cache`. It will compile BEMTREE, BEMHTML, assemble js, CSS into `views/desktop.bundles/merged` folder.
5. So, in BEMTREE-template `page` block you can access data by `this.ctx.data`.
NB: you can find `req` (`req.session`, `req.path` and other useful stuff) object in `this.ctx.data.req`.
