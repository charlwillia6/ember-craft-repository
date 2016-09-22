// app/pods/components/navbar-sidebar/component.js
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    attributeBindings:['elementId:id'],
    elementId: 'navbar-sidebar',
    classNames: ['navbar', 'sidebar'],
    actions: {
        closeMenu: function() {
            $('.sidebar').sidebar("toggle");
        }
    }
});
