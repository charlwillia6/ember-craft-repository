// app/mixins/paginated-component.js
import Ember from 'ember';
import DebugLogger from 'ember-debug-logger';

export default Ember.Mixin.create({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    logger: {
        error: new DebugLogger('error'),
        debug: new DebugLogger('debug'),
        info: new DebugLogger('info'),
        trace: new DebugLogger('trace')
    }
});
