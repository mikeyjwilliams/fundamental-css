/** @format */

// const { series, parallel, src, dest, watch } = require('gulp');
const gulp = require('gulp');
const { watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const cssStats = require('cssstats');
const csscss = require('gulp-csscss');
const rename = require('gulp-rename');
const stylestats = require('gulp-stylestats');
const sourcemaps = require('gulp-sourcemaps');
// const mdcss = require('mdcss');
const pixrem = require('pixrem')({
	rootValue: 16,
	replace: false,
	atrules: true,
	unitPrecision: 3
});
const pxtorem = require('postcss-pxtorem');
const postcss = require('gulp-postcss');
const dartSass = require('gulp-dart-sass'); // will refactor in in another branch feature.
const sass = require('gulp-sass');
const mdcss = require('mdcss');

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
		map: './'
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
		uncompressDest: './uncompressed-css/'
	}
};

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
 * @name mdDoc
 * @description documents comments into a file from special comment syntax in css
 * @implements gulp-postcss, mdcss
 */
function mdDoc() {
	return gulp
		.src(paths.styles.buildCss)
		.pipe(
			postcss([
				require('mdcss')({
					/* options */
				})
			])
		)
		.pipe(gulp.dest('./src/styles/sass-build/'));
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
				outfile: true
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
			replace: true
		})
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

const build = gulp.series(sassy, pixeltorem, compact);
// exports.sassy = sassy;
// exports.docCss = docCss;
exports.build = build;
exports.sassy = sassy;
exports.mdDoc = mdDoc;
exports.renameMini = renameMini;
exports.pixeltorem = pixeltorem;
exports.compact = compact;
exports.default = build;
// stats is not in the series run yourself
exports.stats = stats;
exports.check = check;