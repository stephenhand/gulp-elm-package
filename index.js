"use strict";

const _           = require("underscore")
    , log         = require("fancy-log")
    , fs          = require("fs")
    , path        = require("path")
    , spawn       = require("cross-spawn")
    , PluginError = require('plugin-error')
    , c           = require('ansi-colors')
    ;

function elmPackagePath() {
    try{
        let elm_package_dev = path.resolve("node_modules/.bin/elm-package");
        if(fs.statSync(elm_make_dev).isFile()){
            return elm_package_dev;
        }
    }catch (err){
        // local elm-package not available
    }

    return "elm-package";
}

function runElmPackage(parameters, options, cb){
    let packageProc = spawn(elmPackagePath(), parameters, {cwd:options.cwd}), stderrBuffer = new Buffer(0);
    packageProc.stdout.on("data", (data) => {
        if (data.toString().indexOf("[Y/n]")!==-1 && options.noprompt){
            packageProc.stdin.write("y\n");
        }
        log(data);
    });
    packageProc.stderr.on('data', function(data) {
        Buffer.concat([stderrBuffer, new Buffer(data)]);
    });
    packageProc.on("close", returnCode=> {
        if (!!returnCode) {
            const errorText = stderrBuffer.toString();
            log(c.red(errorText));
            cb(new PluginError("elm-package", `elm-package exited with error '${errorText}' return code '${returnCode}'`));
        } else {
            cb();
        }
    });
}


function install({elmPackage, version}, options={}, cb=()=>{}){
    runElmPackage(_.compact(["install", elmPackage, version]), options, cb);
}

function publish(options={}, cb=()=>{}){
    runElmPackage("publish", options, cb);
}

function bump(options={}, cb=()=>{}){
    runElmPackage("bump", options, cb);
}

module.exports = {
    install:install,
    publish:publish,

};