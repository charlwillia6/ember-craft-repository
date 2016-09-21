// app/pods/application/route.js
import Ember from 'ember';
import OsfTokenLoginRouteMixin from 'ember-osf/mixins/osf-token-login-route';

export default Ember.Route.extend(OsfTokenLoginRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    model() {
        // TODO: Check if session.session is really necessary
        if(this.get('session.isAuthenticated')) {
            return this.get('store').findRecord('user', 'me');
        }
        return null;
    }
});
