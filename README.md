# Ember Craft Dashboard

This project is for creating a Ember Dashboard for the DARPA Craft repository on top of [OSF](http://osf.io).

## Prerequisites

You will need the following things properly installed on your computer.
 
- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (with NPM) (Please use Node.js 6.3.0 and higher)
- [Bower](http://bower.io/)
- [Ember CLI](http://ember-cli.com/)
- [PhantomJS](http://phantomjs.org/)
- [ember-osf](http://github.com/crcresearch/ember-osf.git)
- [Nodeenv](https://ekalinin.github.io/nodeenv/)
- Python & pip

#### Third-Party Installation

These instructions are for a Linux environment, specifically Arch Linux:

- Download and install [Node.js](https://nodejs.org/en/download/) and NPM
- Install Nodeenv `sudo pip install nodeenv`
- Create a folder for your project and then `cd` into the directory
- Create a new Node.js environment `nodeenv env-node`
- Activate the new environment `. env/bin/activate`
- Use `npm install -g ember-cli` if you haven't installed ember yet
- Ember recommends you also install PhantomJS with `npm install -g phantomjs`
- Use `npm install -g bower` if you haven't installed bower
- `git clone https://github.com/crcresearch/ember-osf`
- Read instructions on the ember-osf repository for installation and configuration. Note we use fork on CRC github,
it is syncronized monthly with primary OSF repository

## Installation

#### Ember Craft Dashboard Installation

- `git clone https://github.com/crcresearch/ember-craft-repository.git develop`
- `cd` into the new app directory
- `npm install`
- `bower install`
- `ember install ../ember-osf`
- `npm link ../ember-osf`
- Find the `index.js` file in the _extra folder and copy and overwrite the `index.js` file in
`node_modules/semantic-ui-ember/` directory.

When you are done your basic directory structure should be like:

- /home/username/project-folder/ 
  - ember-craft-repository/
  - ember-osf/
  - env-node/

## Configuration

#### OSF Account

Create a OSF account on the appropriate testing server:
- stage.osf.io
- staging2.osf.io
- test.osf.io

Once you create an account, go to your account settings, click on `Developer apps`, and follow the instructions to
create an OSF app.  Save the client ID.  Then click on `Personal access tokens` and create one.  Save the token. We
are currently (9.29.16) using the following Authorization callback URL for the production site http://craftproject.org:

- <http://stockpile.crc.nd.edu/?portal_slug=login>

Open the config/local.yml file, uncomment the stage section and add your token, client ID, and redirect URI. Comment
the other sections if they are not already.

#### local.yml settings

This file is structured like:
```yaml
<backend>:
  CLIENT_ID: null
  PERSONAL_ACCESS_TOKEN: null
  OAUTH_SCOPES: osf.full_read osf.full_write
  REDIRECT_URI: http://localhost:4200/login
```

You will need to fill out options for each backend you want to use (see 'Running' below).
We recommend using the 'stage' backend for development and testing, however the 'test' backend is said to be
the most stable of OSF's environments.  When configuring your application, make sure that your login REDIRECT_URI
is correct.  If it needs a trailing slash, be sure to include a trailing slash!

Edit the new file (installed in the config directory) and set:
- `CLIENT_ID` to the client id of your developer application
- `PERSONAL_ACCESS_TOKEN` to the newly generated token (if applicable, optional for staging development)
- REDIRECT_URI: Must exactly match the redirect URI used to register the OAuth developer application.
Default value is appropriate for local development using `ember server`, with a login page at `/login`

## Running / Development

- `BACKEND=stage ember server`
- Visit your app at <http://localhost:4200>.
- Our production URL is <http://craftproject.org>

#### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

#### Running Tests

- `ember test`
- `ember test --server`

#### Building
You will need to go back to `https://staging.osf.io`, or which ever OSF instance you are using, and create another
Developer app in the account settings.  Save the client ID.  Use the following authorization callback url:

- <http://stockpile.crc.nd.edu/?portal_slug=login>

You can reuse your existing personal access token.

Open the local.yml file in the ember-craft-repository directory and comment out the localhost development settings
that you use on your own machine.  Add another 'stage' configuration, put in your new client ID, your personal access
token and change the `REDIRECT_URI:` to `http://stockpile.crc.ned.edu/?portal_clug=login`. Then build.

- `ember build` (development)
- `ember build --environment production` (production)
- `ember build --environment staging` (OSF staging server) (currently (9.29.16) the build for craftproject.org)

#### Deploying

Once you build your app, the files will be in the `dist` directory in your `ember-craft-repositor` directory.  Copy
all the files and move them to your production server.

## Further Reading / Useful Links

- [ember.js](http://emberjs.com/)
- [ember-cli](http://ember-cli.com/)

#### Development Browser Extensions:

- [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
- [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

ember-osf uses a NPM module called ember-infinity.  Please make sure that in the package.json file, in the ember-osf
addon, that ember-infinity version 0.2.6, or higher is used.  Any version lower than this breaks the Ember inspector
Google Chrome and Firefox extensions.

#### More Documentation
Further documentation can be found under the `documentation` directory in this project.
