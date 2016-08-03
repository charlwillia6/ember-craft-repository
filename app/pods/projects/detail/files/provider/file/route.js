// app/pods/projects/detail/files/provider/file/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    fileManager: Ember.inject.service(),
    model(params) {
        // TODO:60 verify this file actually belongs to the parent project?
        return this.store.findRecord('file', params.file_id);
    },
    setupController(controller, model) {
        this._super(controller, model);
        let project = this.modelFor('projects.detail');
        controller.set('project', project);
    },
    actions: {
        download(versionID) {
            let file = this.modelFor(this.routeName);
            let options = {};
            if (typeof versionID !== 'undefined') {
                options.query = {
                    version: versionID
                };
            }
            let url = this.get('fileManager').getDownloadUrl(file, options);
            window.open(url);
        }
    }
});
