// app/pods/login/controller.js

import ENV from 'ember-craft-repository/config/environment';


import Ember from 'ember';
import OsfTokenLoginControllerMixin from 'ember-osf/mixins/osf-token-login-controller';

export default Ember.Controller.extend(OsfTokenLoginControllerMixin, {
    loginChoices : [
        {
            name: 'Login',
            image: 'login.jpg',
            description: 'Please Login into your account.',
            active : "active"
        },  {
            name: 'Register',
            image: 'register.png',
            description: 'Register as a user for Craft',
            active : ""
        }
    ],
    actions: {
        gotoAction: function (name) {
            if (name === "Login")
                this.send('login');
            else {
                if (ENV.environment === 'development') {
                    window.open('https://staging.osf.io/register/');
                }
            }
        }
    }
    });
