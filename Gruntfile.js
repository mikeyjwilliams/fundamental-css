module.exports = function (grunt) {
    const sass = require("node-sass");

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
            },
            dist: {
                files: {
                    "./unoptimized/build.css": "./sass/build.scss",
                    "./public/css/build.css": "./sass/build.scss",
                },
            },
        },
        stripCssComments: {
            dist: {
                files: {
                    "./public/css/build.css": "./public/css/build.css",
                },
            },
        },
    });

    grunt.registerTask("default", ["sass", "stripCssComments"]);
};