var path = require('path');
var fs = require('fs');
var vm = require('vm');
var vow = require('vow');

module.exports = function(sails) {
    var sailsViewsDir = sails.config.views.dir || 'views/desktop.bundles/merged/';

    return {

        defaults: {
            staticDir: path.resolve(sails.config.appPath, sailsViewsDir)
        },

        initialize: function(cb) {
            var _this = this;

            // Read project templates, in views/desktop.bundles/merged by default
            // https://en.bem.info/technology/bemtree/
            var BEMTREE = fs.readFileSync(path.resolve(_this.defaults.staticDir, 'merged.bemtree.js'));
            // https://en.bem.info/technology/bemhtml/
            var BEMHTML = require(path.resolve(_this.defaults.staticDir, 'merged.bemhtml.js')).BEMHTML;

            // BEMTREE require `vow` to run and `console` added just for convenience
            var bemtreeCtx = {Vow: vow, console: console};

            // Based on sails/lib/hooks/views/index.js
            sails.on('router:before', function() {
                sails.router.bind('/*', function(req, res, next) {

                    /* Redefine Sails `render` method
                     *
                     * @param {Object} data
                     * @param {JSON} data.data source data to render
                     * @param {Function} callback
                     */
                    res.render = function render(data, callback) {
                        vm.runInNewContext(BEMTREE, bemtreeCtx);

                        // extend data by req
                        data.data.req = req;

                        bemtreeCtx
                            .BEMTREE
                            .apply(data) // get BEMJSON from data-JSON
                            .then(function(bemjson) {
                                var html = BEMHTML.apply(bemjson); // render BEMJSON to HTML

                                if (callback && typeof callback === 'function') {
                                    callback(html);

                                } else {
                                    res.set({
                                        'Content-Type': 'text/html',
                                        'Content-Length': Buffer.byteLength(html, 'utf8')
                                    });

                                    res.send(html);
                                }
                            });
                    };

                    next();

                }, 'all');
            });

            return cb();
        }
    };
};
