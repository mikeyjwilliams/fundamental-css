/** @format */

// const { series, parallel, src, dest, watch } = require('gulp');
const gulp = require('gulp');
const { watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const cssStats = require('cssstats');
const bytediff = require('gulp-bytediff');
const cssnano = require('gulp-cssnano');
const cssStats = require('cssstats');
const csscss = require('gulp-csscss');
const rename = require('gulp-rename');
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
const postcss = require('gulp-postcss');
const dartSass = require('gulp-dart-sass'); // will refactor in in another branch feature.
const sass = require('gulp-sass');

//** if you use dart-sass there will be breaking changes in a future release I will be converting to this. */
sass.compiler = require('node-sass');

const paths = {
  styles: {
    tBase: './builds/base/tail-base.css',
    tComponent: './builds/base/tail-components.css',
    tUtilities: './builds/base/tailwind-utilities.css',
    baseScss: './sass/*.scss',
    baseCss: './styles/sass-build/*.css',
    buildCss: './builds/build/*.css',
    renameCss: './builds/build/build.css',
    map: './',
  },
  dest: {
    sassDest: './builds/sass-build/',
    buildMap: './',
    buildDest: './builds/build/',
    miniDest: './public/mini/',
    miniMap: './',
    buildSrc: './public/build/*.css',
    exportBuild: './css-build/',
    compressDest: './compressed-css/',
    uncompressDest: './uncompressed-css/',
    optimized: './optimized/',
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
    .pipe(gulp.dest(paths.dest.sassDest));
}

/**
 * @name stats
 * @description gives a stylesheet info on size, gzip size, and many more key factors.
 * @implements gulp-stylestats
 */
function stats() {
  return gulp
    .src(paths.dest.buildSrc)
    .pipe(
      stylestats({
        type: 'json',
        outfile: true,
      })
    )
    .pipe(gulp.dest('./stats/'));
}

/**
 * @name pixeltorem
 * @description puts fallbacks for specific rem cases in px
 * @implements gulp-postcss, gulp-autoprefixer, postcss-pxtorem
 */
function pixeltorem() {
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
    .src(paths.styles.baseCss)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.dest.buildDest))
    .pipe(gulp.dest(paths.dest.uncompressDest));
}

/**
 * @name renameMini
 * @description renames final build extension to mini.css
 * @implements gulp-rename
 */
function renameMini() {
  return gulp
    .src(paths.dest.buildCss)
    .pipe(
      rename(function (path) {
        path.extname = '.mini.css';
      })
    )
    .pipe(gulp.dest(paths.dest.exportbuildDest));
}

/**
 * @name compact
 * @description minify css styles
 * @implements gulp-sourcemaps, gulp-cssnano
 */
function compact() {
  return gulp
    .src(paths.styles.buildCss)
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write(paths.dest.miniMap))
    .pipe(gulp.dest(paths.dest.compressDest))
    .pipe(gulp.dest(paths.dest.uncompressDest));
}
function check() {
  return gulp.src(paths.dest.buildDest + '/').pipe(csscss());
}

function production() {
  const processors = [
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
    autoprefixer(),
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
    .pipe(gulp.dest(paths.dest.buildDest)) // /public/build
    .pipe(filter('**/*.css'))
    .pipe(stripComments())
    .pipe(crass())
    .pipe(gulp.dest(paths.dest.optimized))
    .pipe(gulp.dest(paths.dest.exportCss))
    .pipe(bytediff.start())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dest.miniBuild))
    .pipe(gulp.dest(paths.dest.compact))
    .pipe(sizereport({ gzip: true, total: false, title: 'SIZE REPORT' }));
}

function dev() {
  const processors = [
    pxtorem({
      exclude: /node_modules/i,
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      mediaQuery: true,
      minPixelValue: 0,
      replace: true,
    }),
    autoprefixer(),
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
    .pipe(filter('**/*.css'))
    .pipe(stripComments())
    .pipe(crass())
    .pipe(gulp.dest(paths.dest.optimized))
    .pipe(gulp.dest(paths.dest.buildFile))

    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dest.miniBuild))
    .pipe(gulp.dest(paths.dest.compact));
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

  return (
    gulp
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
      .pipe(crass())
      .pipe(gulp.dest(paths.dest.optimized))
      // .pipe(gulp.dest(paths.dest.exportCss)
      .pipe(bytediff.start())
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano())
      .pipe(gulp.dest(paths.dest.miniBuild))
      .pipe(gulp.dest(paths.dest.compact))
      .pipe(sizereport({ gzip: true, total: false, title: 'SIZE REPORT' }))
  );
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
    .pipe(gulp.dest(paths.dest.compact));
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
exports.check = check;
