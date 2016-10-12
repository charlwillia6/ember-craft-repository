// app/app.js
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;
// Ember.keys(Ember.TEMPLATES);     // Log all loaded templates.

// Uncomment if we want to archive debug logs to the server.
// Ember.onerror = function(error) {
//     Ember.$.ajax('/notifications/error', {
//         type: 'POST',
//         data: {
//             stack: error.stack,
//             otherInformation: 'exception message'
//         }
//     });
// }

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,  // Uncomment for more verbose debugging - Adam.
    Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
