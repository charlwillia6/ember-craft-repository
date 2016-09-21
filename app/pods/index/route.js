// app/pods/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, {
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    routeParams: null,
    userParams: null,
    model(routeParams) {
        let user = this.modelFor('application');
        var userParams = {
            filter: {
                contributors: '',
                public: ''
            }
        };
        console.log(routeParams);

        routeParams['page_size'] = 3;
        userParams['filter']['public'] = false;
        this.set('routeParams', routeParams);

        if(user) {
            userParams['filter']['contributors'] = user.id;
            this.set('userParams', userParams);

            return this.queryForPage('node', routeParams, userParams);
        } else {
            let self = this;

            return this.get('store').findRecord('user', 'me').then(function(user) {
                userParams['filter']['contributors'] = user.id;
                this.set('userParams', userParams);

                return self.queryForPage('node', routeParams, userParams);
            });
        }
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        let user = this.modelFor('application');
        let publicParams = this.get('userParams');
        let routeParams = this.get('routeParams');

        if (user) {
            controller.set('currentUser', user);
        } else {
            this.get('store').findRecord('user', 'me').then(function (user) {
                controller.set('currentUser', user);
            });
        }

        console.log('routeParams', this.get('routeParams'));

        routeParams['page_size'] = 6;
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
