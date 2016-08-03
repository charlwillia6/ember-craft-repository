// app/pods/projects/detail/draft-registrations/detail/route.js
import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Route.extend({
    model(params) {
        let project = this.modelFor('projects.detail');
        this.store.adapterFor('draft-registration').set('namespace', config.OSF.apiNamespace + '/projects/' + project.id);
        var draft = this.store.findRecord('draft-registration', params.draft_registration_id);
        return draft;
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('project', this.modelFor('projects.detail'));
    }
});
