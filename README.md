# gulp-elm-package

A gulp task to run elm-package.

Useful if you want to

* Install individual packages in a gulp task

* Install elm packages in a different stage of your build to running elm-make

* Bump packages versions as part of your gulp build

## API

Has 3 methods:

### install(packageInfo, options, callback)

packageInfo:

* elmPackage: Name of the individual elm package you want to install and 'version' string properties, specifying neither will use the 'elm-package.json' in the current working directory to determine which packages to install

options:

* cwd: Current working directory to run elm-package executable in

* noprompt: Will automatically answer 'yes' to any yes or no prompts without user interaction

callback:

Gulp callback

### publish(options, callback)

Runs elm-package publish to publish your project as a new elm package

options:

* cwd: Current working directory to run elm-package executable in

* noprompt: Will automatically answer 'yes' to any yes or no prompts without user interaction

callback:

Gulp callback.

### bump(options, callback)

Runs elm-package bump to publish a new version of an existing elm package for your project using the automatic semantic versioning rules

options:

* cwd: Current working directory to run elm-package executable in

* noprompt: Will automatically answer 'yes' to any yes or no prompts without user interaction

callback:

Gulp callback