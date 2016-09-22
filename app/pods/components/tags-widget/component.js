// app/pods/components/tags-widget/component.js
import TagsWidget from 'ember-osf/components/tags-widget/component';
import layout from './template';

export default TagsWidget.extend({
    layout,
    tagName: '',
    classNames: ['tags', 'widget'],
});
