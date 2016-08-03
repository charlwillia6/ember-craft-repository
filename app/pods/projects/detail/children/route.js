// app/pods/projects/detail/children/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        let project = this.modelFor('projects.detail');
        return project.get('children');
    },
});
