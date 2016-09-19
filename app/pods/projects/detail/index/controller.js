// app/pods/projects/detail/index/controller.js
import Ember from 'ember';
import CommentableMixin from 'ember-osf/mixins/commentable';
import TaggableMixin from 'ember-osf/mixins/taggable-mixin';
import NodeActionsMixin from 'ember-osf/mixins/node-actions';

export default Ember.Controller.extend(CommentableMixin, TaggableMixin, NodeActionsMixin, {
    responseSuccess: '',
    responseError: '',
    selectedModel: '',
    actions: {
        requestDelete(project, name) { // jshint ignore:line
            this.set('selectedModel', project);
            this.selectedModel.deleteRecord();
            $('.ui.modal').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        confirmDelete() {
            var self = this;
            this.selectedModel.save().then(function() {
                self.transitionToRoute('projects.index');
            });
        },
        cancelDelete() {
            this.selectedModel.rollbackAttributes();
        },
        closeMessage: function() {
            this.set('responseSuccess', '');
            this.set('responseError', '');
        },
        // TODO: Put these actions in file component
        fileDetail(file) {
            console.log("this.get('node'); ", this.get('node'));
            console.log("file.get('provider'); ", file.get('provider'));
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
