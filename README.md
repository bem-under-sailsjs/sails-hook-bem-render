[![Build Status](https://travis-ci.org/alexbaumgertner/sails-hook-bem-render.svg)](https://travis-ci.org/alexbaumgertner/sails-hook-bem-render) [![GitHub Release](https://img.shields.io/github/release/alexbaumgertner/sails-hook-bem-render.svg)](https://github.com/alexbaumhertner/sails-hook-bem-render/releases)

### BEM template render for Sails js

* BEM: http://bem.info
* Sailsjs: http://sailsjs.org

### Install [![NPM version](https://badge.fury.io/js/sails-hook-bem-render.svg)](http://badge.fury.io/js/sails-hook-bem-render)
* add your hook to package.json: `npm i sails-hook-bem-render --save`
* create `bem-render` folder in `api/hooks`
* create `index.js` file in `api/hooks/bem-render/`
* (sails < 0.11) write in `api/hooks/bem-render/index.js` this:
```js
   module.exports = require('sails-hook-bem-render');
```
* use in your controllers `res.render(data)`
