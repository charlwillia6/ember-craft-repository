// app/helpers/capitalize.js
import Ember from 'ember';

const {
    Helper,
    String
} = Ember;

const {
    capitalize
} = String;

export default Helper.extend({
    compute(params) {
        return capitalize(params[0]);
    }
});
