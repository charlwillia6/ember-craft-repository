// app/pods/projects/detail/files/provider/file/revisions/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        let file = this.modelFor('projects.detail.files.provider.file');
        return file.get('versions');
    },
});
