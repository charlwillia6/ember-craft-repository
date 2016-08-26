// app/helpers/capitalize.js
import Ember from 'ember';

const capitalize = Ember.String.capitalize;

export default Ember.Helper.helper(function([ string ]) {
    return capitalize(string);
});
// const {
//     Helper,
//     String
// } = Ember;
//
// const {
//     capitalize
// } = String;
//
// export default Helper.extend({
//     compute(params) {
//         return capitalize(params[0]);
//     }
// });
