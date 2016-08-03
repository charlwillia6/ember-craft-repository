// app/pods/components/project-list/component.js
import Ember from 'ember';
import layout from './template';
import PaginatedComponentMixin from 'ember-craft-repository/mixins/paginated-component';

export default Ember.Component.extend(PaginatedComponentMixin, {
    layout,
    currentUser: Ember.inject.service(),
    user: null,
    tagName: 'project-list',
    classNames: ['project', 'list'],
    init() {
        this._super(...arguments);
        if (this.get('session.isAuthenticated')) {
            this._setCurrentUser();
        }
    },
    _setCurrentUser() {
        this.get('currentUser').load().then(user => this.set('user', user));
    },
    onGetCurrentUser: Ember.observer('user', function() {
        this.loadProfileList();
    }),
    loadProfileList: function() {
        var user = this.get('user');
        if(user) {
            this.set('user', user);
        } else {
            user = this.get('store').findRecord('user', 'me');
            this.set('user', user);
        }

        var routeParams = {
            page: this.get('page'),
            page_size: null
        };

        var userParams = {
            filter: {
                contributors: this.get('user.id')
            }
        };
        this.queryForComponent('node', routeParams, userParams);
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