// app/mixins/paginated-component.js
import Ember from 'ember';

export default Ember.Mixin.create({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    // TODO: Remove below after testing thoroughly
    // When page numbers are updated, fetch the new results from the server
    // queryParams: {
    //     page: {
    //         refresh: true
    //     },
    //     page_size: {
    //         refresh: true
    //     }
    // },
    // queryParams: ['page', 'page_size'],
    // page: 1,
    // page_size: null,

    // Configure how pagination query params in the frontend map to the query params expected by the API backend
    //  (helps support different APIs). Most users will not need to change this.
    apiArgs: {
        page: 'page',
        page_size: 'page[size]'
    },

    /**
     * @method queryForPage  Fetch a route-specifed page of results from an external API
     * @param modelName The name of the model to query in the store
     * @param routeParams Parameters gictionary available to the model hook; must be passed in manually
     * @param userParams Additional user-specified query parameters
     * @returns {Promise}
     */
    queryForComponent(modelName, routeParams, userParams) {
        let params = Object.assign({}, userParams || {}, routeParams);

        // Rename parameters to match what the API expects, and remove the old param name if necessary
        let apiArgs = this.get('apiArgs');

        for (let frontEndParamName of Object.keys(apiArgs)) {
            let backEndParamName = apiArgs[frontEndParamName];
            if (params[frontEndParamName]) {
                params[backEndParamName] = params[frontEndParamName];
            }
            if (frontEndParamName !== backEndParamName) {
                delete params[frontEndParamName];
            }
        }

        return this.get('store').query(modelName, params).then(list => {
            this.set('list', list);
            this.set('pagination', list.get('meta.pagination'));

            var totalResults = Ember.computed('list', function() {
                return list.get('meta.pagination.total');
            });
            this.set('totalResults', totalResults);

            var totalPages = Ember.computed('list', 'totalResults', function() {
                let results = this.get('totalResults');
                let pageSize = list.get('meta.pagination.per_page');
                return Math.ceil(results / pageSize);
            });
            this.set('totalPages', totalPages);

            if(this.page) {
                this.set('page', this.get('page'));
            } else {
                this.set('page', 1);
            }
        });
    }
});
