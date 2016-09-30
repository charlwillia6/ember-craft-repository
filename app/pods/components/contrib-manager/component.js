// app/pods/components/contrib-manager/component.js
import Ember from 'ember';
import layout from './template';
import permissions from 'ember-osf/const/permissions';

export default Ember.Component.extend({
    layout,
    classNames: ['contributor', 'manager'],
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
            // TODO:10 Should test PUT or PATCH and errors for not being admin
            this.sendAction(
                'editContributors',
                this.get('contributors'),
                this.get('updatedContributorPermissions'),
                this.get('updatedContributorIsBibliographic')
            );
            // TODO: Called even it it isn't updated successfully.  No error check.
            this.get('toast').success('Contributor updated successfully!');
        },
        addContributor(userId, permission, isBibliographic, sendMail) {
            this.sendAction('addContributor', userId, permission, isBibliographic, sendMail);
            // TODO: Called even it it isn't updated successfully.  No error check.
            this.get('toast').success('Contributor added successfully!');
        },
    },
});
