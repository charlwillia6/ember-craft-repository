// app/pods/projects/detail/controller.js
import Ember from 'ember';
import TaggableMixin from 'ember-osf/mixins/taggable-mixin';

export default Ember.Controller.extend(TaggableMixin, {
    editedPermissions: {},
    editedBibliographic: {},
    responseSuccess: '',
    responseError: '',
    selectedModel: '',
    actions: {
        expandProperties() {
            this.toggleProperty('propertiesVisible');
        },
        permissionChange(permission) {
            // Adds updated permissions for a certain contributor
            var p = permission.split(' ');
            var permissions = p[0];
            var contributorId = p[1];
            this.editedPermissions[contributorId] = permissions;
        },
        bibliographicChange(target) {
            // Adds updated bibliographic info for a certain contributor
            var bibliographic = target.checked;
            var contributorId = target.value;
            this.editedBibliographic[contributorId] = bibliographic;
        },
        requestDelete(project, name) {
            this.set('selectedModel', project);
            this.selectedModel.deleteRecord();
            $('.ui.modal').modal('setting', 'closable', false).modal('show');
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
