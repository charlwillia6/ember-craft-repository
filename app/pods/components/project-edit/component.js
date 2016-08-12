// app/pods/components/project-edit/component.js
import Ember from 'ember';
import layout from './template';
import NodeActionsMixin from 'ember-osf/mixins/node-actions';

export default Ember.Component.extend(NodeActionsMixin, {
    layout,
    tagName: 'project-edit',
    classNames: ['project', 'edit'],
    toast: Ember.inject.service(),
    isSaving: false,
    editedCategory: {},
    categories: {},
    init() {
        var categories = [
            {
                "id": "analysis",
                "text": "Analysis"
            }, {
                "id": "communication",
                "text": "Communication"
            }, {
                "id": "data",
                text: "Data"
            }, {
                "id": "hypothesis",
                "text": "Hypothesis"
            }, {
                "id": "instrumentation",
                "text": "Instrumentation"
            }, {
                "id": "methods and measures",
                "text": "Methods and Measures"
            }, {
                "id": "procedure",
                "text": "Procedure"
            }, {
                "id": "project",
                "text": "Project"
            }, {
                "id": "analysis",
                "text": "Analysis"
            }, {
                "id": "software",
                "text": "Software"
            }, {
                "id": "other",
                "text": "Other"
            }, {
                "id": "uncategorized",
                "text": "Uncategorized"
            }
        ]
        this._super(...arguments);
        this.set('categories', categories);
        this.set('selectedModel', this.get('project'));
    },
    actions: {
        openProjectEdit(name) { // jshint ignore:line
            $('.ui.project.edit.modal').modal('show'); // jshint ignore:line
        },
        privacyChange(component, id, value) {
            this.set('editedCategory', id);
        },
        updateNode(editedTitle, editedDescription,
            editedCategory, isPublic) {
            // updateNode(editedTitle, editedDescription,
            //     editedCategory, isPublic);
            this.set('isSaving', true);
            if (!this.get('node')) {
                this.set('node', this.get('selectedModel'));
            }

            return this._super(...arguments)
                .then(() => {
                    this.set('isSaving', false);
                    this.get('toast').success('Project updated successfully');
                })
                .catch(() => this.set('isSaving', false));
        },
        cancelProjectEdit(name) { // jshint ignore:line
            this.selectedModel.rollbackAttributes();
        }
    }
});
