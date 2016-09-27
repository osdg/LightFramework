/**
 * Created by plter on 9/27/16.
 */

const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task("default", function () {
    gulp.src([
        "src/lf/functions.js",
        "src/lf/Command.js",
        "src/lf/CommandAdapter.js",
        "src/lf/CommandHandler.js",
        "src/lf/Gate.js"
    ]).pipe(concat("lf.js"))
        .pipe(gulp.dest("build"));
});
