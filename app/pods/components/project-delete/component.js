// app/pods/components/project-edit/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: '',
    toast: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    selectedModel: '',
    actions: {
        requestDelete(name) {
            this.set('selectedModel', this.get('project'));
            this.selectedModel.deleteRecord();
            $('.ui.project.delete.modal').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        confirmDelete() {
            // TODO: Need to add error handling
            var self = this;
            this.selectedModel.save().then(function () {
                self.get('toast').success('Project deleted successfully');
                self.get('routing').transitionTo('projects.index');
            });
        },
        cancelDelete() {
            this.selectedModel.rollbackAttributes();
        },
    }
});
