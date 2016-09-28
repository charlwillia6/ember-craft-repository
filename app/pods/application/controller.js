// app/pods/application/controller.js
import Ember from 'ember';
import OsfTokenLoginControllerMixin from 'ember-osf/mixins/osf-token-login-controller';
import {getAuthUrl} from 'ember-osf/utils/auth';

export default Ember.Controller.extend(OsfTokenLoginControllerMixin, {
    session: Ember.inject.service(),
    toast: Ember.inject.service(),
    authUrl: getAuthUrl(),
    actions: {
        // TODO: Not being used - Find a way to use it.
        loginFail(/* err */) {
            this.get('toast').error('Login failed');
        }
    }
});
