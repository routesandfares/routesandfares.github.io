var gulp      = require('gulp'),
    postcss   = require('gulp-postcss'),
    webserver = require('gulp-webserver'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat');

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

gulp.task('compile-js', function() {
  return gulp.src([
    './js/tabby.js',
    './js/prism.js',

    './js/signup.js',
    './js/console-tabs.js',
    './js/happyScroll.js'  /* Put this under console-tabs.js */
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch-css', function() {
  gulp.watch('css/source/*.css', ['compile-css']);
});  
