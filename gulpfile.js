const webserver = require('gulp-webserver')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const critical = require('critical')


const basePath = './public/'
gulp.task('build',['babel','auto-prefixer','copy-html','copy-font','minify-images'], ()=> {
})

gulp.task('dev', ()=>{
  return gulp.src(basePath)
  .pipe(webserver({
    livereload: true,
    open: true,
    fallback: 'index.html'
  }))
})

gulp.task('babel', () => {
  return gulp.src(basePath + 'js/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/js/'))
})

gulp.task('build:critical',['build'], () => {
  critical.generate({
    inline: true,
    base: 'build',
    src: 'index.html',
    dest: 'build/index.html',
    minify: true,
    height: 3000,
    width: 2000
  })
})

gulp.task('copy-html',() => {
  return gulp.src(basePath+'*.html')
  .pipe(gulp.dest('./build/'))
})
gulp.task('copy-font',()=>{
  return gulp.src(basePath + 'fonts/**')
  .pipe(gulp.dest('./build/fonts'))
})


gulp.task('minify-images',()=>{
  return gulp.src(basePath+ 'images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/images/'))
})

gulp.task('auto-prefixer', ()=>{
  return gulp.src(basePath+ 'css/*.css')
  .pipe(autoprefixer({
    browsers: ['> 1%', 'IE 10', 'last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./build/css/'));
})
