// app/pods/application/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    model() {
        if(this.get('session.session.isAuthenticated')) {
            // console.log("1: ", this.get('session'));
            // console.log("2: ", this.get('session.isAuthenticated'));
            // console.log("3: ", this);
            // console.log("4: ", this.get('session.session.isAuthenticated'));
            return this.get('store').findRecord('user', 'me');
        }
        return null;
    },
    // afterModel() {
    //     console.log("session: ", this.get('session'));
    //     console.log("session.isAuthenticated: ", this.get('session.isAuthenticated'));
    //     console.log("session.session.isAuthenticated: ", this.get('session.session.isAuthenticated'));
    //     console.log("this: ", this);
    //     console.log("session.session.authenticator: ", this.get('session.session.authenticator'));
    //     console.log("session.session: ", this.get('session.session'));
    // }
    // ,
    // actions: {
    //     menuSidebarTransition() {
    //         $('.left.mobile-menu.sidebar')
    //         .sidebar('setting', 'transition', 'overlay')
    //         .sidebar('attach events', '.item.menu-toggle');
    //     }
    // }
});
