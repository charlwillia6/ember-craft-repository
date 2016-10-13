// app/pods/users/list/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from  'ember-osf/mixins/paginated-route';
import DebugLogger from 'ember-craft-repository/mixins/debug-logger';

export default Ember.Route.extend(AuthenticatedRouteMixin, PaginatedRouteMixin, DebugLogger, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    model(routeParams) {
        var self = this;
        return this.queryForPage('user', routeParams)
            .then((_users) => {
                _users.forEach((_user) => {
                    self.logger.debug(_user.data);
                });
                return _users;
            });
    }
});
