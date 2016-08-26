// app/pods/components/footer-main/component.js
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'footer-main',
    className: ['footer', 'main']
});
