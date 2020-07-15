/** @format */

// const { series, parallel, src, dest, watch } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const chalk = require('chalk');
const cssStats = require('cssstats');
const bytediff = require('gulp-bytediff');
const connect = require('gulp-connect-php');
const crass = require('gulp-crass');
const cssnano = require('gulp-cssnano');
const csscss = require('gulp-csscss');
const csso = require('gulp-csso');
const flatten = require('gulp-flatten');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const sizereport = require('gulp-sizereport');
const stripComments = require('gulp-strip-css-comments');
const stylestats = require('gulp-stylestats');
const sourcemaps = require('gulp-sourcemaps');

const pixrem = require('pixrem')({
	rootValue: 16,
	replace: false,
	atrules: true,
	unitPrecision: 3
});
const pxtorem = require('postcss-pxtorem');
const combineMediaQuery = require('postcss-combine-media-query');

const { watch, task } = require('gulp');
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
		sassBase: './sass/*.scss',
		buildsBuildbase: './builds/build/*.css',
		stylesSassbuildBase: './styles/sass-build/*.css',

		cssBuildBuild: './css/build/build.css',
		map: './'
	},
	dest: {
		buildMap: './',
		publicCss: './public/css',
		cssBase: './css/*.css',
		publicCssMini: './public/css/mini',
		miniMap: './',
		uncompressedCss: './uncompressed-css/',
		compressedCss: './compressed-css/',
		unoptimized: './unoptimized',
		optimized: './optimized',
		uncompressedUnoptimized: './uncompressed-unoptimized',
		uncompressedOptimized: './uncompressed-optimized',
		compressedOptimized: './compressed-optimized',

		stats: './stats/'
	}
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
gulp.task('sassy', function () {
	const processors = [
		pxtorem({
			exclude: /node_modules/i,
			rootValue: 16,
			unitPrecision: 5,
			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
			mediaQuery: true,
			minPixelValue: 0,
			replace: true
		}),
		combineMediaQuery(),
		autoprefixer()
	];

	const cssFilter = filter('**/*.css', { restore: true });

	return gulp
		.src(paths.styles.sassBase)

		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.dest.uncompressedUnoptimized))
		.pipe(cssFilter)
		.pipe(flatten())
		.pipe(stripComments())
		.pipe(postcss(processors))
		.pipe(gulp.dest(paths.dest.publicCss))
		.pipe(gulp.dest(paths.dest.optimized));
});

/**
 * @name stats
 * @description gives a stylesheet info on size, gzip size, and many more key factors.
 * @implements gulp-stylestats
 */
gulp.task('stats', function () {
	return gulp
		.src(paths.dest.cssBase)
		.pipe(
			stylestats({
				type: 'json',
				outfile: true
			})
		)
		.pipe(gulp.dest(paths.dest.stats));
});

/**
 * @name pixeltorem
 * @description puts fallbacks for specific rem cases in px
 * @implements gulp-postcss, gulp-autoprefixer, postcss-pxtorem
 */
gulp.task('pixeltorem', function () {
	const processors = [
		pxtorem({
			exclude: /node_modules/i,
			rootValue: 16,
			unitPrecision: 5,
			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
			mediaQuery: true,
			minPixelValue: 0,
			replace: true
		}),
		autoprefixer()
	];
	const query = [combineMediaQuery()];

	const cssFilter = filter('**/*.css', { restore: true });

	return (
		gulp
			.src(paths.styles.sassBase)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss(processors))
			// .pipe(bytediff.start())
			// .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
			.pipe(sourcemaps.write(paths.styles.map))
			.pipe(flatten())
			.pipe(gulp.dest(paths.dest.unoptimized))
			// .pipe(cssFilter)
			.pipe(stripComments())
			.pipe(postcss(query))
			// .pipe(crass())
			.pipe(gulp.dest(paths.dest.uncompressedOptimized))
			.pipe(gulp.dest(paths.dest.css))
			// .pipe(cssFilter)
			.pipe(rename({ suffix: '.min' }), console.log('rename'))
			// .pipe(stripComments())
			.pipe(csso())
			// .pipe(bytediff.start())
			.pipe(gulp.dest(paths.dest.publicCssMini), console.log('cssmini'))
			.pipe(gulp.dest(paths.dest.compressedOptimized))
		// .pipe(sizereport({ gzip: true, total: true, title: 'SIZE REPORT' }))
	);
});

//   function production() {
//     const processors = [
//       pxtorem({
//         exclude: /node_modules/i,
//         rootValue: 16,
//         unitPrecision: 5,
//         propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
//         mediaQuery: true,
//         minPixelValue: 0,
//         replace: true,
//       }),
//       autoprefixer(),
//     ];
//     const query = [combineMediaQuery()];

//     const cssFilter = filter('**/*.css', { restore: true });

//     return (
//       gulp
//         .src(paths.styles.sassBase)
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(postcss(processors))
//         // .pipe(bytediff.start())
//         // .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
//         .pipe(sourcemaps.write(paths.styles.map))
//         .pipe(flatten())
//         .pipe(gulp.dest(paths.dest.unoptimized))
//         // .pipe(cssFilter)
//         .pipe(stripComments())
//         .pipe(postcss(query))
//         // .pipe(crass())
//         .pipe(gulp.dest(paths.dest.uncompressedOptimized))
//         .pipe(gulp.dest(paths.dest.css))
//         // .pipe(cssFilter)
//         .pipe(rename({ suffix: '.min' }), console.log('rename'))
//         // .pipe(stripComments())
//         .pipe(csso())
//         // .pipe(bytediff.start())
//         .pipe(gulp.dest(paths.dest.cssMini), console.log('cssmini'))
//         .pipe(gulp.dest(paths.dest.compressedOptimized))
//       // .pipe(sizereport({ gzip: true, total: true, title: 'SIZE REPORT' }))
//     );
//   }
// 		pxtorem({
// 			exclude: /node_modules/i,
// 			rootValue: 16,
// 			unitPrecision: 5,
// 			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
// 			mediaQuery: true,
// 			minPixelValue: 0,
// 			replace: true
// 		}),
// 		autoprefixer()
// 	];

// 	return gulp
// 		.src(paths.styles.stylesSassbuildBase)
// 		.pipe(postcss(processors))
// 		.pipe(gulp.dest(paths.dest.css))
// 		.pipe(gulp.dest(paths.dest.uncompressedCss));
// });

/**
 * @name renameMini
 * @description renames final build extension to mini.css
 * @implements gulp-rename
 */
// function renameMini() {
//   return gulp
//     .src(paths.dest.buildsBuildbase)
//     .pipe(
//       rename(function (path) {
//         path.extname = '.mini.css';
//       })
//     )
//     .pipe(gulp.dest(paths.dest.cssMini));
// }

/**
 * @name compact
 * @description minify css styles
 * @implements gulp-sourcemaps, gulp-cssnano
 */
gulp.task('compact', function () {
	return gulp
		.src(paths.styles.buildsBuildbase)
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write(paths.dest.miniMap))
		.pipe(gulp.dest(paths.dest.compressedCss));
});

gulp.task('check', function () {
	return gulp.src(paths.dest.css).pipe(csscss());
});

gulp.task('production', function () {
	const processors = [
		pxtorem({
			exclude: /node_modules/i,
			rootValue: 16,
			unitPrecision: 5,
			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
			mediaQuery: true,
			minPixelValue: 0,
			replace: true
		}),
		autoprefixer()
	];
	const query = [combineMediaQuery()];

	const cssFilter = filter('**/*.css', { restore: true });

	return (
		gulp
			.src(paths.styles.sassBase)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss(processors))
			.pipe(bytediff.start())
			.pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
			.pipe(sourcemaps.write(paths.styles.map))
			.pipe(flatten())
			.pipe(gulp.dest(paths.dest.unoptimized))
			// .pipe(cssFilter)
			.pipe(stripComments())
			.pipe(postcss(query))
			// .pipe(crass())
			.pipe(gulp.dest(paths.dest.uncompressedOptimized))
			.pipe(gulp.dest(paths.dest.publicCss))
			.pipe(cssFilter)
			.pipe(rename({ suffix: '.min' }), console.log('rename'))
			.pipe(stripComments())
			.pipe(csso())
			.pipe(bytediff.start())
			.pipe(gulp.dest(paths.dest.publicCssMini), console.log('cssmini'))
			.pipe(gulp.dest(paths.dest.compressedOptimized))
			.pipe(sizereport({ gzip: true, total: true, title: 'SIZE REPORT' }))
	);
});
// not working properly
// function dev() {
//   const processors = [
//     pxtorem({
//       exclude: /node_modules/i,
//       rootValue: 16,
//       unitPrecision: 5,
//       propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
//       mediaQuery: true,
//       minPixelValue: 0,
//       replace: true,
//     }),
//     autoprefixer(),
//   ];

//   return gulp
//     .src(paths.styles.sassBase)
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss(processors))
//     .pipe(filter('**/*.css'))
//     .pipe(sourcemaps.write(paths.styles.map))
//     .pipe(flatten())
//     .pipe(gulp.dest(paths.dest.unoptimized))
//     .pipe(filter('**/*.css'))
//     .pipe(stripComments())

//     .pipe(gulp.dest(paths.dest.uncompressedOptimized))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(cssnano())
//     .pipe(gulp.dest(paths.dest.optimized))
//     .pipe(gulp.dest(paths.dest.css))

//     .pipe(gulp.dest(paths.dest.cssMini))
//     .pipe(gulp.dest(paths.dest.compressedOptimized));
// }
// doesnt work properly
// function test() {
//   const processors = [
//     autoprefixer(),
//     pxtorem({
//       exclude: /node_modules/i,
//       rootValue: 16,
//       unitPrecision: 5,
//       propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
//       mediaQuery: true,
//       minPixelValue: 0,
//       replace: true,
//     }),
//   ];
//   const query = [combineMediaQuery()];

//   return (
//     gulp
//       .src(paths.styles.sassBase)
//       .pipe(sourcemaps.init())
//       .pipe(sass().on('error', sass.logError))
//       .pipe(postcss(processors))
//       // .pipe(bytediff.start())
//       .pipe(filter('**/*.css'))
//       // .pipe(bytediff.stop((data) => formatByteMessage('autoprefixer', data)))
//       .pipe(sourcemaps.write(paths.styles.map))
//       .pipe(flatten())
//       .pipe(stripComments())
//       // .pipe(crass())
//       .pipe(filter('./**/*.css'))
//       .pipe(postcss(query))
//       .pipe(gulp.dest(paths.dest.css))
//       .pipe(gulp.dest(paths.dest.optimized))
//       .pipe(filter('./**/*.css'))
//       .pipe(stripComments())
//       .pipe(rename({ suffix: '.min' }))
//       .pipe(csso())
//       // .pipe(bytediff.start())
//       .pipe(gulp.dest(paths.dest.cssMini))
//       .pipe(gulp.dest(paths.dest.compressedOptimized))
//     // .pipe(sizereport({ gzip: true, total: true, title: 'SIZE REPORT' }))
//   );
// }
function qa() {
	const processors = [
		pxtorem({
			exclude: /node_modules/i,
			rootValue: 16,
			unitPrecision: 5,
			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
			mediaQuery: true,
			minPixelValue: 0,
			replace: true
		}),
		autoprefixer(),
		combineMediaQuery()
	];

	return gulp
		.src(paths.styles.sassBase)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(filter('**/*.css'))
		.pipe(sourcemaps.write(paths.styles.map))
		.pipe(flatten())
		.pipe(gulp.dest(paths.dest.unoptimized))
		.pipe(stripComments())
		.pipe(gulp.dest(paths.dest.publicCss))
		.pipe(filter('**/*.css'))
		.pipe(stripComments())
		.pipe(rename({ suffix: '.min' }))
		.pipe(cssnano())
		.pipe(gulp.dest(paths.dest.publicCssMini))
		.pipe(gulp.dest(paths.dest.compressedOptimized));
}

gulp.task('connect-sync', function () {
	connect.server({}, function () {
		browserSync({
			proxy: '127.0.0.1:8000'
		});
	});

	gulp.watch('**/*.php').on('change', function () {
		browserSync.reload();
	});
});
