// app/pods/projects/detail/files/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController(controller, model) {
        this._super(controller, model);
        let project = this.modelFor('projects.detail');
        controller.set('project', project);
    },
    actions: {
        refreshModel: function() {
            this.modelFor('projects.detail.files.index').reload();
            this.refresh();
            console.log(this);
            console.log('Model reloaded.');
        }
    }
});
