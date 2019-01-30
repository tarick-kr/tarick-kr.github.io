let plumber = require('gulp-plumber'),
	pug = require('gulp-pug'),
	pugInheritance = require('gulp-pug-inheritance'),
	changed = require('gulp-changed'),
	cached = require('gulp-cached'),
	gulpif = require('gulp-if'),
	replace = require('gulp-replace'),
	filter = require('gulp-filter');

module.exports = function () {
	$.gulp.task('pug:dev', () => {
		return $.gulp.src('./dev/pug/*.pug')
			.pipe(changed('dist', {extension: '.html'}))
			.pipe(gulpif(global.isWatching, cached('pug')))
			.pipe(pugInheritance({basedir: './dev/pug/', skip: 'node_modules'}))
			.pipe(filter(function (file) {
				return !/\/_/.test(file.path) && !/^_/.test(file.relative);
			}))
			.pipe(plumber())
			.pipe(pug({
				pretty: true
			}))
			.pipe($.gulp.dest('./build'))
			.on('end', $.browserSync.reload);
	});
	$.gulp.task('pug:build-min', () => {
		return $.gulp.src('./dev/pug/*.pug')
			.pipe(changed('dist', {extension: '.html'}))
			.pipe(gulpif(global.isWatching, cached('pug')))
			.pipe(pugInheritance({basedir: './dev/pug/', skip: 'node_modules'}))
			.pipe(filter(function (file) {
				return !/\/_/.test(file.path) && !/^_/.test(file.relative);
			}))
			.pipe(plumber())
			.pipe(pug({
				pretty: true
			}))
			.pipe(replace('styles.css', 'styles.min.css'))
			.pipe(replace('main.js', 'main.min.js'))
			.pipe($.gulp.dest('./build'))
			.on('end', $.browserSync.reload);
	});
};
