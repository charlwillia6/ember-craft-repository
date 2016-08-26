// app/pods/components/file-tree/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'file-tree',
    classNames: ['file', 'tree']
});
