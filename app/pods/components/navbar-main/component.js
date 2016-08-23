// app/pods/components/navbar-main/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    isAuthenticated: Ember.observer('session.isAuthenticated', function() {
        this.didReceiveAttrs();
    }),
    currentUserFullName: null,
    user: null,
    tagName: 'navbar-main',
    className: ['navbar', 'main'],
    didReceiveAttrs() {
        this._super(...arguments);

        if (this.get('session.isAuthenticated')) {
            this._setCurrentUser();
        }
    },
    _setCurrentUser() {
        this.get('currentUser').load().then(user => this.set('user', user));
    },
    onGetCurrentUser: Ember.observer('user', function() {
        this.getUser();
    }),
    getUser: function() {
        var user = this.get('user');

        if(user) {
            this.set('user', user);
            this.set('currentUserFullName', user.get('fullName'));
        } else {
            user = this.get('store').findRecord('user', 'me');
            this.set('user', user);
            this.set('currentUserFullName', user.get('fullName'));
        }
    }
});
