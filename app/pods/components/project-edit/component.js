// app/pods/components/project-edit/component.js
import Ember from 'ember';
import layout from './template';
import NodeActionsMixin from 'ember-osf/mixins/node-actions';

export default Ember.Component.extend(NodeActionsMixin, {
    layout,
    attributeBindings:['elementId:id'],
    elementId: 'project-edit',
    tagName: '',
    classNames: ['project', 'edit'],
    toast: Ember.inject.service(),
    isSaving: false,
    editedTitle: null,
    editedDescription: null,
    isPublic: null,
    editedCategory: null,
    categories: null,
    selectedCategory: null,
    init() {
        this._super(...arguments);
        // console.log(this.get('project.category'));
        this.set('selectedCategory', this.get('project.category'));

        var categories = [
                {
                    "value": "analysis",
                    "description": "Analysis"
                }, {
                    "value": "communication",
                    "description": "Communication"
                }, {
                    "value": "data",
                    description: "Data"
                }, {
                    "value": "hypothesis",
                    "description": "Hypothesis"
                }, {
                    "value": "instrumentation",
                    "description": "Instrumentation"
                }, {
                    "value": "methods and measures",
                    "description": "Methods and Measures"
                }, {
                    "value": "procedure",
                    "description": "Procedure"
                }, {
                    "value": "project",
                    "description": "Project"
                }, {
                    "value": "analysis",
                    "description": "Analysis"
                }, {
                    "value": "software",
                    "description": "Software"
                }, {
                    "value": "other",
                    "description": "Other"
                }
            ];

        this.set('categories', categories);
        // console.log("CATEGORIES: ", this.get('categories'));
        this.set('selectedModel', this.get('project'));

        if (!this.get('_node')) {
            this.set('_node', this.get('selectedModel'));
        }

        // console.log(this.get('selectedModel'));
    },
    actions: {
        openProjectEdit(name) { // jshint ignore:line
            $('.ui.project.edit.modal').modal('show'); // jshint ignore:line
        },
        categoryChange(component, id, value) {
            this.set('editedCategory', component);
        },
        isPublicChange(value) {
            let prevSelection = this.get('project.public');

            // console.log(value);
            // console.log(prevSelection);

            if(value !== prevSelection) {
                this.set('isPublic', value);
            } else {
                this.set('isPublic', null);
            }

        },
        updateNode() {
            // editedTitle, editedDescription, editedCategory, isPublic
            this.set('isSaving', true);

            return this._super(...arguments).then(() => {
                this.set('isSaving', false);
                this.get('toast').success('Project updated successfully');
                this.set('editedTitle', null);
                this.set('editedDescription', null);
                this.set('editedCategory', null);
                this.set('isPublic', null);
            }).catch(() => this.set('isSaving', false));
        },
        cancelProjectEdit() {
            this.selectedModel.rollbackAttributes();
        }
    }
});
