// app/pods/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    setupController: function (controller) {
        this._super(controller);
        let user = this.modelFor('application');

        if (user) {
            console.log('yep');
            console.log(user.get('fullName'));
            controller.set('currentUser', user);
            console.log(controller.get('currentUser.fullName'));
        } else {
            console.log(this.get('store').findRecord('user', 'me'));
            this.get('store').findRecord('user', 'me').then(function (user) {
                console.log('nope');
                controller.set('currentUser', user);
            });
        }
    }
});
