// app/pods/projects/detail/index/controller.js
import Ember from 'ember';
import CommentableMixin from 'ember-osf/mixins/commentable';
import TaggableMixin from 'ember-osf/mixins/taggable-mixin';
import NodeActionsMixin from 'ember-osf/mixins/node-actions';

export default Ember.Controller.extend(CommentableMixin, TaggableMixin, NodeActionsMixin, {
    toast: Ember.inject.service(),
    propertiesVisible: false,
    isSaving: false,
    responseSuccess: '',
    responseError: '',
    selectedModel: '',
    actions: {
        toggleEditNode() {
            this.toggleProperty('propertiesVisible');
        },
        updateProject() {
            this.set('isSaving', true);
            return this._super(...arguments)
                .then(() => {
                    this.set('isSaving', false);
                    this.get('toast').success('Project updated successfully');
                })
                .catch(() => this.set('isSaving', false));
        },
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
            console.log(this.selectedModel);
            this.selectedModel.rollbackAttributes();
        },
        closeMessage: function() {
            this.set('responseSuccess', '');
            this.set('responseError', '');
        }
    }
});
