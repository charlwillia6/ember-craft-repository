// app/pods/projects/detail/files/index/controller.js
import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        fileDetail(file) {
            this.transitionToRoute('projects.detail.files.provider.file',
                                   this.get('node'),
                                   file.get('provider'),
                                   file);
        },
        nodeDetail(project) {
            this.transitionToRoute('projects.detail', project);
        }
    }
});
