// app/pods/application/route.js
import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    model() {
        if(this.get('session.isAuthenticated')) {
            // console.log("YES");
            // console.log("1: ", this.get('session'));
            // console.log("2: ", this.get('session.isAuthenticated'));
            // console.log("3: ", this);
            return this.get('store').findRecord('user', 'me');
        }
        // console.log("4: ", this.get('session'));
        // console.log("5: ", this.get('session.isAuthenticated'));
        // console.log("6: ", this);
        return null;
    }
    // ,
    // actions: {
    //     menuSidebarTransition() {
    //         $('.left.mobile-menu.sidebar')
    //         .sidebar('setting', 'transition', 'overlay')
    //         .sidebar('attach events', '.item.menu-toggle');
    //     }
    // }
});
