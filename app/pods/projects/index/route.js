// app/pods/projects/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    // TODO: Compare and test to ember-osf dummy app
    model(routeParams) {
        console.log(this);
        let user = this.modelFor('application');
        var userParams = {
            filter: {
                contributors: ''
            }
        };

        if(user) {
            userParams['filter']['contributors'] = user.id;
            return this.queryForPage('node', routeParams, userParams);
            // return user.get('nodes'); // Fetch from `/users/me/nodes/`
        } else {
            console.log(user);
            this.get('store').findRecord('user', 'me').then(user => user);
            userParams['filter']['contributors'] = user.id;
            return this.queryForPage('node', routeParams, userParams);
            // return this.get('store').findRecord('user', 'me').then(user => user.get('nodes'));
        }
    },
    actions: {
        reloadProjectListRoute: function() {
            this.refresh();
        }
    }
});
