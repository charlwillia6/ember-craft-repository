# Documentation

This document is intended for explaining the ember-craft-repository project and introduce the project structure, completed elements, and what still needs to be fixed.

## Table of Contents

  - [Resources](#resources)
    - [Links](#resources-links)
      - [Ember Information](#ember-information)
    - [Add-Ons Specific to Our Project](#addons-specific)   
    - [Other Resource Information](#other-resource)
  - [ember-osf Add-On](#ember-osf)
  - [Structure](#structure)
    - [Components](#structure-components)
    - [Mixins](#structure-mixins)
  - [Project Specific Details](#project-specifics)
    - [Components](#project-specifics-components)

## Resources <a id="resources"></a>

#### Links <a id="resources-links"></a>

  - <https://github.com/crcresearch/ember-craft-repository>
  - <https://github.com/crcresearch/ember-osf>
  - <https://github.com/centerforopenscience/ember-osf>
  - Authorization URL: <http://stockpile.crc.nd.edu/?portal_slug=login>
  - Production URL: <http://craftproject.org>
  - Slack: <https://craftrepository.slack.com>
  - OSF: <https://osf.io>
  - OSF API: <https://api.osf.io/v2/>
  - OSF Staging: <https://staging.osf.io>
  - OSF Staging API: <https://staging-api.osf.io/v2/>
  - Ember-cli User Guide: <https://ember-cli.com/user-guide/>
  - Ember.js Guides and Tutorials: <https://guides.emberjs.com/v2.8.0/>
  - Ember.js API: <http://emberjs.com/api/>
  - Semantic-UI Documentation: <http://semantic-ui.com/>
  - semantic-ui-ember Documentation: <http://semantic-org.github.io/Semantic-UI-Ember/#/modules>
  - ember-simple-auth: <https://ember-simple-auth.com/>

##### Ember Information <a id="ember-information"></a>

  - Getting Started: <https://emberigniter.com/new-to-ember-cli-start-here-2016-tutorial/>
  - <a id="pods"></a>Pods: <http://cball.me/organize-your-ember-app-with-pods/> or <http://www.programwitherik.com/ember-pods/>
  - Find Ember.js addons: <https://www.emberaddons.com/>
  - Find more Ember/js addons: <https://www.npmjs.com/>
  - Great Ember.js tutorial: <http://yoember.com/>

#### Add-Ons Specific to Our Project <a id="addons-specific"></a>

  - semantic-ui-ember Github: <https://github.com/Semantic-Org/Semantic-UI-Ember>
  - semantic-ui-less: <https://github.com/Semantic-Org/Semantic-UI-Less>
  - ember-toastr: <https://www.npmjs.com/package/ember-toastr>
  - jquery.tagsinput: <http://xoxco.com/projects/code/tagsinput/>
  - ember-responsive: <https://freshbooks.github.io/ember-responsive/>
  - ember-moment: <https://github.com/stefanpenner/ember-moment>
  - ember-page-title: <https://github.com/tim-evans/ember-page-title>
  - ember-truth-helpers: <https://github.com/jmurphyau/ember-truth-helpers>
  - ember-collection: <https://github.com/emberjs/ember-collection>
  - dropzone.js: <https://github.com/enyo/dropzone> or <http://www.dropzonejs.com/>

Some of these addons are not implemented yet but in package.json:

  - ember-collection: Planned to be used for file-browser component
  - dropzone.js: Planned to be used for drag and drop file upload options
  - ember-responsive: Planned to be used where Semantic-UI fails for responsiveness

#### Other Resource Information <a id="other-resource"></a>
In the `_extra` directory of this project there is a index.js file that has been altered for using semantic-ui-ember so
that font and icons file paths are found.  Replace the index.js file in the following path:

`ember-craft-repository\node_modules\semantic-ui-ember\index.js`

Screenshots and builds created for the production server are kept in the `_extra` directory.

## ember-osf Add-On <a id="ember-osf"></a>

The ember-osf add-on is a ongoing project being developed by the OSF developers.  It is intended to be an Ember.js
front-end for OSF.  Most of pieces that we use in their project are in the forms of "mixins" and "components" in the
`addon` directory.  Their project handles all the authorizations for permissions and logging in at this time using
[ember-simple-auth](https://ember-simple-auth.com/).  Their development front-end can be found in their project under
`/tests/dummy`.  Most of our code is copied and altered from their code in the dummy app. You also have to import their mixins and set them in our route and controllers.

At this time we have forked the [ember-osf](https://github.com/crcresearch/ember-osf) project in order to handle our
own updates for the addon.  About every 30 days we compare the changes between their github branch and our own, and
update our fork.  This sometimes breaks features in our own ember-craft-repository app.  I use [Meld](http://meldmerge.org/) to look for differences in their dummy app to compare to the files in our `app`
directory.  Since we use a "pod" structure, this can be tedious and take a large amount of time.  However, OSF adds
features and fixes all the time to the ember-osf addon that are crucial to our development.

I would recommend starring the project in Github so you can receive notifications in regards to their development. The
point of contact for the ember-osf project is [Sam Chrisinger](mailto:sam@cos.io) ([alternative email](mailto:s.chisinger@gmail.com)).  

## Structure <a id="structure"></a>

We are using a pod structure ([see links under resources](#pods)):

  - app/
    - helpers/
    - locales/
    - mirage/
    - mixins/
    - pods/
      - allnodes/
      - application/
        - | controller.js
        - | route.js
        - | template.hbs
      - collections/
        - detail/
        - index/
        - loading/
        - | route.js
        - | template.hbs
      - components/
        - comment-detail/
        - comment-form/
        - comment-pane/
        - contrib-add/
          - | component.js
          - | template.hbs
          - | style.less
        - ...
    - ...
    - styles/
      - site/
      - themes/
      - | app.less
      - | themes.less
    - | app.js
    - | breakpoints.js
    - | index.html
    - | resolver.js
    - | router.js

vs. the normal Ember.js structure:

  - app/
    - components/
      - comment-detail/
      - comment-form/
      - comment-pane/
      - contrib-add/
        - | component.js
        - | style.less
        - | template.hbs
    - controllers/
      - collections/
      - projects/
      - users/
      - | application.js
    - ...
    - helpers/
    - locales/
    - mirage/
    - models/
    - mixins/
    - routes/
      - collections/
        - | detail.js
      - projects/
        - detail/
          - draft-registrations/
          - files/
          - | children.js
          - | files.js
          - | index.js
          - | registrations.js
        - | detail.js
      - registrations/
      - users/
      - | allnodes.js
      - | application.js
      - | collections.js
    - ...
    - styles/
    - templates/
      - collections/
      - components/
      - institutions/
      - projects/
        - detail/
        - | detail.hbs
        - | index.hbs
      - registrations/
      - users/
      - | allnodes.hbs
      - | application.hbs
      - | collections.hbs
    - ...
    - | app.js
  - ...

As you can see, the normal Ember.js structure breaks files down into controllers, routes, models, templates, etc.,
and then the files are named in regards to the route names.  If you look at the component directory though, it still
conforms to the "pods" like layout.  

The "pods" structure allows all files (routes, controllers, models, templates, styles, etc.) to be in each "route"
directory.  This allows a developer access to all files needed to code for a specific route from one directory.

#### Components <a id="structure-components"></a>

Components are entities or their own.  When you use a component in a template you have to pass information to them.  
You can inject the store, the session, and other services into the component, but you have to pass the model,
controller, or variables to the component to be able to use that data in the component template.

In order to use their components we have to create our own component in our `component` directory and extend theirs,
which means we must import theirs into our own.  All components are still in a directory under `pods/`.  If you notice,
all component directories are named with a hyphen.  This is required by Ember.js to know that these are components and
to allow helpers of the same name within templates.

Most components that have been extended or created for our project were developed with the idea that the would be
able to be used in any route.  However, components are meant to get their data from the route that they are being
used in.  Some components have added functions and calls within their `init()` functions to work without needing
model data passed in by the route.  This causes some data to be accessed multiple times every time a route is accessed.
In order to make the components more efficient and faster loading, some may need to be revisited so that model data is
passed to the components.  The layout for the ember-craft-repository will not often require the same component to be
added to multiple routes.  Even if they are, we can simply create a model within the route to get the necessary data.

Components are termed "widgets" in regards to our project.  Most routes will have several "widgets" in each route.  
This will minimize the template structure for each route and allow us to keep a more defined template for each
widget that we create.  We can then add the widgets to any segment or column in the route templates.

For components that are buttons, always add `tagName: '',` to the component.  When you use the `tagName:` property,
you cannot use the `classNames: ['']` property.  It is a good idea to use the `classNames: ['']` property on all other
components.  When you are using components within components, then the child components should have the `tagName:`
property.

#### Mixins <a id="structure-mixins"></a>

There is only one mixin created so far for this project (PaginatedComponentMixin).  It extends the functionality of
certain Ember.Objects, particularly useful for adding functions to controllers, routes, and components. For naming
conventions, it is ideal to use hyphens in the name and use "name-route-mixin", "name-controlller-mixin", etc., in
way that represents what the mixin is to be imported into.  

<http://www.cerebris.com/blog/2012/03/06/understanding-ember-object/>

<https://dockyard.com/blog/2015/11/09/best-practices-extend-or-mixin>

<http://blog.bigbinary.com/2012/08/27/emberjs-mixin.html>

Structure should be extended to include helpers, services, initializers, and other Ember.js elements that effect
this project (9/29/2016).

## Project Specific Details <a id="project-specifics"></a>

#### Components <a id="project-specifics-componenta"></a>

We already have several components created for our project.  Some are extended (there is an ember-osf version we are
importing from), and some are non-extended (specific to the ember-craft-repository project)

The following components are ***working*** in our ember-craft-repository project:

**Extended:**
  - comment-detail (does not show comment replies as a tree style, reply button is commented out)
  - comment-form (does not update gravatar and userFullName when a comment is added)
  - comment-pane
  - file-browser (would be ideal to not be a widget and just be for `/projects/detail/files` route)
  - file-browser-icon (Needs more icons added for different providers, folders, and file types)
  - file-browser-item (Download function added for temporary use.  Need to rework selecting a file)
  - file-chooser (Needs beautification)
  - pagination-control-ui (ember-osf version is just called pagination-control)
  - tags-widget

**Non-extended:**
  - contrib-manager (Needs to have more functions and features added, specifically to do with current user permissions)
  - contrib-add
  - footer-main
  - loading-widget (for `projects-cards`, `projects-public-cards`, and `projects-list` specifically)
  - log-detail (Needs redone to look more like OSF)
  - login-register-selector (Needs a register button that switches to login when transition occurs)
  - navbar-main
  - navbar-sidebar
  - project-create
  - project-delete (Needs error handling and reliable notification)
  - project-edit (Needs error handling and reliable notification)
  - project-summary (Needs better styling)
  - projects-cards
  - projects-list
  - projects-public-cards (same as projects-cards, but has some minor differences in the template)

The following components are **not working** in our ember-craft-repository project:

**Extended:**
  - dropzone-widget (for drag and drop file upload)
  - file-actions (all parts are there, needs to work with `/projects/detail/files/provider/file` route)
  - file-tree (More of an ideal widget for the `/projects/detail` route, vs file-browser)
  - file-widget (contains dropzone-widget and uses `ember-power-select` with relies on Bootstrap.  Need to Replace
    power-select with a Semantic-UI dropdown - for uploading files to a specific project)
  - oauth-popup (not sure what this is for)

**Non-extended**
  - execution-dashboard (a project by [Ian](mailto:ian.j.taylor@gmail.com) from NDS)
  - projects-search (non-functional search at the moment)

All widgets (components) need to be reworked to improve stability and performance.  

Will continue documentation after 10/3/2016
