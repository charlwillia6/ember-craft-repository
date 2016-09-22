// app/pods/components/comment-detail/component.js
import CommentDetail from 'ember-osf/components/comment-detail/component';
import layout from './template';

export default CommentDetail.extend({
    layout,
    tagName: '',
    classNames: ['comment', 'detail']
});
