// app/pods/components/comment-detail/component.js
import CommentDetail from 'ember-osf/components/comment-detail/component';
import layout from './template';

export default CommentDetail.extend({
    layout,
    tagName: ['comment-detail'],
    classNames: ['comment', 'detail']
});
