// app/pods/components/project-edit/component.js
import Ember from 'ember';
import layout from './template';
import NodeActionsMixin from 'ember-osf/mixins/node-actions';

export default Ember.Component.extend(NodeActionsMixin, {
    layout,
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
        this.set('selectedModel', this.get('project'));

        if (!this.get('_node')) {
            this.set('_node', this.get('selectedModel'));
        }
    },
    actions: {
        openProjectEdit(name) { // jshint ignore:line
            $('.ui.project.edit.modal').modal('show'); // jshint ignore:line
        },
        categoryChange(component) {
            this.set('editedCategory', component);
        },
        isPublicChange(value) {
            let prevSelection = this.get('project.public');

            if(value !== prevSelection) {
                this.set('isPublic', value);
            } else {
                this.set('isPublic', null);
            }

        },
        updateProject(editedTitle, editedDescription, editedCategory, isPublic) {
            this.set('isSaving', true);

            if(this.get('project.data.currentUserPermissions') === "read,write,admin") {
                this.send('updateNode', editedTitle, editedDescription, editedCategory, isPublic);
                this.get('toast').success('Project updated successfully');
                this.set('editedTitle', null);
                this.set('editedDescription', null);
                this.set('editedCategory', null);
                this.set('isPublic', null);
                this.set('isSaving', false);
            } else {
                this.set('isSaving', false);
                this.selectedModel.rollbackAttributes();
                this.get('toast').error('You do not have permission to edit this project');
                console.log("You do not have permission to edit this project");
            }
        },
        cancelProjectEdit() {
            this.selectedModel.rollbackAttributes();
        }
    }
});
