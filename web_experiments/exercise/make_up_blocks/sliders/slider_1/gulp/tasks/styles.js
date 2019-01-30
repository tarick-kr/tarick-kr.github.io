let plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	csscomb = require('gulp-csscomb'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	stylesPATH = {
		"input": "./dev/static/styles/",
		"ouput": "./build/static/css/"
	};

module.exports = function () {
	$.gulp.task('styles:dev', () => {
		return $.gulp.src(stylesPATH.input + 'styles.sass')
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 3 version']
			}))
			.pipe(replace('../../images', 'images'))
			.pipe(replace('../fonts', 'fonts'))
			.pipe(sourcemaps.write())
			.pipe(rename('styles.css'))
			.pipe($.gulp.dest(stylesPATH.ouput))
			.on('end', $.browserSync.reload);
	});
	$.gulp.task('styles:build', () => {
		return $.gulp.src(stylesPATH.input + 'styles.sass')
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 3 version']
			}))
			.pipe(replace('../../images', 'images'))
			.pipe(replace('../fonts', 'fonts'))
			.pipe(csscomb())
			.pipe(rename('styles.css'))
			.pipe($.gulp.dest(stylesPATH.ouput))
	});
	$.gulp.task('styles:build-min', () => {
		return $.gulp.src(stylesPATH.input + 'styles.sass')
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 3 version']
			}))
			.pipe(replace('../../images', 'images'))
			.pipe(replace('../fonts', 'fonts'))
			.pipe(csscomb())
			.pipe(csso())
			.pipe(rename('styles.min.css'))
			.pipe($.gulp.dest(stylesPATH.ouput))
	});
};
