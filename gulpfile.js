const gulp = require('gulp');

const sass = require('gulp-sass');

gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('html:watch', () => {
  return gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', () => {
  return gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['html', 'sass']);

gulp.task('watch', ['html:watch', 'sass:watch'])
