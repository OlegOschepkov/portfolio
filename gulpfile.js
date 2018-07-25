"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var runSequence = require('run-sequence');
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");

gulp.task("clean", function() {
  return delete("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
    imagemin.optipng({
        optimizationLevel: 3
      }),
    imagemin.jpegtran({
        progressive: true
      }),
  ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    // .pipe(server.stream());
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "copy",
    "style",
    "html",
    "images",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/js/*.js").on("change", server.reload);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});
