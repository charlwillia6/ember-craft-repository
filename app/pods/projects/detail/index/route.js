// app/pods/projects/detail/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        let project = this.modelFor('projects.detail');
        return project.get('files');
    },
    setupController(controller, model) {
        this._super(controller, model);
        let project = this.modelFor('projects.detail');
        controller.set('files', model);
        controller.set('model', project);
    },
    actions: {
        refreshModel: function() {
            console.log('Model reloaded.');
            this.refresh();
            // location.reload();
        }
    }
});
