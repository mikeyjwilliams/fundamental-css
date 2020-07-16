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
                },
            },
        },
        stripCssComments: {
            dist: {
                files: {
                    "./uncompressed-optimized/build.css":
                        "./unoptimized/build.css",
                },
            },
        },
        cmq: {
            options: {
                log: false,
            },
            css: {
                files: {
                    "./compressed-optimized": [
                        "./uncompressed-optimized/*.css",
                    ],
                    "./public/css/build.css": [
                        "./uncompressed-optimized/*.css",
                    ],
                },
            },
        },

        postcss: {
            options: {
                // map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: "public/css/mini/maps/", // ...to the specified directory
                },

                processors: [
                    require("pixrem")(), // add fallbacks for rem units
                    require("autoprefixer"), // add vendor prefixes
                    require("cssnano")(), // minify the result
                ],
            },
            dist: {
                src: "./uncompressed-optimized/build.css",
                dest: "./public/css/mini/build.css",
            },
        },
        php: {
            dist: {
                options: {
                    port: 9000,
                    base: "public", // Project root
                },
            },
        },
        browserSync: {
            dist: {
                bsFiles: {
                    src: ["./public/*.php"],
                },
                options: {
                    proxy:
                        "<%= php.dist.options.hostname %>:<%= php.dist.options.port %>",
                    watchTask: true,
                    notify: true,
                    open: true,
                    logLevel: "silent",
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true,
                    },
                },
            },
        },
        watch: {
            src: ["sass", "stripCssComments", "cmq", "postcss", "serve"],
        },
    });

    grunt.loadNpmTasks("grunt-combine-media-queries");
    grunt.loadNpmTasks("grunt-postcss");

    grunt.registerTask("default", [
        "sass",
        "stripCssComments",
        "cmq",
        "postcss",
    ]);

    grunt.registerTask("serve", [
        "php:dist", // Start PHP Server
        "browserSync:dist", // Using the PHP instance as a proxy
        "watch", // Any other watch tasks you want to run
    ]);
};
