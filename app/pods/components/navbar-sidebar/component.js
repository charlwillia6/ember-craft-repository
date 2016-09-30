// app/pods/components/navbar-sidebar/component.js
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    actions: {
        closeMenu: function() {
            $('.sidebar').sidebar("toggle");
        }
    }
});
