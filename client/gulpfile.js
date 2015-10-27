var gulp = require("gulp"),
	jade = require("gulp-jade"),
	babel = require("gulp-babel"),
	less = require("gulp-less"),
	sourcemaps = require("gulp-sourcemaps"),
	uglify = require("gulp-uglify"),
	minifyHtml = require("gulp-minify-html"),
	wrapAmd = require("gulp-wrap-amd"),
	minifyCss = require("gulp-minify-css"),
	concat = require("gulp-concat"),
	autoprefixer = require("gulp-autoprefixer"),
	filter = require("gulp-filter");

var settings = require("./package.json").settings;

function jsOnlyFilter() {
	return filter(["**/*.js"]);
}

gulp.task("jade", function() {
	return gulp.src("src/*.jade")
		.pipe(sourcemaps.init())
		.pipe(jade({
			pretty: true,
			locals: settings
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest("build/dev"))
		.pipe(filter(["**/*.html"]))
		.pipe(minifyHtml())
		.pipe(gulp.dest("build/dist"));
});

gulp.task("jade-client", function() {
	return gulp.src("src/templates/**/*.jade", { base: "src" })
		.pipe(sourcemaps.init())
		.pipe(jade({
			client: true,
			pretty: true
		}))
		.pipe(wrapAmd({
			deps: ['jade'],
			params: ['jade'],
			moduleRoot: 'src/'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest("build/dev"))
		.pipe(jsOnlyFilter())
		.pipe(uglify())
		.pipe(gulp.dest("build/dist"));
});

gulp.task("js", function() {
	return gulp.src("src/scripts/**/*.js", { base: "src" })
		.pipe(sourcemaps.init())
		.pipe(babel({
			modules: "amd"
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest("build/dev"))
		.pipe(jsOnlyFilter())
		.pipe(uglify())
		.pipe(gulp.dest("build/dist"));
});

gulp.task("js-libs", function() {
	return gulp.src([
			"bower_components/backbone/backbone.js",
			"bower_components/backbone.babysitter/lib/backbone.babysitter.js",
			"bower_components/backbone.marionette/lib/backbone.marionette.js",
			"bower_components/backbone.wreqr/lib/backbone.wreqr.js",
			"bower_components/jade/runtime.js",
			"bower_components/jquery/dist/jquery.js",
			"bower_components/requirejs/require.js",
			"bower_components/underscore/underscore.js"
		], { base: "bower_components" })
		.pipe(gulp.dest("build/dev/scripts/lib"))
		.pipe(uglify())
		.pipe(gulp.dest("build/dist/scripts/lib"));
});

gulp.task("style", function() {
	return gulp.src("src/style/**/*.less", { base: "src" })
		.pipe(sourcemaps.init())
		.pipe(less({
			// TODO
		}))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'IE 7'],
			cascade: false
		}))
		.pipe(concat("style/all.css"))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest("build/dev"))
		.pipe(filter(["**/*.css"]))
		.pipe(minifyCss())
		.pipe(gulp.dest("build/dist"));
});

gulp.task("default", ["jade", "jade-client", "js", "style"]);