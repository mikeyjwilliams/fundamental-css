/** @format */

// const { series, parallel, src, dest, watch } = require('gulp');
const gulp = require('gulp');

const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const cssStats = require('cssstats');
const bytediff = require('gulp-bytediff');
const cssnano = require('gulp-cssnano');
const filter = require('gulp-filter');
const flatten = require('gulp-flatten');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sizereport = require('gulp-sizereport');
const stripComments = require('gulp-strip-css-comments');
const stylestats = require('gulp-stylestats');
const sourcemaps = require('gulp-sourcemaps');

const pixrem = require('pixrem')({
  rootValue: 16,
  replace: false,
  atrules: true,
  unitPrecision: 3,
});
const pxtorem = require('postcss-pxtorem');

const { watch } = require('gulp');

//** if you use dart-sass there will be breaking changes in a future release I will be converting to this. */
sass.compiler = require('node-sass');

const paths = {
  styles: {
    tBase: './styles/base/tail-base.css',
    tComponent: './styles/base/tail-components.css',
    tUtilities: './styles/base/tailwind-utilities.css',
    baseScss: './styles/base.scss',
    baseCss: './styles/sass-build/base.css',
    buildCss: './styles/final/',
    map: './',
  },
  dest: {
    sassBuild: './styles/sass-build/',
    buildMap: './',
    buildFile: './styles/final/',
    miniBuild: './styles/final/minibuild/',
    miniMap: './',
    finalBuild: './styles/final/*.css',
    exportBuild: './css-build/',
    exportMiniBuild: './compact/',
    exportCss: './styles/uncompressed-css/',
  },
};

/**
 * @name humanFileSize
 * @description reports back a file size of the css data.
 */
function humanFileSize(size) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    '' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

function formatByteMessage(source, data) {
  const prettyStartSize = humanFileSize(data.startSize);
  let message = '';
  console.log('D ', data);
  if (data.startSize !== data.endSize) {
    const change = data.savings > 0 ? 'saved' : 'gained';
    const prettySavings = humanFileSize(Math.abs(data.savings));
    let prettyEndSize = humanFileSize(data.endSize);

    if (data.endSize > data.startSize) {
      prettyEndSize = chalk.yellow(prettyEndSize);
    }
    if (data.endSize < data.startSize) {
      prettyEndSize = chalk.green(prettyEndSize);
    }

    message = chalk`${change} ${prettySavings} (${prettyStartSize} -> {bold ${prettyEndSize}})`;
  } else {
    message = chalk`kept original filesize. ({bold ${prettyStartSize}})`;
  }
  return chalk`{cyan ${source.padStart(12, ' ')}}: {bold ${
    data.fileName
  }} ${message}`;
}

/**
 * @name sassy
 * @description converts sass files to css
 * @implements gulp-sass
 */
function sassy() {
  return gulp
    .src(paths.styles.baseScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(paths.dest.buildMap))
    .pipe(gulp.dest(paths.dest.sassBuild));
}

/**
 * @name stats
 * @description gives a stylesheet info on size, gzip size, and many more key factors.
 * @implements gulp-stylestats
 */
function stats() {
  return gulp
    .src(paths.dest.finalBuild)
    .pipe(
      stylestats({
        type: 'json',
        outfile: true,
      })
    )
    .pipe(gulp.dest('./stats/'));
}

// function check() {
// 	return gulp.src(paths.dest.)
// }

function production() {
  const processors = [
    autoprefixer(),
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
  ];

  return gulp
    .src(paths.styles.baseScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(bytediff.start())
    .pipe(filter('**/*.css'))
    .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
    .pipe(sourcemaps.write(paths.styles.map))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest.buildFile))
    .pipe(filter('**/*.css'))
    .pipe(stripComments())
    .pipe(gulp.dest(paths.dest.exportCss))
    .pipe(bytediff.start())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('./styles/final/minibuild/'))
    .pipe(gulp.dest('./compact'))
    .pipe(sizereport({ gzip: true, total: false, title: 'SIZE REPORT' }));
}

function dev() {
  const processors = [
    autoprefixer(),
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
  ];

  return gulp
    .src(paths.styles.baseScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(filter('**/*.css'))
    .pipe(sourcemaps.write(paths.styles.map))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest.exportCss))
    .pipe(gulp.dest(paths.dest.buildFile))
    .pipe(filter('**/*.css'))
    .pipe(stripComments())

    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dest.miniBuild))
    .pipe(gulp.dest('./compact'));
}

function test() {
  const processors = [
    autoprefixer(),
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
  ];

  return gulp
    .src(paths.styles.baseScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(filter('**/*.css'))
    .pipe(sourcemaps.write(paths.styles.map))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest.exportCss))
    .pipe(gulp.dest(paths.dest.buildFile))
    .pipe(filter('**/*.css'))
    .pipe(stripComments())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dest.miniBuild))
    .pipe(gulp.dest('./compact'));
}

function qa() {
  const processors = [
    autoprefixer(),
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
  ];

  return gulp
    .src(paths.styles.baseScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(filter('**/*.css'))
    .pipe(sourcemaps.write(paths.styles.map))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest.exportCss))
    .pipe(gulp.dest(paths.dest.buildFile))
    .pipe(filter('**/*.css'))
    .pipe(stripComments())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dest.miniBuild))
    .pipe(gulp.dest('./compact'));
}

// if (process.env.NODE_ENV === 'production') {
// 	exports.build = series(sassy);
// } else {
// 	exports.build = series('sassWatch');
// }
const build = function () {
  watch('./src/styles/base.scss', dev);
};
// exports.sassy = sassy;
// exports.docCss = docCss;
exports.build = build;
exports.sassy = sassy;

exports.production = production;
exports.dev = dev;
exports.test = test;
exports.qa = qa;

exports.default = build;
// stats is not in the series run yourself
exports.stats = stats;
//** update */
