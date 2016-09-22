// app/pods/components/contrib-manager/component.js
import Ember from 'ember';
import layout from './template';
import permissions from 'ember-osf/const/permissions';

export default Ember.Component.extend({
    layout,
    tagName: '',
    classNames: ['contributor', 'manager', 'ui', 'segments'],
    toast: Ember.inject.service(),
    READ: permissions.READ,
    WRITE: permissions.WRITE,
    ADMIN: permissions.ADMIN,
    updatedContributorPermissions: {},
    updatedContributorIsBibliographic: {},
    permissions: null,
    init() {
        this._super(...arguments);

        var permissions = [
            {
                "value"       : this.get('ADMIN'),
                "description" : "Administrator"
            },
            {
                "value"       : this.get('READ'),
                "description" : "Read"
            },
            {
                "value"       : this.get('WRITE'),
                "description" : "Read + Write"
            }
        ];

        this.set('permissions', permissions);
    },
    actions: {
        removeContributor(contrib) {
            this.sendAction('removeContributor', contrib);
        },
        permissionsUpdate(contributor, permission) {
            this.set(`updatedContributorPermissions.${contributor.id}`, permission.toLowerCase());
        },
        isBibliographicUpdate(contributor, isBibliographic) {
            this.set(`updatedContributorIsBibliographic.${contributor.id}`, isBibliographic);
        },
        updateContributors() {
            // TODO:10 Should test PUT or PATCH
            this.sendAction(
                'editContributors',
                this.get('contributors'),
                this.get('updatedContributorPermissions'),
                this.get('updatedContributorIsBibliographic')
            );
        },
        addContributor(userId, permission, isBibliographic, sendMail) {
            console.log('2', userId, permission, isBibliographic, sendMail);
            this.sendAction('addContributor', userId, permission, isBibliographic, sendMail);
        },
    },
});
