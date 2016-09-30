// app/pods/components/navbar-main/component.js
import Ember from 'ember';
import layout from './template';
import config from 'ember-get-config';

export default Ember.Component.extend({
    layout,
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    attributeBindings:['elementId:id'],
    elementId: 'navbar-main',
    classNames: ['navbar', 'main'],
    onSearchPage: false,
    hideSearch: false,
    user: null,
    signupUrl: config.OSF.url + 'register',
    gravatarUrl: Ember.computed('user', function() {
        let imgLink = this.get('user.links.profile_image');
        if (imgLink) {
            imgLink += '&s=25';
        }
        return imgLink;
    }),
    fullName: null,
    host: config.OSF.url,
    isAuthenticated: Ember.on('init', Ember.observer('session.isAuthenticated', function() {
        this.get('currentUser').load().then(user => this.set('user', user));
    })),
    showSearch: false,
    // TODO: These parameters are defined in osf settings.py; make sure ember config matches.
    allowLogin: true,
    enableInstitutions: true,
    actions: {
        toggleSearch() {
            this.toggleProperty('showSearch');
        },
        logout() {
            // TODO: May not work well if logging out from page that requires login- check?
            // TODO: Remove cookies on logout should be implemented
            this.get('session').invalidate();
            this.get("routing").transitionTo('login');
        },
        toggleSidebar: function(subSidebarName) {
            // this.sendAction(...arguments);
            $('#'+subSidebarName)
                .sidebar('setting', 'transition', 'push')
                .sidebar('toggle');
        }
    }
});
