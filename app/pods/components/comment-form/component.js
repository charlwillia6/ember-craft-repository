// app/pods/components/comment-form/component.js
import CommentForm from 'ember-osf/components/comment-form/component';
import layout from './template';

export default CommentForm.extend({
    layout,
    tagName: ['comment-form'],
    classNames: ['comment', 'form']
});
