
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	scp = require('gulp-scp2'),
	fs = require('fs'),
//	less = require('gulp-less'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	minhtml = require('gulp-htmlmin'),
//	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
	spritesmith = require('gulp.spritesmith');

//gulp.task('testLess', function () {
//	gulp.src('src/less/*.less')
//	.pipe(less())
//	.pipe(gulp.dest('dist/css'));
//});

//gulp.task('reload', function () {
//	browserSync.reload();
//});
//
//gulp.task('server', function () {
//	browserSync.init({
//		server: {
//			baseDir: './src'
//		}
//	});
//	
//	gulp.watch(
//		['**/*.css', '**/*.js', '**/*.html'],
//		['reload', 'scp']
//	)
//});

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(minhtml({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function (argument) {
	gulp.src('src/css/*.css')
		.pipe(concat('merge.css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function (argument) {
	gulp.src('src/js/*.js')
//		.pipe(jshint())
//		.pipe(jshint.reporter('default'))
		.pipe(concat('merge.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('img', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clear', function () {
	gulp.src('dist/*', {read: false})
		.pipe(clean());
});

gulp.task('sprites', function() {
  var spriteData = 
    gulp.src('srcimages/*.*') // source path of the sprite images
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
      }));

  spriteData.img.pipe(gulp.dest('dist/images/')); // output path for the sprite
  spriteData.css.pipe(gulp.dest('dist/styles/')); // output path for the CSS
});

//gulp.task('scp', function () {
//	gulp.src('src/**/*')
//		.pipe(scp({
//			host: '192.168.10.52:8080',
//			username: '_root_',
//			paddowrd: 'sdf8e8fli',
//			dest: '/var/www/fe.jirengu.com',
//			watch: function( client ){
//				client.on('write', function(o){
//					console.log('write is', o.destination);
//				});
//			}
//		}))
//		.on('error', function(err) {
//			console.log(err);
//		})
//});

gulp.task('default', ['html', 'css', 'js', 'img', 'clear', 'sprites']);


