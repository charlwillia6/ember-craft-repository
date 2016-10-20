// app/pods/components/contrib-add/component.js
import Ember from 'ember';
import _ from 'lodash/lodash';
import layout from './template';
import permissions from 'ember-osf/const/permissions';
import DebugLoggerMixin from 'ember-craft-repository/mixins/debug-logger';
import UtilsMixin from 'ember-craft-repository/mixins/utils-mixin';

export default Ember.Component.extend(DebugLoggerMixin, UtilsMixin, {
    layout,
    toast: Ember.inject.service(),
    store: Ember.inject.service(),
    tagName: '',
    searchText: '',
    users: [],
    READ: permissions.READ,
    WRITE: permissions.WRITE,
    ADMIN: permissions.ADMIN,
    newContributorPermissions: {},
    newContributorIsBibliographic: {},
    newContributorId: null,
    lastQueryTimeMs: 0,
    THROTTLE_SPEED: 1000 * 1,  // seconds,
    isQuerying: false,
    init() {
        this._super(...arguments);
    },
    actions: {
        requestContribAdd(name) { // jshint ignore:line
            $('.ui.modal.contrib.add').modal('setting', 'closable', false).modal('show'); // jshint ignore:line
        },
        addContributor(userId, permission, isBibliographic, sendMail) {
            // TODO: Reset values after you addContributor and refresh
            this.logger.debug('addContributor', userId, permission, isBibliographic, sendMail);
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
        },
        selectUser(user) {
            if(!user.id) {
                return this.logger.error("User not found!");
            }
            this.set('newContributorId', user.id);
        },
        findUser(searchText) {
            let self = this;
            let users = this.get('users');
            let store = this.get('store');

            if((Date.now()-this.lastQueryTimeMs) < this.THROTTLE_SPEED) {
                return;
            }

            this.logger.debug("Querying for unfound user");
            this.set('lastQueryTimeMs', Date.now());
            this.set('isQuerying', true);

            store.query('user', {"filter[full_name]": searchText})
                .then((_users) => {
                    self.set('isQuerying', false);
                    let array_users = users.concat(
                        self.collectionPluckAttributes(
                            _users.content.toArray(),
                            ["_data.fullName", "id"]
                        )
                    );
                    self.set('users', _.uniq(array_users, "id"));
                });
        }
    }
});
