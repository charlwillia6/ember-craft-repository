// app/pods/components/file-browser/component.js
import FileBrowser from 'ember-osf/components/file-browser/component';
import layout from './template';

export default FileBrowser.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'file-browser',
    classNames: ['file', 'browser'],
    actions: {
        openNode() {
            this.sendAction(...arguments);
        },
        openFile() {
            this.sendAction(...arguments);
        }
    }
});
