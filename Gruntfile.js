module.exports = function (grunt) {
    const sass = require("node-sass");

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        meta: {
            basePath: './',
            srcPath: './sass/',
            deployPath: './uncompressed-unoptimized/'
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
            },
            dist: {
                files: [
                    { src: "./sass/build.scss", dest: "./uncompressed-unoptimized/build.css" }
                ],
            },
        },
        stripCssComments: {
            dist: {
                files: [
                    {src: "./uncompressed-unoptmized/build.css", dest: "./unoptimized/build.css"}
                ],
            },
        },
        cmq: {
            options: {
                log: false,
            },
            css: {
                files: [
                    { src: "./unoptimized/build.css", dest: "./uncompressed-optimized/build.css" },
                    { src: "./unoptimized/build.css", dest: "./dist/css/build.css" }
                ],
            },
        },

        postcss: {
            options: {
                // map: true, // inline sourcemaps
                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: "dist/css/mini/maps/", // ...to the specified directory
                },
                processors: [
                    require("pixrem"), // add fallbacks for rem units
                    require("autoprefixer"), // add vendor prefixes
                    require("cssnano"), // minify the result
                ],
            },
            dist:
            {
                files: [ { src: "./unoptimized/build.css", dest: "./dist/css/mini/build.css" } ],
            }
        },

        watch: {
            sass: {
                files: ["./sass/**/*.scss"],
                tasks: ["sass", "stripCssComments", "cmq", "postcss"]
            },
            php: {
                files: ["**/*.php", "*.php"],
                task: ["php"],
            },
        },
        php: {
            dev: {
                options: {
                    hostname: "0.0.0.0",
                    open: true,
                },
            },
        },
        php2html: {
            options: {
                processLinks: true,
            },
            files: [
                // Target-specific file lists and/or options go here.
                {
                    expand: true,
                src: ["*.php"],
                    dest: "dist",
                    ext: ".html",
                },
            ],
        },
    });

    grunt.loadNpmTasks("grunt-combine-media-queries");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-php2html");
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks("grunt-browser-sync");

    grunt.registerTask("build", ["sass", "stripCssComments", "cmq", "postcss"]);

    grunt.registerTask("serve", ["php", "watch"]);

    grunt.registerTask('sassWatch', ['sass', 'watch']);
};
