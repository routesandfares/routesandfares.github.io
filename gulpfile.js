var gulp      = require('gulp'),
    postcss   = require('gulp-postcss'),
    webserver = require('gulp-webserver'),
    rename    = require('gulp-rename');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('compile-css', function() {
  return gulp.src('css/source/main.css')
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-cssnext'),
      require('cssnano')
    ]))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch-css', function() {
  gulp.watch('css/source/*.css', ['compile-css']);
});  
