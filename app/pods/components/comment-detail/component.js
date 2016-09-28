// app/pods/components/comment-detail/component.js
import CommentDetail from 'ember-osf/components/comment-detail/component';
import layout from './template';
import Ember from 'ember';

export default CommentDetail.extend({
    layout,
    tagName: '',
    classNames: ['comment', 'detail'],
    toast: Ember.inject.service(),
    store: Ember.inject.service(),
    isEditable: false,
    user: null,
    comment: null,
    // TODO: Very slow finding username and gravatarUrl.  Needs reworked.
    commentUserFullName: Ember.computed('comment', function() {
        console.log(this.get('comment'));
        this.set('user', this.get('comment.user'));
        this.get('user').then(user => {
            // console.log(user.get('fullName'));
            if(this.isDestroyed) {
                return;
            }
            this.set('commentUserFullName', user.get('fullName'));
        });
    }),
    gravatarUrl: Ember.computed('comment', function() {
        var imgLink = '';
        this.set('user', this.get('comment.user'));
        console.log(this.get('user'));
        this.get('user').then(user => {
            imgLink = user.get('links.profile_image');
            // console.log(imgLink);
            if (imgLink) {
                imgLink += '&s=25';
            }
            if(this.isDestroyed) {
                return;
            }
            this.set('gravatarUrl', imgLink);
        });
    }),
    actions: {
        reportComment(comment) {
            this.sendAction('reportComment', comment);
        },
        toggleEdit() {
            this.set('isEditable', true);
        },
        deleteComment(comment) {
            this.sendAction('deleteComment', comment);
        },
        editComment(comment) {
            this.sendAction('editComment', comment);
            this.set('isEditable', false);
            this.get('toast').success("You comment has been edited");
        }
    }
});
