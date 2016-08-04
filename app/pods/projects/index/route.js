// app/pods/projects/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    // TODO: Compare and test to ember-osf dummy app
    model(routeParams) {
        let user = this.modelFor('application');
        var userParams = {
            filter: {
                contributors: ''
            }
        };

        if(user) {
            userParams['filter']['contributors'] = user.id;
            return this.queryForPage('node', routeParams, userParams);
        } else {
            let self = this;

            return this.get('store').findRecord('user', 'me').then(function(user) {
                userParams['filter']['contributors'] = user.id;
                return self.queryForPage('node', routeParams, userParams);
            });
        }
    },
    actions: {
        reloadProjectListRoute: function() {
            this.refresh();
        }
    }
});
