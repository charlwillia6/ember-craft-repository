// app/pods/projects/detail/route.js
import Ember from 'ember';
// TODO:50 refactor permissions strings when https://github.com/CenterForOpenScience/ember-osf/pull/23/files#diff-7fd0bf247bef3c257e0fcfd7e544a338R5 is merged
import permissions from 'ember-osf/const/permissions';

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('node', params.node_id);
    },
    setupController(controller, model) {
        controller.set('editedTitle', model.get('title'));
        controller.set('editedCategory', model.get('category'));
        controller.set('editedDescription', model.get('description'));
        controller.set('editedIsPublic', model.get('public'));
        this._super(...arguments);
    },
    actions: {
        editExisting(title, description, category, isPublic) {
            // TODO:10 Should test PUT or PATCH
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                if (title) {
                    project.set('title', title);
                }
                if (category) {
                    project.set('category', category);
                }
                if (description) {
                    project.set('description', description);
                }
                if (isPublic !== null) {
                    project.set('public', isPublic);
                }
                project.save();
            } else {
                console.log('You do not have permissions to edit this project');
            }
        },
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
        addContributor(contribId, permission, bibliographic) {
            var project = this.modelFor(this.routeName);
            if (contribId) {
                if (project.get('currentUserPermissions').indexOf(permissions.ADMIN) !== -1) {
                    var contributor = this.store.createRecord('contributor', {
                        userId: contribId,
                        permission: permission,
                        bibliographic: bibliographic,
                        nodeId: project.id
                    });
                    project.get('contributors').pushObject(contributor);
                    project.save();
                    console.log('Contributor added.');
                } else {
                    console.log('You do not have permissions to add contributors');
                }
            } else {
                console.log('User ID must be specified.');
            }
        },
        updateContributors(editedPermissions, editedBibliographic) {
            var project = this.modelFor(this.routeName);
            var contribMap = this.generateContributorMap(project.get('contributors'));
            let user = this.modelFor('application');

            for (var contrib in editedPermissions) {
                contribMap[contrib].permission = editedPermissions[contrib];
            }

            for (var c in editedBibliographic) {
                contribMap[c].bibliographic = editedBibliographic[c];
            }
            if (project.get('currentUserPermissions').indexOf(permissions.ADMIN) !== -1) {
                this.attemptContributorsUpdate(contribMap, project, editedPermissions, editedBibliographic);
            } else {
                // Non-admins can only attempt to remove themselves as contributors
                if (contrib.id === user.id) {
                    this.attemptContributorsUpdate(contribMap, project, editedPermissions,
                        editedBibliographic);
                } else {
                    console.log('Non-admins cannot update other contributors.');
                }
            }

        },
        deleteContributor(contrib) {
            var project = this.modelFor(this.routeName);
            contrib.setProperties({
                nodeId: project.id
            });
            let user = this.modelFor('application');

            var contribMap = this.generateContributorMap(project.get('contributors'));

            if (project.get('currentUserPermissions').indexOf(permissions.ADMIN) !== -1) {
                this.attemptContributorRemoval(contrib, contribMap);
            } else {
                // Non-admins can only attempt to remove themselves as contributors
                if (contrib.id === user.id) {
                    this.attemptContributorRemoval(contrib, contribMap);
                } else {
                    console.log('Non-admins cannot delete other contributors.');
                }
            }
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
        destroyProject() {
            var project = this.modelFor(this.routeName);
            if (project.get('currentUserPermissions').indexOf(permissions.WRITE) !== -1) {
                project.one('didDelete', this, function() {
                    this.transitionTo('projects.index');
                });
                project.destroyRecord();
            } else {
                console.log('You do not have permissions to destroy this project');
            }
        },
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
        transitionToProjectList() {
            this.transitionTo('projects.index');
        },
        addComment(commentText, currentUser) {
            // var addCommentTextarea = $("#add-comment-textarea");
            // var commentText = addCommentTextarea.val();
            console.log('Add Comment Test', commentText);
            var project = this.modelFor(this.routeName);

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

            // var url = OSF_API_URL + "/v2/nodes/" + node_id + "/comments/";
            // var username = "admin";
            // var password = "admin";
            //
            // var data = {
            //     "image_name": "keyz182/test_container",
            //     "image_tag": "latest",
            //     "scripturl": script_url,
            //     "scriptname": script_name,
            //     "container_args": "python /mnt/" + script_name,
            //     "dataurl": data_url,
            //     "datapath": "/mnt/"
            // };
            //
            // $.ajax(
            // {
            //     data: data,
            //     type: "POST",
            //     url: url,
            //     headers: {"Authorization": "Basic " + btoa(username + ":" + password), "Access-Control-Allow-Origin": "*"},
            //
            //     success: function()
            //     {
            //         alert("Success");
            //     },
            //
            //     error: function(XMLHttpRequest, textStatus, errorThrown)
            //     {
            //         alert(XMLHttpRequest.responseText);
            //     }
            // });
        },
    },
    generateContributorMap(contributors) {
        // Maps all project contributors to format {contribID: {permission: "read|write|admin", bibliographic: "true|false"}}
        var contribMap = contributors.content.currentState.reduce(function(newMap, contrib) {
            newMap[contrib.id] = {
                permission: contrib._data.permission,
                bibliographic: contrib._data.bibliographic
            };
            return newMap;
        }, {});
        return contribMap;
    },
    canModifyContributor(contribRemoving, contribMap) {
        /** Checks to see if contributor(s) can be updated/removed. Contributor can only be updated/removed
        if there is at least one other contributor with admin permissions, and at least one other bibliographic contributor **/
        var bibliographic = false;
        var admin = false;
        for (var contribId in contribMap) {
            if (contribRemoving && contribId === contribRemoving.id) {
                continue;
            } else {
                if (contribMap[contribId].bibliographic) {
                    bibliographic = true;
                }
                if (contribMap[contribId].permission === 'admin') {
                    admin = true;
                }
            }
        }
        if (bibliographic && admin) {
            return true;
        }
        return false;
    },
    attemptContributorsUpdate(contribMap, project, editedPermissions, editedBibliographic) {
        if (this.canModifyContributor(null, contribMap)) {
            var promises = [];
            for (var contrib in editedPermissions) {
                promises.push(this.modifyPermissions(contrib, project, editedPermissions));
            }
            for (var c in editedBibliographic) {
                promises.push(this.modifyBibliographic(c, project, editedBibliographic));
            }
            Ember.RSVP.Promise.all(promises).then(() => project.save());
            console.log('Contributor(s) updated.');
        } else {
            console.log('Cannot update contributor(s)');
        }
    },
    modifyPermissions(contrib, project, editedPermissions) {
        return this.store.findRecord('contributor', contrib).then(function(contributor) {
            contributor.set('projectId', project.id);
            contributor.set('permission', editedPermissions[contrib]);
            contributor.save();
        });
    },
    modifyBibliographic(contrib, project, editedBibliographic) {
        return this.store.findRecord('contributor', contrib).then(function(contributor) {
            contributor.set('projectId', project.id);
            contributor.set('bibliographic', editedBibliographic[contrib]);
            contributor.save();
        });
    },
    attemptContributorRemoval(contrib, contribMap) {
        if (this.canModifyContributor(contrib, contribMap)) {
            contrib.deleteRecord();
            contrib.save();
            console.log('Contributor removed.');
        } else {
            console.log('Cannot remove contributor');
        }
    }
});
