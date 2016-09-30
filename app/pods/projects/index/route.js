// app/pods/projects/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    routeParams: null,
    setupController: function(controller, model) {

        this._super(controller);
        let user = this.modelFor('application');

        if (user) {
            controller.set('currentUser', user);
            console.log(controller.get('currentUser'));
            console.log(controller.get('currentUser').get('fullName'));
        } else {
            this.get('store').findRecord('user', 'me').then(function (user) {
                controller.set('currentUser', user);
            });
        }
    },
    actions: {
        reloadProjectListRoute: function() {
            this.refresh();
        }
    }
});
