// app/pods/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    setupController: function(controller) {
        this._super(controller);
        let user = this.modelFor('application');
        console.log('user: ', user);

        if(user) {
            controller.set('currentUser', user);
        } else {
            this.get('store').findRecord('user', 'me').then(function(user) {
                controller.set('currentUser', user);
            });
        }
        // console.log('currentUser: ', controller.currentUser);
        // console.log('controller: ', controller);
        // console.log('this: ', this);
    }
});