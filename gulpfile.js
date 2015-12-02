var gulp      = require('gulp'),
    postcss   = require('gulp-postcss'),
    webserver = require('gulp-webserver'),
    rename    = require('gulp-rename');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
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
