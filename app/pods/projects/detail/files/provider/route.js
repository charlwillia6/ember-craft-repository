// app/pods/projects/detail/files/provider/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        let fileProviders = this.modelFor('projects.detail.files');
        // console.log(params);
        // console.log(fileProviders);
        return fileProviders.findBy('provider', params.provider);
    },
});
