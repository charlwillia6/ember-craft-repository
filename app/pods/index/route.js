// app/pods/index/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    // TODO: Compare and test to ember-osf dummy app
    // model() {
        // let user = this.modelFor('application');
        // console.log('user: ', user);
        //
        // if(user) {
        //     return user;
        //     // userParams['filter']['contributors'] = user.id;
        //     // this.set('currentUser', user.get('fullName'));
        //     // return this.queryForPage('node', routeParams, userParams);
        //     // return user.get('nodes'); // Fetch from `/users/me/nodes/`
        // } else {
        //     return this.get('store').findRecord('user', 'me');
        //
        //     // userParams['filter']['contributors'] = user.id;
        //     // this.set('currentUser', user.get('fullName'));
        //     // return this.queryForPage('node', routeParams, userParams);
        //     // return this.get('store').findRecord('user', 'me').then(user => user.get('nodes'));
        //
        // }
    // },
    // setupController: function(controller) {
    //     this._super(controller);
    //     let user = this.modelFor('application');
    //     console.log('user: ', user);
    //
    //     if(!user) {
    //         console.log('first');
    //         this.get('store').findRecord('user', 'me').then(function(user) {
    //             controller.set('user_id', user.get('id'));
    //         });
    //
    //         // userParams['filter']['contributors'] = user.id;
    //         // this.set('currentUser', user.get('fullName'));
    //         // return this.queryForPage('node', routeParams, userParams);
    //         // return this.get('store').findRecord('user', 'me').then(user => user.get('nodes'));
    //     } else {
    //         console.log('second');
    //         controller.set('user_id', user.get('id'));
    //     }
    //
    //     console.log('user_id: ', controller.user_id);
    //     console.log('controller: ', controller);
    //
    //     // console.log(controller.user.get('fullName'));
    //     // var fullName = controller.user.get('fullName');
    //     // controller.set('currentUser', fullName);
    //     // console.log(controller.currentUser);
    //     // console.log(controller);
    //
    // //     this._super(controller, model);
    // //     console.log(model);
    // //     console.log(controller);
    // //     var fullName = model.get('fullName');
    // //     controller.set('currentUser', fullName);
    // //     controller.set('model', model);
    // //     console.log(controller);
    // }
});
