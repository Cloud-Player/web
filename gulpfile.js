'use strict';

var cache = require('gulp-cached');
var clean = require('gulp-clean');
var gulp = require('gulp');
var gutil = require('gulp-util');
var htmlhint = require("gulp-htmlhint");
var htmlreplace = require('gulp-html-replace');
var inlineTemplates = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');

var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');

var exec = require('child_process').exec;
var Builder = require('systemjs-builder');
var builder = new Builder('.', 'systemjs.config.js');

var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';

// main tasks

gulp.task('default', ['clean'], function () {
  return gulp.start(['build', 'watch', 'serve']);
});

gulp.task('build', ['res:copy', 'html:copy', 'js:build', 'css:build']);

// build tasks

gulp.task('res:copy', ['fonts:copy'], function () {
  return gulp.src([
    './index.html',
    './index.js',
    './systemjs.config.dev.js'
  ]).pipe(gulp.dest('./dist/dev')
    .on('error', gutil.log));
});

gulp.task('html:copy', function () {
  return gulp.src('./app/**/*.html', {base: '.'})
    .pipe(gulp.dest('./dist/dev').on('error', gutil.log));
});

gulp.task('css:build', function () {
  return gulp.src('./app/**/*.scss', {base: '.'})
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/dev').on('error', gutil.log));
});

gulp.task('fonts:copy', function () {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/dev/fonts'))
});

gulp.task('js:build', function () {
  var tsProject = ts.createProject('./tsconfig.json', {
    typescript: typescript
  });

  return gulp.src('./app/**/*.ts', {base: '.'})
    .pipe(tsProject().on('error', gutil.log))
    .pipe(gulp.dest('./dist/dev').on('error', gutil.log));
});

// watch tasks

gulp.task('watch', ['build'], function () {
  gulp.watch('./app/**/*.html', ['html:copy']);
  gulp.watch('./app/**/*.scss', ['css:build']);
  gulp.watch('./app/**/*.ts', ['js:build']);
});

// server task

gulp.task('serve', function () {
  exec('lite-server -c ./bs-config.dev.json', function (err, stdout, stderr) {
    gutil.log(stdout);
    gutil.log(stderr);
  });
});

// lints & hints

gulp.task('src:lint', ['scss:lint', 'ts:lint']);

gulp.task('ts:lint', function () {
  return gulp.src('./app/**/*.ts')
    .pipe(cache('tslint'))
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('scss:lint', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(cache('sasslint'))
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

gulp.task('html:hint', function () {
  return gulp.src("./app/**/*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

// dist & bundle tasks

gulp.task('dist', ['clean'], function (done) {
  return runSequence('build', 'inline:templates', 'bundle', function () {
    done();
  });
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
  return gulp.src('./dist/dev/index.html')
    .pipe(htmlreplace({
      'app': mainBundleName,
      'vendor': vendorBundleName
    })).pipe(gulp.dest('./dist/bundle')
      .on('error', gutil.log));
});

gulp.task('bundle:vendor', function () {
  return builder
    .buildStatic('dist/prod/app/vendor.js', './dist/bundle/' + vendorBundleName, {minify: true})
    .then(function () {
      gutil.log('Vendor bundle created')
    }).catch(function (err) {
      gutil.log('Vendor bundle error', err);
    });
});

gulp.task('bundle:app', function () {
  return builder
    .buildStatic('app', './dist/bundle/' + mainBundleName, {minify: true})
    .then(function () {
      gutil.log('App bundle created')
    }).catch(function (err) {
      gutil.log('App bundle error', err);
    });
});

gulp.task('inline:templates', ['copy:app'], function () {
  var tsProject = ts.createProject('./tsconfig.json', {
    typescript: typescript
  });

  return gulp.src('./dist/.tmp/**/*.ts')
    .pipe(inlineTemplates({base: './dist/.tmp', indent: 0, useRelativePaths: true, removeLineBreaks: true}))
    .pipe(tsProject().on('error', gutil.log))
    .pipe(gulp.dest('./dist/prod'));
});

gulp.task('copy:app', function (done) {
  return runSequence('copy:dev', 'copy:ts', 'copy:css', 'copy:fonts', 'copy:electron', function () {
    done();
  })
});

gulp.task('copy:dev', function () {
  return gulp.src(['./dist/dev/**/*.{css,html}'])
    .pipe(gulp.dest('./dist/.tmp').on('error', gutil.log));
});

gulp.task('copy:ts', function () {
  return gulp.src(['./app/**/*.ts'], {base: '.'})
    .pipe(gulp.dest('./dist/.tmp').on('error', gutil.log));
});

gulp.task('copy:css', function () {
  return gulp.src(['./dist/dev/app/main.css'])
    .pipe(gulp.dest('./dist/bundle/app').on('error', gutil.log));
});

// gulp.task('copy:electron', function () {
//   return gulp.src(['./dist/dev/index.js'])
//     .pipe(gulp.dest('./dist/bundle').on('error', gutil.log));
// });

gulp.task('copy:fonts', function () {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/bundle/fonts'))
});

// clean tasks

gulp.task('clean', function (done) {
  return runSequence('clean:dist', function () {
    done();
  });
});

gulp.task('clean:dist', function () {
  return gulp.src(['./dist'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:src', function () {
  return gulp.src(['./app/**/*.{js,css,map}'], {read: false})
    .pipe(clean({force: true}));
});


// electron tasks
//
// /**
//  * Builds the OSX application and places it in our
//  * 'packages' folder
//  */
// gulp.task('electron:build:osx', function () {
//   gulp.src(['./dist/electron/**/*'])
//     .pipe(electron({
//       version: '1.3.3',
//       platform: 'darwin'
//     }))
//     .pipe(symdest('./dist/packages/osx'));
// });
//
// /**
//  * Builds the Linux application and places it in our
//  * 'packages' folder
//  */
// gulp.task('electron:build:linux', function () {
//   gulp.src(['./dist/dev/**/*'])
//     .pipe(electron({
//       version: '1.3.3',
//       platform: 'linux'
//     }))
//     .pipe(gulp.dest('./dist/packages/linux'));
// });
//
// /**
//  * Builds the Windows executable file and places it in our
//  * 'packages' folder
//  */
// gulp.task('electron:build:win', function () {
//   gulp.src(['./dist/electron/**/*'])
//     .pipe(electron({
//       version: '1.3.3',
//       platform: 'win32'
//     }))
//     .pipe(gulp.dest('./dist/packages/win'));
// });
//
//
// /**
//  * Task for packing our application for OS distribution
//  */
// gulp.task('electron:package', function (done) {
//   return runSequence(
//     ['electron:build:win', 'electron:build:osx', 'electron:build:linux'], done);
// });






var gulp = require('gulp'),
  rename = require('gulp-rename'),
  electron = require('gulp-atom-electron'),
  symdest = require('gulp-symdest');



var config = {
  sourceDir: './',
  buildDir:  './dist/build',
  buildDirBundle:  './dist/bundle',
  packagesDir: 'packages',
  npmDir:    'node_modules'
};

gulp.task('frontend', [
  'frontend:dependencies',
  'frontend:js',
  'frontend:html',
  'frontend:css',
  'copy:electron'
]);

gulp.task('frontend:dependencies', function() {
  return gulp.src([
    config.npmDir + '/traceur/bin/traceur-runtime.js',
    config.npmDir + '/systemjs/dist/system-csp-production.src.js',
    config.npmDir + '/systemjs/dist/system.js',
    config.npmDir + '/reflect-metadata/Reflect.js',
    config.npmDir + '/angular2/bundles/angular2.js',
    config.npmDir + '/angular2//angular2.js',
    config.npmDir + '/angular2/bundles/angular2-polyfills.js',
    config.npmDir + '/rxjs/bundles/Rx.js',
    config.npmDir + '/es6-shim/es6-shim.min.js',
    config.npmDir + '/es6-shim/es6-shim.map'
  ])
    .pipe(gulp.dest(config.buildDir + '/lib'));
});


gulp.task('frontend:js', function() {
  return gulp.src(config.sourceDir + 'dist/dev/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('frontend:html', function () {
  return gulp.src('dist/dev/**/*.html')
    .pipe(gulp.dest(config.buildDir))
});

gulp.task('frontend:css', function () {
  return gulp.src('dist/dev/**/*.css')
    .pipe(gulp.dest(config.buildDir))
});

gulp.task('copy:electron', function() {
  return gulp.src([
    config.sourceDir + '/electron/main.js',
    config.sourceDir + '/electron/package.json'
  ])
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('package:osx', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'darwin'
    }))
    .pipe(symdest(config.packagesDir + '/osx'));
});

gulp.task('package:osxbundle', function() {
  return gulp.src(config.buildDirBundle + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'darwin'
    }))
    .pipe(symdest(config.packagesDir + '/bundle'));
});






// var packageJson = require('./package.json');
//
// gulp.task('electron', function() {
//
//   gulp.src("./dist/bundle")
//     .pipe(electron({
//       src: './dist/bundle',
//       packageJson: packageJson,
//       release: './dist/release',
//       cache: './dist/cache',
//       version: 'v1.4.13',
//       platforms: ['darwin-x64'],
//       platformResources: {
//         darwin: {
//           CFBundleDisplayName: packageJson.name,
//           CFBundleIdentifier: packageJson.name,
//           CFBundleName: packageJson.name,
//           CFBundleVersion: packageJson.version,
//           icon: 'logo.icns'
//         }
//       }
//     }))
//     .pipe(gulp.dest(""));
// });
