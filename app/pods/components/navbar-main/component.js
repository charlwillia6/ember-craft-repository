// app/pods/components/navbar-main/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    user: null,
    isAuthenticated: Ember.on('init', Ember.observer('session.isAuthenticated', function() {
        this.get('currentUser').load().then(user => this.set('user', user));
    })),
    currentUserFullName: Ember.computed.alias('user.fullName'),
    attributeBindings:['elementId:id'],
    elementId: 'navbar-main',
    className: ['navbar', 'main']
});
