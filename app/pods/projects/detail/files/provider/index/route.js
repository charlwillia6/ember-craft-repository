import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController(controller, model) {
        this._super(controller, model);
        let project = this.modelFor('projects.detail');
        controller.set('project', project);
    },
});
