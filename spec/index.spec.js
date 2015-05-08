describe('sails-hook-bem-render', function() {
    var sailsObject;

    // Before running any tests, attempt to lift Sails
    beforeEach(function(done) {

        // Attempt to lift sails
        require('sails').Sails().lift(
            {
                hooks: {
                    "sails-hook-bem-render": require('../lib/'),
                    "grunt": false
                },
                views: {
                    dir: 'spec/mock/'
                },
                log: {level: "silent"}
            },
            function(err, sails) {
                if (err) return;

                sailsObject = sails;
                done();
            });
    });

    // Test that Sails can lift with the hook in place
    it('sails should be defined', function() {
        expect(sailsObject).toBeDefined();
    });

    it('sails-hook-bem-render hook should be defined', function() {
        expect(sailsObject.hooks['sails-hook-bem-render']).toBeDefined();
    });

    // After tests are complete, lower Sails
    afterEach(function(done) {

        // Lower Sails (if it successfully lifted)
        if (sailsObject) {
            sailsObject.lower(done);
        }
        // Otherwise just return
        done();
    });

});
