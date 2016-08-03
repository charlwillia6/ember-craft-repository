// app/pods/projects/detail/draft-registrations/index/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        let project = this.modelFor('projects.detail');
        let drafts = project.get('draftRegistrations');
        return drafts;
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.store.findAll('metaschema').then(function(metaschemas) {
            controller.set('metaschemas', metaschemas);
        });
        controller.set('project', this.modelFor('projects.detail'));
    }
});
