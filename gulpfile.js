const gulp = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const gm = require('gulp-gm');


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

gulp.task('default', ['html', 'sass']);

gulp.task('serve', ['default', 'html:watch', 'sass:watch'], () => {
  browserSync.init({
    server: 'dist/',
  });
  gulp.watch('src/**/*').on('change', browserSync.reload);
});

// images -----------------------------
const es = require('event-stream');

const IMG_SRC_PATH = './src/img';
const IMG_DEST_PATH = './dist/img/';


function resizeImages(folder, width) {
  return gulp.src(`${IMG_SRC_PATH}/${folder}/${width}px/*`)
    .pipe(gm(gmfile => gmfile.resize(width)))
    .pipe(gulp.dest(IMG_DEST_PATH));
}


function copyImages(folder) {
  return gulp.src(`${IMG_SRC_PATH}/${folder}/*`)
    .pipe(gulp.dest(IMG_DEST_PATH));
}


gulp.task('images', () => {
  return es.merge([
    resizeImages('blocks', 48),
    resizeImages('blocks', 150),
    resizeImages('structures', 96),
    resizeImages('structures', 960),
    resizeImages('structures', 1920),
    copyImages('env'),
    copyImages('misc'),
  ]);
});
