// app/pods/collections/detail/route.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        return this.store.findRecord('collection', params.collection_id);
    },
    actions: {
        /**
       * Add node to a collection
       *
       * @method addNodeToCollection
       * @param {String} projectId, ID of node (linkedNode) to be added to the collection
       * @return {Promise} Returns a promise that resolves to the updated collection
       * with the new linkedNodes relationship
       */
        addProjectToCollection(projectId) {
            this.store.findRecord('node', projectId).then(project => {
                var collection = this.modelFor(this.routeName);
                collection.get('linkedNodes').pushObject(project);
                collection.save();
            });
        },
        /**
        * Remove node from a collection
        *
        * @method removeNodeFromCollection
        * @param {Object} project Node(linkedNode) relationship to be removed from collection
        * @return {Promise} Returns a promise that resolves to the updated collection
        * with the linkedNode relationship removed.  The node itself is not removed.
        */
        removeProjectFromCollection(project) {
            var collection = this.modelFor(this.routeName);
            collection.get('linkedNodes').removeObject(project);
            collection.save();
        },
    }
});
