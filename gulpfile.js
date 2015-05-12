'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var clean       = require('gulp-clean');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var plumber     = require('gulp-plumber');
var bower       = require('gulp-bower');
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default',['script', "scss"], function() {
});

gulp.task('script',['script-clean', 'libs'], function() {
	browserify("./js/main.js", {
			debug : true,
		})
		.bundle()
		.pipe(plumber())
		.pipe(source("main.js"))
		.pipe(buffer())
		.pipe(gulp.dest('./build'))
		.pipe(reload({ stream : true }));
});

gulp.task('script-clean', function() {
    gulp.src("./build/*", {read:false}).pipe(clean());
});

gulp.task('scss-clean', function() {
    gulp.src("./css/*", {read:false})
		.pipe(clean());
});

gulp.task('scss',['scss-clean'], function() {
    gulp.src("./scss/*.css")
		.pipe(gulp.dest("./css"))
		.pipe(reload({ stream:true }));

	gulp.src("./scss/*.scss")
		.pipe(plumber())
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}))
		.pipe(gulp.dest('./css'))
		.pipe(reload({ stream:true }));
});

gulp.task('html', function() {
    reload();
});

gulp.task('libs', function() {
    return bower().pipe(gulp.dest('build/lib/'));
});

gulp.task('sync',['script', "scss"], function() {
    browserSync.init({
		server: "./"
	});

	gulp.watch("./*.html", ["html"])
	gulp.watch("./scss/*.scss", ["scss"]);
	gulp.watch("./js/**/*.js", ["script"]);
});