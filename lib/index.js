var path = require('path');
var fs = require('fs');
var vm = require('vm');
var vow = require('vow');

module.exports = function(sails) {

    var sailsViewsDir = sails.config.views.dir || 'views/desktop.bundles/merged/',
        staticDir = path.resolve(sails.config.appPath, sailsViewsDir),
        BEMTREE_CTX = {Vow: vow, console: console},

    // BEMTREE require `vow` to run and `console` added just for convenience
        BEMTREE_SOURCE = fs.readFileSync(path.resolve(staticDir, 'merged.bemtree.js')),
        BEMTREE,
        BEMHTML = require(path.resolve(staticDir, 'merged.bemhtml.js')).BEMHTML;

    vm.runInNewContext(BEMTREE_SOURCE, BEMTREE_CTX);

    BEMTREE = BEMTREE_CTX.BEMTREE;

    return {

        initialize: function(cb) {
            cb();
        },

        routes: {
            before: {
                '/*': function(req, res, next) {

                    /* Redefine Sails `render` method
                     *
                     * @param {Object} data
                     * @param {JSON} data.data source data to render
                     * @param {Function} callback
                     */
                    res.render = function render(data, callback) {

                        // extend data by req
                        data.data.req = req;

                        try {
                            BEMTREE
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

                        } catch(e) {
                            next(e);
                        }
                    };

                    next();
                }
            }
        }
    };
};
