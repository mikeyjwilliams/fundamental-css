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
                    "./dist/css/build.css": ["./uncompressed-optimized/*.css"],
                },
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
            dist: {
                src: "./uncompressed-optimized/build.css",
                dest: "./dist/css/mini/build.css",
            },
        },

        watch: {
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
        // browserSync: {
        //     bsFiles: {
        //         src: ["/css/*.css", "/*.html", "/**/*.html"],
        //     },
        //     options: {
        //         server: {
        //             baseDir: "./dist",
        //         },
        //     },
        // },
    });

    grunt.loadNpmTasks("grunt-combine-media-queries");
    grunt.loadNpmTasks("grunt-postcss");
    // grunt.loadNpmTasks("grunt-browser-sync");

    grunt.registerTask("build", ["sass", "stripCssComments", "cmq", "postcss"]);

    grunt.registerTask("serve", ["browserSync", "watch"]);
};
