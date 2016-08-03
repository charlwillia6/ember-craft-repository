// app/pods/components/project-list/component.js
import Ember from 'ember';
import layout from './template';
import PaginatedComponentMixin from 'ember-osf-dashboard/mixins/paginated-component';

export default Ember.Component.extend(PaginatedComponentMixin, {
    layout,
    tagName: 'project-list',
    classNames: ['project', 'list'],
    loadProfileList: function() {
        var routeParams = {
            page: this.get('page'),
            page_size: null
        };

        var userParams = {
            filter: {
                contributors: this.get('user_id')
            }
        };
        console.log(userParams);
        this.queryForComponent('node', routeParams, userParams);
    },
    init: function() {
        this._super();
        this.loadProfileList();
    },
    actions: {
        next: function() {
            this.incrementProperty('page', 1);
            this.loadProfileList();
        },
        previous: function() {
            this.decrementProperty('page', 1);
            this.loadProfileList();
        },
        goToPage: function(pageNumber) {
            this.set('page', pageNumber);
            this.loadProfileList();
        }
    }
});
