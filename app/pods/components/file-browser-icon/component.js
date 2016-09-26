// app/pods/components/file-browser-icon/component.js
// import FileBrowserIcon from 'ember-osf/components/file-browser-icon/component';
import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
    layout,
    tagName: '',
    iconName: Ember.computed('item', 'item.expanded', function() {
        // TODO: More icons!
        if (this.get('item.isNode')) {
            // TODO node types
            return 'cube';
        }
        if (this.get('item.isProvider')) {
            // TODO provider-specific icons
            return 'disk outline';
        }
        if (this.get('item.isFolder')) {
            return 'folder outline';
        }
        // TODO: More file types
        return 'file outline';
    })
});
