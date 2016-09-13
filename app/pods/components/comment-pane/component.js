// app/pods/components/comment-pane/component.js
import CommentPane from 'ember-osf/components/comment-pane/component';
import layout from './template';

export default CommentPane.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'comment-pane',
    classNames: ['comment', 'pane', 'ui', 'segments']
});
