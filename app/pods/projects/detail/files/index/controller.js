// app/pods/projects/detail/files/index/controller.js
import Ember from 'ember';

export default Ember.Controller.extend({
    _url: null,
    // TODO: Comeback to the dropzone later
    dropzoneOptions: {
        method: 'PUT'
    },
    actions: {
        fileDetail(file) {
            this.transitionToRoute('projects.detail.files.provider.file',
                                   this.get('project'),
                                   file.get('provider'),
                                   file);
        },
        projectDetail(project) {
            this.transitionToRoute('projects.detail', project);
        },
        buildUrl() {
            return this.get('_url');
        },
        preUpload(comp, drop, file) {
            this.set('openModal', true);
            this.set('latestFileName', file.name);
            var promise = new Ember.RSVP.Promise(resolve => {
                this.set('resolve', resolve);
            });
            return promise;
        }
    }
});
