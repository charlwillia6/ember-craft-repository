// app/pods/projects/detail/files/registraions/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        let project = this.modelFor('projects.detail');
        let registrations = project.get('registrations');
        return registrations;
    },
});
