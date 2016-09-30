// app/pods/components/project-summary/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'project-summary',
    classNames: ['project', 'summary', 'ui', 'segments'],
    // store: Ember.inject.service(),
    // session: Ember.inject.service(),
    actions: {
        addATag() {
            this.sendAction('addATag', ...arguments);
        },
        removeATag() {
            this.sendAction('removeATag', ...arguments);
        }
    }
});
