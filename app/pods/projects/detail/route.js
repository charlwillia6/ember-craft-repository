// app/pods/projects/detail/route.js
import Ember from 'ember';
// TODO:50 refactor permissions strings when https://github.com/CenterForOpenScience/ember-osf/pull/23/files#diff-7fd0bf247bef3c257e0fcfd7e544a338R5 is merged
import permissions from 'ember-osf/const/permissions';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        return this.store.findRecord('node', params.node_id);
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('editedTitle', model.get('title'));
        controller.set('editedCategory', model.get('category'));
        controller.set('editedDescription', model.get('description'));
        controller.set('editedIsPublic', model.get('public'));
    },
    actions: {
        affiliateProject(instId) {
            this.store.findRecord('institution', instId).then(inst => {
                var project = this.modelFor(this.routeName);
                project.get('affiliatedInstitutions').pushObject(inst);
                project.save();
            });
        },
        deaffiliateProject(inst) {
            var project = this.modelFor(this.routeName);
            project.get('affiliatedInstitutions').removeObject(inst);
            project.save();
        },
        addChild(title, description, category) {
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                var child = this.store.createRecord('node', {
                    title: title,
                    category: category || 'project',
                    description: description || null
                });
                project.get('children').pushObject(child);
                project.save();
                project.one('didUpdate', this, function() {
                    this.transitionTo('projects.detail.children');
                });
            } else {
                console.log('You do not have permissions to create this component');
            }
        },
        // TODO: Is this necessary?
        addChildren(title1, title2) {
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                var child1 = this.store.createRecord('node', {
                    title: title1,
                    category: 'project'
                });
                var child2 = this.store.createRecord('node', {
                    title: title2,
                    category: 'project'
                });
                project.get('children').pushObject(child1);
                project.get('children').pushObject(child2);
                project.save();
            } else {
                console.log('You do not have permissions to create this component');
            }
        },
        // destroyProject() {
        //     var project = this.modelFor(this.routeName);
        //     if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
        //         project.one('didDelete', this, function() {
        //             this.transitionTo('projects.index');
        //         });
        //         project.destroyRecord();
        //     } else {
        //         console.log('You do not have permissions to destroy this project');
        //     }
        // },
        addProjectLink(targetProjectId) {
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                var projectLink = this.store.createRecord('node-link', {
                    target: targetProjectId
                });
                project.get('nodeLinks').pushObject(projectLink);
                project.save();
            } else {
                console.log('You do not have permissions to create a project link');
            }
        },
        removeProjectLink(targetProject) {
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                targetProject.destroyRecord();
                console.log('Project link removed.');
            } else {
                console.log('You do not have permissions to delete this project link.');
            }
        },
        addComment(commentText, currentUser) {
            // var addCommentTextarea = $("#add-comment-textarea");
            // var commentText = addCommentTextarea.val();
            console.log('Add Comment Test', commentText);
            var project = this.modelFor(this.routeName);
            console.log(this.routeName);

            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                var comment = this.get('store').createRecord('comment', {
                    content: commentText,
                    page: 'node',
                    type: 'nodes',
                    target: project.id,
                    dateCreated: new Date(),
                    dateModified: new Date(),
                    user: currentUser
                });

                project.get('comments').pushObject(comment);
                project.save(comment);
                console.log('comment', comment);
                console.log('Comment Added.');
            } else {
                console.log('Error!');
            }
        }
    }
});
