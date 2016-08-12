// app/pods/components/project-summary/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: 'project-summary',
    classNames: ['project', 'summary'],
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    init() {
        this._super(...arguments);
        console.log('MODEL: ', this.model.get('category'));
    },
    actions: {
        addATag() {
            this.sendAction('addATag', ...arguments);
        },
        removeATag() {
            this.sendAction('removeATag', ...arguments);
        }
    }
});
