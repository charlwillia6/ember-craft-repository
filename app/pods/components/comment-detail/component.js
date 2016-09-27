// app/pods/components/comment-detail/component.js
import CommentDetail from 'ember-osf/components/comment-detail/component';
import layout from './template';
import Ember from 'ember';

export default CommentDetail.extend({
    layout,
    tagName: '',
    classNames: ['comment', 'detail'],
    // TODO: Very slot finding username and gravatarUrl.  Needs reworked.
    commentUserFullName: Ember.computed('comment', function() {
        this.get('comment.user').then(user => {
            // console.log(user.get('fullName'));
            if(this.isDestroyed) {
                return;
            }
            this.set('commentUserFullName', user.get('fullName'));
        });
    }),
    gravatarUrl: Ember.computed('comment', function() {
        var imgLink = '';
        this.get('comment.user').then(user => {
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
        editComment(comment) {
            this.sendAction('editComment', comment);
        },
        deleteComment(comment) {
            this.sendActiom('delete', comment);
        }
    }
});
