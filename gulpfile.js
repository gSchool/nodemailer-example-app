/**
 * Module Dependencies
 */

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var nodemon     = require('gulp-nodemon');
var connect     = require('gulp-connect');
var uglify      = require('gulp-uglify');
var minifyCSS   = require('gulp-minify-css');
var clean       = require('gulp-clean');
var concat      = require('gulp-concat');
var runSequence = require('run-sequence');
var ngmin       = require('gulp-ngmin');


/**
 * Config
 */

var paths = {
  styles: [
    './src/client/public/css/*.css',
  ],
  angularScripts: [
    './src/client/main.js',
    './src/client/**/*.js'
  ],
  scripts: [
    './src/client/*.js',
  ],
  server: [
    './src/server/bin/www'
  ],
  distServer: [
    './dist/server/bin/www'
  ],
  views: [
    './src/views/**/*'
  ]
};

var nodemonConfig = {
  script: paths.server,
  ext: 'css html jade js',
  ignore: ['node_modules']
};

var nodemonDistConfig = {
  script: paths.distServer,
  ext: 'css html jade js',
  ignore: ['node_modules']
};


/**
 * Gulp Tasks
 */

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browser-sync', ['nodemon'], function(done) {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  }, done);
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon(nodemonConfig)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
});

gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true, spare:true};
  gulp.src(paths.styles)
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/client/public/css/'));
});

gulp.task('minify-js', function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('./dist/client/'));
});

gulp.task('minify-angular', function () {
  gulp.src(paths.angularScripts)
      .pipe(ngmin())
      .pipe(uglify())
      .pipe(gulp.dest('./dist/client/'));
});

gulp.task('copy-app', function () {
  gulp.src('./src/app.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-views', function () {
  gulp.src('./src/views/**/*')
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('copy-server-files', function () {
  gulp.src('./src/server/**/*')
    .pipe(gulp.dest('./dist/server/'));
});


gulp.task('connectDist', function (cb) {
  var called = false;
  return nodemon(nodemonDistConfig)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});


// *** default task *** //
gulp.task('default', ['browser-sync', 'watch']);

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'minify-css', 'minify-js', 'minify-angular', 'copy-server-files',
     'copy-app', 'copy-views'],
    ['connectDist']
  );
});
