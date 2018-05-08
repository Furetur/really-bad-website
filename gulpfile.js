const gulp = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('copy-images', () => {
  return gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-images:watch', () => {
  return gulp.watch('./src/img/**/*', ['copy-images']);
});

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
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream()); 
});

gulp.task('sass:watch', () => {
  return gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['html', 'sass', 'copy-images']);

gulp.task('serve', ['default', 'html:watch', 'sass:watch', 'copy-images:watch'], () => {
  browserSync.init({
    server: 'dist/',
  });
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
})
