// app/pods/components/oauth-popup/component.js
import OauthPopup from 'ember-osf/components/oauth-popup/component';
import layout from './template';

export default OauthPopup.extend({
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'oauth-popup',
    classNames: ['oauth']
});
