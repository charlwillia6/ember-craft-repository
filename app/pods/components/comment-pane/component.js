// app/pods/components/comment-pane/component.js
import CommentPane from 'ember-osf/components/comment-pane/component';
import layout from './template';

export default CommentPane.extend({
    layout,
    tagName: '',
    classNames: ['comment', 'pane', 'ui', 'segments'],
    actions: {
        addComment(comment) {
            console.log(comment);
            let model = this.get('model');
            var commentsRel = model.get('comments');

            var newComment = this.store.createRecord('comment', {
                content: text,
                targetID: model.get('guid') || model.id,
                targetType: Ember.Inflector.inflector.pluralize(model.constructor.modelName)
            });

            commentsRel.pushObject(newComment);
            console.log(commentsRel);
            return model.save().then(() => newComment);
        }
    }
});
