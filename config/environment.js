// config/environment.js
/* jshint node: true */
module.exports = function(environment) {
  // Allow the dummy app to support either token or cookie auth as needed. (default to tokens)
  var AUTHORIZER = process.env.AUTHORIZER || 'token';
  var authConfig = {};
  if (AUTHORIZER === 'cookie') {
      authConfig = {
          authorizer: 'authorizer:osf-cookie',
          authenticator: 'authenticator:osf-cookie',
          authenticationRoute: 'cookielogin'
      };
  }

  var ENV = {
    modulePrefix: 'ember-craft-repository',
    podModulePrefix: 'ember-craft-repository/pods',
    environment: environment,
    locationType: 'auto',
    rootURL: '/',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false,
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    authorizationType: AUTHORIZER,
    'ember-simple-auth': authConfig, // TODO: Does this override any default behaviors?
    i18n: {
      defaultLocale: 'en-US'
    },
    'ember-cli-mirage': {
        enabled: false
    },
    'ember-toastr': {
      injectAs: 'toast',
      toastrOptions: {
        closeButton: true,
        progressBar: true,
        onclick: null,
        timeOut: '10000',
        extendedTimeOut: '1000'
      }
    }
  };

  /*if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }*/

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }
  if (environment === 'staging') {
    ENV.APP.LOG_TRANSITIONS = true;
  }
  if (environment === 'staging2') {
    ENV.APP.LOG_TRANSITIONS = true;
  }
  // if (environment === 'production') {}
  return ENV;
};
