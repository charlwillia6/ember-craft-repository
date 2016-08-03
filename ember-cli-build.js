/* jshint node: true */
/* global require, module */
var path = require('path');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {
        lessOptions: {
            paths: [
                'bower_components/semantic-ui',
                'app/pods/components'
            ]
        },
        outputPaths: {
            app: {
                css: {
                    app: "assets/css/ember-osf-dashboard.css"
                },
                js: "assets/js/ember-osf-dashboard.js"
            },
            vendor: {
                css: "assets/css/vendor.css",
                js: "assets/js/vendor.js"
            }
        },
        SemanticUI: {
            css: false,
            javascript: true,
            fonts: true,
            cssPath: "assets/css"
        },
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import(path.join(app.bowerDirectory, 'dropzone/dist/basic.css'));
    app.import(path.join(app.bowerDirectory, 'dropzone/dist/dropzone.css'));
    app.import(path.join(app.bowerDirectory, 'dropzone/dist/dropzone.js'));
    app.import(path.join(app.bowerDirectory, 'jquery.tagsinput/src/jquery.tagsinput.js'));

    return app.toTree();
};
