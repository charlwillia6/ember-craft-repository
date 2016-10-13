// app/mixins/debug-logger.js
import Ember from 'ember';
import DebugLogger from 'ember-debug-logger';
import config from 'ember-craft-repository/config/environment';

const environment = config.environment;

const error = new DebugLogger('error');
const debug = new DebugLogger('debug');
const info =  new DebugLogger('info');
const trace = new DebugLogger('trace');


export default Ember.Mixin.create({
    logger: function() {
        if(environment !== "production") {
            return {
                error: error,
                debug: debug,
                info:  info,
                trace: trace
            };
        }
        else {
            return {
                error: function(){},
                debug: function(){},
                info: function(){},
                trace: function(){},
            };
        }
    }()
    // logger: {
    //     error: DebugLogger('error'),
    //     debug: DebugLogger('debug'),
    //     info: DebugLogger('info'),
    //     trace: DebugLogger('trace')
    // }
});
