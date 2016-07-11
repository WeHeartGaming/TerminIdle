var gulp = require("gulp"),
	del = require("del"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	htmlmin = require("gulp-htmlmin"),
	sass = require("gulp-sass");

gulp.task('sass', function () {
  return gulp.src('./assets/css/*.scss')
    .pipe(sass()).on('error', errorHandler)
    .pipe(gulp.dest('./public/style'));
});

// gulp.task("fonts", function() {
// 	return gulp.src([
// 			"./node_modules/font-awesome/fonts/*",
// 			"./node_modules/roboto-fontface/fonts/*"
// 		])
// 		.pipe(gulp.dest("./public/fonts"));
// });

gulp.task("clean", function(cb) {
	return del(["public"], cb);
});

gulp.task("react", function() {
	// return gulp.src("./assets/react/app.jsx")
	// 	.pipe(browserify({
	// 		'transform': 'babelify',
	// 		'presets': ["es2015", "react"],
	// 		'require': [
	// 			'react',
 //  			'react-dom'
 //  		],
 //  		debug: true
	// 	}))
	// 	.pipe(gulp.dest("./public/js/app.js"));
	var bundler = browserify('assets/react/app.jsx');

  return bundler
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest("./public/js/"));
});

gulp.task('html', function () {
	return gulp.src('./assets/html/*.html')
    .pipe(htmlmin({
    	collapseWhitespace: true,
		  ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /{{[\s\S]*?}}/ ]
    })).on('error', errorHandler)
    .pipe(gulp.dest('./public/'))
});

// Use while developing
gulp.task("default", ["clean"], function(){
	gulp.start(
		"sass",
		"html",
		// "fonts",
		"react"
	);
	gulp.watch('./assets/html/*.html', ['html']);
	gulp.watch('./assets/css/*.scss', ['sass']);
	gulp.watch(['./assets/react/**/*.jsx','./assets/react/**/*.js'], ['react']);
});

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}