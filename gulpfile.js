var gulp = require('gulp');

gulp.task('copy-semantic-dist', function() {
	gulp.src('semantic/dist/semantic.min.css')
	.pipe(gulp.dest('public/libs/semantic.min.css'));
	gulp.src('semantic/dist/semantic.min.js')
	.pipe(gulp.dest('public/libs/semantic.min.js'));
});
var watchSemanticDist = function() {
	gulp.watch('semantic/dist/semantic.min.css', ['copy-semantic-dist'])
	gulp.watch('semantic/dist/semantic.min.js', ['copy-semantic-dist'])
};

gulp.task('build', function() {
	gulp.start('copy-semantic-dist');
});

gulp.task('watch', function() {
	watchSemanticDist();
});