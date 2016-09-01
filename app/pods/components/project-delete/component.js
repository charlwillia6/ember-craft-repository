// app/pods/components/project-edit/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: '',
    classNames: ['project', 'delete'],
    responseError: '',
    responseSuccess: '',
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
                self.sendAction('transitionTo');
            });
        },
        cancelDelete() {
            this.selectedModel.rollbackAttributes();
        }
    }
});
