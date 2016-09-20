// app/pods/components/navbar-main/component.js
import Ember from 'ember';
import layout from './template';
import config from 'ember-get-config';


export default Ember.Component.extend({
    routing: Ember.inject.service('-routing'),
    layout,
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    attributeBindings:['elementId:id'],
    elementId: 'navbar-main',
    className: ['navbar', 'main'],
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
    // _loadCurrentUser() {
    //     this.get('currentUser').load().then((user) => this.set('user', user));
    // },
    // init() {
    //     this._super(...arguments);
    //     // TODO: React to changes in service/ event?
    //     if (this.get('session.isAuthenticated')) {
    //         this._loadCurrentUser();
    //     }
    // },
    // currentUserFullName: Ember.computed.alias('user.fullName'),
    // TODO: These parameters are defined in osf settings.py; make sure ember config matches.
    allowLogin: true,
    enableInstitutions: true,
    actions: {
        toggleSearch() {
            this.toggleProperty('showSearch');
        },
        logout() {
           // alert("Logging out !!")
            // TODO: May not work well if logging out from page that requires login- check?
            this.get('session').invalidate();
            this.get("routing").transitionTo('login');
        },
        toggle: function(subSidebarName) {
            console.log(subSidebarName);
            $('#'+subSidebarName)
                .sidebar('setting', 'transition', 'push')
                .sidebar('toggle')
            ;
        },
        closeMenu : function() {
            $('.sidebar').sidebar("toggle");
        }
    }
});
