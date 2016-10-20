import Ember from 'ember';
import RSVP from 'rsvp';
import _ from 'lodash/lodash';

export default Ember.Mixin.create({
    ///////////////////////////////////////////////////////////////
    collectionPluckAttributes: function(collection, attributes) {
        return _.chain(collection)
            .map(function(object) {
                var hash = _.reduce(attributes, function(acc, _attribute) {
                    _.set(acc, _attribute,  _.get(object, _attribute));
                    return acc;
                }, {});
                return hash;
            })
            .value();
    },
    ///////////////////////////////////////////////////////////////
    DeferredPromise: function() {
        let resolve = null;
        let reject = null;

        let promise = new RSVP.Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        return {
            resolve: resolve,
            reject: reject,
            promise: promise
        };
    },
    ///////////////////////////////////////////////////////////////
    DeferNextPromise: function() {
        var args = Array.prototype.slice.call(arguments);

        var error = args[0];
        var deferred = args[1];
        var result = args[2] || true;

        if(!!error) {
            return deferred.reject(error);
        }

        deferred.resolve(result);
    }
});
