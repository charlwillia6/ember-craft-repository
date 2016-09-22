// app/pods/components/projects-public-cards/component.js
// import Ember from 'ember';
//
// export default Ember.Component.extend({});

import Ember from 'ember';
import layout from './template';
import PaginatedComponentMixin from 'ember-craft-repository/mixins/paginated-component';

export default Ember.Component.extend(PaginatedComponentMixin, {
    layout,
    currentUser: Ember.inject.service(),
    user: null,
    attributeBindings:['elementId:id'],
    elementId: 'projects-public-cards',
    classNames: ['projects', 'public', 'cards'],
    isLoading: true,
    pageSize: null,
    isPublic: false,
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
            page_size: this.get('pageSize')
        };

        var userParams = {
            filter: {
                contributors: this.get('user.id'),
                public: this.get('isPublic')
            }
        };

        console.log('Page: ', this.get('page'));
        this.queryForComponent('node', routeParams, userParams).then(() => {
            this.send('hideLoading');
        });
    },
    actions: {
        next: function() {
            this.send('showLoading');
            this.incrementProperty('page', 1);
            this.loadProfileList();
        },
        previous: function() {
            this.send('showLoading');
            this.decrementProperty('page', 1);
            this.loadProfileList();
        },
        goToPage: function(pageNumber) {
            this.send('showLoading');
            this.set('page', pageNumber);
            this.loadProfileList();
        },
        hideLoading: function() {
            this.set('isLoading', false);
            if(!(this.get('isLoading'))) {
                $('.loading.widget.public').hide();
            }
        },
        showLoading: function() {
            this.set('isLoading', true);
            if(this.get('isLoading')) {
                $('.loading.widget.public').show();
            }
        }
    }
});
