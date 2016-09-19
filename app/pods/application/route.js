// app/pods/application/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    model() {
        // TODO: Check if session.session is really necessary
        // if(this.get('session.session.isAuthenticated')) {
        if(this.get('session.isAuthenticated')) {
            return this.get('store').findRecord('user', 'me');
        }
        return null;
    }
});
