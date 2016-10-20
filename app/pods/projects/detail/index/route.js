// app/pods/projects/detail/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DebugLoggerMixin from 'ember-craft-repository/mixins/debug-logger';
import UtilsMixin from 'ember-craft-repository/mixins/utils-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, DebugLoggerMixin, UtilsMixin, {
    model() {
        let project = this.modelFor('projects.detail');
        return project.get('files');
    },
    setupController(controller, model) {
        this._super(controller, model);
        let project = this.modelFor('projects.detail');
        controller.set('files', model);
        controller.set('model', project);

        let self = this;
        let start_time = Date.now();

        //Initialize user search dropdown with SOME data.
        this.get('store').query('user', {})
            .then((_users) => {
                var array_users = self.collectionPluckAttributes(_users.content.toArray(), ['_data.fullName', 'id']);
                self.logger.info("Queried "+array_users.length + " users in "+(Date.now()-start_time)+ "ms");
                controller.set('users', array_users);
            })
            .catch(function(e) {
                self.logger.error(e.message);
            });
    },
    actions: {
        refreshModel: function() {
            console.log('Model reloaded.');
            this.refresh();
            // location.reload();
        }
    }
});
