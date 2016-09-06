// app/pods/components/child-project-create/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'child-create',
    tagName: '',
    classNames: ['child', 'create'],
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    responseError: '',
    responseSuccess: '',
    actions: {
        requestChildCreate(name) { // jshint ignore:line
            $('.ui.modal.child.create').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        confirmChildCreate(name) { // jshint ignore:line
            var self = this;
            var project = this.get('store').createRecord('node', {
                title: this.get('title'),
                category: 'project',
                description: this.get('description') || null
            });

            project.save().then(function () {
                console.log("Success!");
                self.set('responseError', '');
                self.set('responseSuccess', `Your project was created successfully!`);
                self.set('title', '');
                self.set('description', '');
                Ember.run.later(name, function () {
                    $('.ui.modal.response.message').modal().modal('show'); // jshint ignore:line
                    Ember.run.later(function () {
                        $('.ui.modal.response.message').modal().modal('hide'); // jshint ignore:line
                        self.sendAction('reloadRoute');
                    }, 2000);
                }, 300);
            }, function (error) {
                console.log("Error Saving Record: " + error.message);
                self.set('responseSuccess', '');
                self.set('responseError', 'There was an error creating your project.');
                self.set('title', '');
                self.set('description', '');
                Ember.run.later(name, function () {
                    $('.ui.modal.response.message').modal().modal('show'); // jshint ignore:line
                }, 300);
            });
        },
        cancelChildCreate(name) { // jshint ignore:line
            this.set('title', '');
            this.set('description', '');
            // self.set('responseError', '');
            // self.set('responseSuccess', '');
            $('.ui.modal.child.create').modal().modal('hide'); // jshint ignore:line
        }
    }
});
