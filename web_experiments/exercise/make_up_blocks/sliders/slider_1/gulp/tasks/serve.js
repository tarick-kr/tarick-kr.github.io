module.exports = function() {
	$.gulp.task('serve', function() {
		$.browserSync.init({
			server: './build',
			notify: false,
			open: false,
			// tunnel: true,
			// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
		});
	});
};