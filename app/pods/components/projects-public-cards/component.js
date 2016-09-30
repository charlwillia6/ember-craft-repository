// app/pods/components/projects-public-cards/component.js
import Ember from 'ember';
import layout from './template';
import PaginatedComponentMixin from 'ember-craft-repository/mixins/paginated-component';

export default Ember.Component.extend(PaginatedComponentMixin, {
    layout,
    classNames: ['projects', 'public', 'cards'],
    isLoading: true,
    pageSize: null,
    isPublic: false,
    didRender() {
        this._super(...arguments);
        this.loadProfileList();
    },
    loadProfileList: function() {
        var user = this.get('user');

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
