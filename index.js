var path = require('path');
var fs = require('fs');
var vm = require('vm');
var vow = require('vow');

module.exports = function(sails) {

    return {

        defaults: {
            staticDir: path.resolve(sails.config.appPath, 'views', 'desktop.bundles', 'merged')
        },

        initialize: function(cb) {
            var _this = this;

            // Read project templates, in views/desktop.bundles/merged by default
            var BEMTREE = fs.readFileSync(path.resolve(_this.defaults.staticDir, 'merged.bemtree.js'));
            var BEMHTML = require(path.resolve(_this.defaults.staticDir, 'merged.bemhtml.js')).BEMHTML;

            // BEMTREE require `vow` to run and `console` added just for convenience
            var bemtreeCtx = {Vow: vow, console: console};

            // Based on sails/lib/hooks/views/index.js
            sails.on('router:before', function() {
                sails.router.bind('/*', function(req, res, next) {

                    // redefine `render` method
                    res.render = function render(data) {
                        vm.runInNewContext(BEMTREE, bemtreeCtx);

                        // extend data by req
                        data.data.req = req;

                        bemtreeCtx
                            .BEMTREE
                            .apply(data) // get BEMJSON
                            .then(function(bemjson) {
                                var html = BEMHTML.apply(bemjson); // render BEMJSON to HTML

                                res.set({
                                    'Content-Type': 'text/html',
                                    'Content-Length': Buffer.byteLength(html, 'utf8')
                                });

                                res.send(html);
                            });
                    };

                    next();

                }, 'all');
            });

            return cb();
        }
    };
};
