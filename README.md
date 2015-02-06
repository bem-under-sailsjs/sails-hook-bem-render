### BEM template render for Sails js

* BEM: http://bem.info
* Sailsjs: http://sailsjs.org

### Install
* add your hook to package.json: `npm i sails-hook-bem-render --save`
* create `bem-render` folder in `api/hooks`
* create `index.js` file in `api/hooks/bem-render/`
* write in `api/hooks/bem-render/index.js` this: 
```js
   module.exports = require('sails-hook-bem-render');
```
* use in your controllers `res.render(data)`
