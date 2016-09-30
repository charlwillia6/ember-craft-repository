// app/pods/components/projects-list/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: '',
    store: Ember.inject.service(),
    toast: Ember.inject.service(),
    actions: {
        requestProjectCreate(name) { // jshint ignore:line
            $('.ui.modal.project.create').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        confirmProjectCreate(name) { // jshint ignore:line
            var self = this;
            console.log(self.get('model'));
            var project = this.get('store').createRecord('node', {
                title: this.get('title'),
                category: 'project',
                description: this.get('description') || null
            });

            project.save().then(function() {
                console.log("Success!");
                self.set('title', '');
                self.set('description', '');
                self.get('toast').success('Project created successfully');
                Ember.run.once(function() {
                    self.sendAction('reloadRoute');
                });
            }, function(error) {
                console.log("Error Saving Record: " + error.message);
                self.set('title', '');
                self.set('description', '');
                self.get('toast').error('There was an error creating your project.');
            });
        },
        cancelProjectCreate(name) { // jshint ignore:line
            this.set('title', '');
            this.set('description', '');
            $('.ui.modal.project.create').modal().modal('hide'); // jshint ignore:line
        }
    }
});
