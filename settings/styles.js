import { src, dest } from "gulp";
import gulpif from "gulp-if";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import { app, src as source, ctx } from "..";

const production = ctx.id === "production";

const pkg = {
    ENV: ctx.id,
    NAME: app.name,
    VERSION: app.version,
    AUTHOR: app.author,
    DATE: app.date,
};

const dev = {
    stylus: {
        define: pkg,
        linenos: false,
    },
    postcss: [
        require("autoprefixer")({
            // uses .browserslistrc
            cascade: true,
        }),
    ],
};

const prd = {
    stylus: {
        define: pkg,
    },
    postcss: [
        require("autoprefixer"),
        require("css-mqpacker")({ sort: true }),
        require("postcss-svgo"),
        require("cssnano"),
    ],
};

const options = production ? prd : dev;

function styles() {
    return src(`${source.styles}`)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(postcss(options.postcss))
        .pipe(gulpif(!production, sourcemaps.write(".")))
        .pipe(dest(ctx.path.styles));
}

export default styles;
