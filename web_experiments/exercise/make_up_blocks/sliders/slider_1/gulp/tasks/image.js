let imagemin = require('gulp-imagemin'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	imageminPngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	imgPATH = {
		"input": ["./dev/static/images/**/*.{png,jpg,gif}",
			'!./dev/static/images/svg/*'],
		"ouput": "./build/static/images/"
	};

module.exports = function () {
	$.gulp.task('img:dev', () => {
		return $.gulp.src(imgPATH.input)
			.pipe($.gulp.dest(imgPATH.ouput));
	});

	$.gulp.task('img:build', () => {
		return $.gulp.src(imgPATH.input)
			.pipe(cache(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.jpegtran({progressive: true}),
				imageminJpegRecompress({
					loops: 5,
					min: 70,
					max: 75,
					quality: 'medium'
				}),
				imagemin.optipng({optimizationLevel: 3}),
				imageminPngquant({quality: '65-70', speed: 5})
			], {
				verbose: true
			})))
			.pipe($.gulp.dest(imgPATH.ouput));
	});
};
