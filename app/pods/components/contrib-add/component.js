// app/pods/components/contrib-add/component.js
import Ember from 'ember';
import layout from './template';
import permissions from 'ember-osf/const/permissions';

export default Ember.Component.extend({
    layout,
    tagName: '',
    classNames: ['contrib', 'add'],
    toast: Ember.inject.service(),
    READ: permissions.READ,
    WRITE: permissions.WRITE,
    ADMIN: permissions.ADMIN,
    newContributorPermissions: {},
    newContributorIsBibliographic: {},
    init() {
        this._super(...arguments);
    },
    actions: {
        requestContribAdd(name) { // jshint ignore:line
            $('.ui.modal.contrib.add').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        addContributor(userId, permission, isBibliographic, sendMail) {
            // TODO: Reset values after you addContributor and refresh
            // console.log('1', userId, permission, isBibliographic, sendMail);
            this.sendAction('addContributor', userId, permission, isBibliographic, sendMail);
        },
        cancelContribAdd(name) { // jshint ignore:line
            this.set('newContributorId', '');
            this.set('newContributorPermissions', '');
            this.set('newContributorIsBibliographic', '');
            $('.ui.modal.contrib.add').modal().modal('hide'); // jshint ignore:line
        },
        permissionsChange(component) {
            this.set('newContributorPermissions', component);
        },
        isBibliographicChange(value) {
            this.set('newContributorIsBibliographic', value);
        }
    }
});
