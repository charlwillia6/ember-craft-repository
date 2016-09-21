// app/pods/index/route.js
// import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//
// export default Ember.Route.extend(AuthenticatedRouteMixin, {
//     session: Ember.inject.service(),
//     store: Ember.inject.service(),
//     setupController: function (controller) {
//         this._super(controller);
//         let user = this.modelFor('application');
//
//         if (user) {
//             controller.set('currentUser', user);
//         } else {
//             this.get('store').findRecord('user', 'me').then(function (user) {
//                 controller.set('currentUser', user);
//             });
//         }
//     }
// });

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    routeParams: null,
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
            // publicParams['filter']['public'] = true;
            this.set('routeParams', routeParams);

            return this.queryForPage('node', routeParams, userParams);
        } else {
            let self = this;

            return this.get('store').findRecord('user', 'me').then(function(user) {
                userParams['filter']['contributors'] = user.id;
                return self.queryForPage('node', routeParams, userParams);
            });
        }
    },
    setupController: function(controller, model) {
        var publicParams = {
            filter: {
                public: ''
            }
        };

        let routeParams = this.get('routeParams');
        publicParams['filter']['public'] = true;

        controller.set('publicProjects', this.queryForPage('node', routeParams, publicParams));
        controller.set('model', model);
    },
    actions: {
        reloadProjectListRoute: function() {
            this.refresh();
        }
    }
});
