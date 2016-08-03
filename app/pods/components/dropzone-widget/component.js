// app/pods/components/dropzone-widget/component.js
import DropzoneWidget from 'ember-osf/components/dropzone-widget/component';
import layout from './template';

export default DropzoneWidget.extend({
    layout,
    tagName: ['dropzone-widget'],
    classNames: ['dropzone', 'widget']
});
