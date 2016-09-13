// app/pods/projects/detail/files/provider/file/controller.js
import Ember from 'ember';
import CommentableMixin from 'ember-osf/mixins/commentable';
import TaggableMixin from 'ember-osf/mixins/taggable-mixin';

export default Ember.Controller.extend(CommentableMixin, TaggableMixin, {
    fileManager: Ember.inject.service(),
    session: Ember.inject.service(),
    checkedIn: Ember.computed.none('model.checkout'),
    canCheckIn: Ember.computed('model.checkout',
                               'session.data.authenticated.id', function() {
        let checkoutID = this.get('model.checkout');
        let userID = this.get('session.data.authenticated.id');
        return checkoutID === userID;
    }),
    canEdit: Ember.computed.or('checkedIn', 'canCheckIn'),
    actions: {
        fileDetail(file) {
            this.transitionToRoute('projects.detail.files.provider.file',
                                   this.get('node'),
                                   file.get('provider'),
                                   file);
        },

        projectDetail(project) {
            this.transitionToRoute('projects.detail', project);
        },

        delete() {
            let file = this.get('model');
            this.get('fileManager').deleteFile(file).then(() => {
                this.transitionToRoute('projects.detail.files', this.get('node'));
            });
        },

        checkOut() {
            let file = this.get('model');
            this.get('fileManager').checkOut(file);
        },

        checkIn() {
            let file = this.get('model');
            this.get('fileManager').checkIn(file);
        },
    }
});
