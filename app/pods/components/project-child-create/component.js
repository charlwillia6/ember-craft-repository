// app/pods/components/child-project-create/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: '',
    classNames: ['project', 'child', 'create'],
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    toast: Ember.inject.service(),
    actions: {
        requestProjectChildCreate(name) { // jshint ignore:line
            $('.ui.modal.project.child.create').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        confirmProjectChildCreate(name) { // jshint ignore:line
            var self = this;
            var project = this.get('store').createRecord('node', {
                title: this.get('title'),
                category: 'project',
                description: this.get('description') || null
            });

            project.save().then(function () {
                console.log("Success!");
                self.set('title', '');
                self.set('description', '');
                self.get('toast').success('File uploaded successfully');
                Ember.run.once(function() {
                    self.sendAction('reloadRoute');
                });
            }, function (error) {
                console.log("Error Saving Record: " + error.message);self.set('title', '');
                self.set('description', '');
                self.get('toast').error('There was an error creating your project.');
            });
        },
        cancelProjectChildCreate(name) { // jshint ignore:line
            this.set('title', '');
            this.set('description', '');
            $('.ui.modal.project.child.create').modal().modal('hide'); // jshint ignore:line
        }
    }
});
