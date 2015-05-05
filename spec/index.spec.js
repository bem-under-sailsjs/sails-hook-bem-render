describe('sails-hook-bem-render', function() {
    var sailsObject;

    // Before running any tests, attempt to lift Sails
    beforeEach(function(done) {

        // Attempt to lift sails
        require('sails').Sails().lift(
            {
                hooks: {
                    // Load the hook
                    "sails-hook-bem-render": require('../lib/'),
                    // Skip grunt (unless your hook uses it)
                    "grunt": false
                },
                views: {
                    dir: 'spec/mock/'
                },
                log: {level: "silent"}
            },
            function(err, sails) {
                done();
            });
    });

    // Test that Sails can lift with the hook in place
    it('sails should be defined', function() {
        expect(sails).toBeDefined();
    });

    it('sails-hook-bem-render hook should be defined', function() {
        expect(sails.hooks['sails-hook-bem-render']).toBeDefined();
    });

    // After tests are complete, lower Sails
    afterEach(function(done) {

        // Lower Sails (if it successfully lifted)
        if (sails) {
            sails.lower(done);
        }
        // Otherwise just return
        done();
    });

});
