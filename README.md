# pug-chemicals

The pug-chemicals contains a sample AngularJS application and is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.

It was created by cloning the angular-seed project from [https://github.com/angular/angular-seed](https://github.com/angular/angular-seed)


### Prerequisites

This uses a number of node.js tools to initialize and test pug-chemicals. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone pug-chemicals

Clone the pug-chemicals repository using [git][git]:

```
git clone https://github.com/imajedi4ever/pug-chemicals.git
cd pug-chemicals
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.

* Get the tools it depends upon via `npm`, the [node package manager][npm].
* Get the angular code via `bower`, a [client-side code package manager][bower].

'npm' has been preconfigured to automatically run `bower` so you can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools needed
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
pug-chemicals changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app`.


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  compounds/                --> the compounds view template and logic
    compounds.html            --> the partial template
    compounds.js              --> the controller logic
    compounds_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
```

### Running Unit Tests

The pug-chemicals app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which are run with the [Karma Test Runner][karma]. A Karma
configuration file is provided to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```

## Updating Angular

Now that the angular framework library code and tools are acquired through package managers (npm and bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


[angular]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
