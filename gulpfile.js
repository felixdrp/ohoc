var gulp = require('gulp');
// var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var babel = require('gulp-babel');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('deploycss', function () {
   gulp.src('src/**/*.css')
//      .pipe(minifyCSS())
 //     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
       // .pipe(concat('style.min.css'))
       .pipe(gulp.dest('build'));
   });

gulp.task('deploy', function () {
    gulp.src(['src/**/*.js','src/**/*.jsx'])
        .pipe(babel(
          {
            presets: [
              'react',
              'es2015',
              'stage-0'
            ],
            plugins: [
              // http://babeljs.io/docs/plugins/transform-object-rest-spread/
              "transform-object-rest-spread",

              // export from ES6 to use ./src/components/core/index.js
              "transform-export-extensions",

              // async function foo() { await bar(); }
              "transform-async-to-generator",
              "transform-regenerator",
              "transform-runtime",
              "transform-decorators-legacy"
            ],
            ignore: [
                // "src/components/core/upload/upload-shared-web-worker.js"
            ]
          }
        ))
        .pipe(strip())
        //.pipe(uglify())
        .pipe(gulp.dest('./build/'));
});
