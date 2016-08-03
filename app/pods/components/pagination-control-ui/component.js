// app/pods/components/pagination-control/component.js
import PaginationControl from 'ember-osf/components/pagination-control/component';
import layout from './template';

export default PaginationControl.extend({
    // TODO:0 ember-issue:11678 Cannot use input helper with onchange attribute issue:2
    layout,
    tagName: ['pagination'],
    classNames: ['pagination']
});
