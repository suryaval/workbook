const gulp = require("gulp");
const watch = require("gulp-watch");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const shell = require("gulp-shell");
const htmlreplace = require("gulp-html-replace");
const runSequence = require("run-sequence");
const inlineNg2Template = require("gulp-inline-ng2-template");
const ts = require("gulp-typescript");
const on = require("on");
const rimraf = require("gulp-rimraf");
const embedSass = require("gulp-angular2-embed-sass");
const tsProject = ts.createProject("tsconfig.json");
const tsProjectRelease = ts.createProject("tsconfig.json");
const tsProjectRunner = ts.createProject("tsconfig.json");
const tsProjectIndex = ts.createProject("tsconfig.json");
const vendorBundleName = "ENG.vendor.bundle.js";

gulp.task("watch", function() {
    gulp.watch(["src/**/*.ts", "src/**/*.html", "src/**/*.scss"], ["watch:transpile:src"]);
    gulp.watch(
        ["runner/**/*.ts", "runner/**/*.html", "runner/**/*.scss"],
        ["watch:transpile:runner"]
    );
});

gulp.task("watch:transpile:src", function() {
    transpileSrc();
});

gulp.task("watch:transpile:runner", function() {
    transpileRunner();
});

/**
 * Gulp tslint
 */
gulp.task(
    "lint",
    shell.task([
        "tslint -c tslint.json -t stylish 'src/**/*.ts'",
        "tslint -c tslint.json -t stylish 'runner/**/*.ts'"
    ])
);

/**
 * Gulp Prettier
 */
gulp.task(
    "prettier",
    shell.task([
        'prettier --parser typescript --print-width 100 --tab-width 4 --write "src/**/*.ts"',
        'prettier --parser typescript --print-width 100 --tab-width 4 --write "runner/**/*.ts"',
        'prettier --parser typescript --print-width 100 --tab-width 4 --write "**/*.json"',
        'prettier --parser typescript --print-width 100 --tab-width 4 --write "**/*.js"'
    ])
);

/**
 * Clean all generated artifacts by build process
 */
gulp.task("clean:all", function() {
    gulp
        .src([
            "./header",
            "./dist",
            "./release",
            "./coverage",
            "./karmaUnitTestReport",
            "./protractorReports",
            "index.js",
            "index.js.map",
            "index.d.ts"
        ])
        .pipe(rimraf());
});

/**
 * Build Process
 */
gulp.task("build", function() {
    runSequence("transpile:src");
});

/**
 * Transpile Process
 */
gulp.task("transpile:src", function() {
    transpileSrc().pipe(gulp.dest("./release/src")).on("end", function() {
        runSequence("transpile:header");
    });
});

gulp.task("transpile:header", function() {
    gulp
        .src("header.ts")
        .pipe(tsProjectRelease())
        .on("error", handleError)
        .pipe(gulp.dest("./header/dist"))
        .pipe(gulp.dest("./dist"))
        .pipe(gulp.dest("./release"))
        .on("end", function() {
            runSequence("transpile:runner");
        });
});

gulp.task("transpile:runner", function() {
    transpileRunner().on("end", function() {
        runSequence("transpile:index");
    });
});

gulp.task("transpile:index", function() {
    gulp
        .src("index.ts")
        .pipe(tsProjectIndex())
        .on("error", handleError)
        .pipe(gulp.dest("./"))
        .on("end", function() {
            runSequence(["rollup:bundle", "distgen"]);
        });
});

var transpileSrc = function() {
    return gulp
        .src("./src/**/*.ts")
        .pipe(embedSass())
        .pipe(inlineNg2Template({ useRelativePaths: true, base: "src/" }))
        .pipe(tsProject())
        .on("error", handleError)
        .pipe(gulp.dest("./dist/src"))
        .pipe(gulp.dest("./header/dist/src"));
};

var transpileRunner = function() {
    return gulp
        .src("./runner/**/*.ts")
        .pipe(embedSass())
        .pipe(inlineNg2Template({ useRelativePaths: true, base: "runner/" }))
        .pipe(tsProjectRunner())
        .on("error", handleError)
        .pipe(gulp.dest("./dist/runner"))
        .pipe(gulp.dest("./header/dist/runner"));
};

/**
 * Bundle UMD(Universal Module Definition)
 */
gulp.task("rollup:bundle", shell.task(["rollup -c rollup.conf.js"]));

gulp.task(
    "distgen",
    [
        "distgen:external:modules",
        "distgen:vendor",
        "distgen:ENG:modules",
        "prod:distgen:resources"
    ],
    function() {
        return gulp.src("index.html").pipe(gulp.dest("./header"));
    }
);

gulp.task("prod:distgen:resources", function() {
    return gulp.src(["resources/**/*"]).pipe(gulp.dest("./header/resources"));
});

gulp.task("distgen:external:modules", function() {
    gulp
        .src(["node_modules/@angular/**/bundles/*"])
        .pipe(gulp.dest("./header/node_modules/@angular"));

    gulp.src(["node_modules/@ngrx/**/bundles/*"]).pipe(gulp.dest("./header/node_modules/@ngrx"));

    gulp
        .src(["node_modules/reselect/dist/*"])
        .pipe(gulp.dest("./header/node_modules/reselect/dist"));

    gulp
        .src(["node_modules/ngrx-store-freeze/dist/index.js"])
        .pipe(gulp.dest("./header/node_modules/ngrx-store-freeze/dist"));

    gulp
        .src(["node_modules/deep-freeze-strict/index.js"])
        .pipe(gulp.dest("./header/node_modules/deep-freeze-strict"));

    gulp
        .src(["node_modules/systemjs-plugin-babel/**"])
        .pipe(gulp.dest("./header/node_modules/systemjs-plugin-babel"));

    gulp
        .src(["node_modules/text-mask-core/**/*"])
        .pipe(gulp.dest("./header/node_modules/text-mask-core"));

    gulp
        .src(["node_modules/angular2-text-mask/**/*"])
        .pipe(gulp.dest("./header/node_modules/angular2-text-mask"));

    gulp.src(["node_modules/rxjs/**/*"]).pipe(gulp.dest("./header/node_modules/rxjs"));

    gulp.src(["node_modules/moment/moment.js"]).pipe(gulp.dest("./header/node_modules/moment"));

});

gulp.task("distgen:vendor", function() {
    return gulp
        .src([
            "node_modules/core-js/client/shim.min.js",
            "node_modules/zone.js/dist/zone.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/systemjs/dist/system.src.js",
            "runner/systemjs.conf.js"
        ])
        .pipe(concat(vendorBundleName))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"))
        .pipe(gulp.dest("./header/dist"));
});

gulp.task("distgen:ENG:modules", function() {
    gulp
        .src(["node_modules/ENG-assets/**/*"])
        .pipe(gulp.dest("./header/node_modules/ENG-assets"));

    return gulp
        .src(["node_modules/ENG-**/release/bundles/*"])
        .pipe(gulp.dest("./header/node_modules"));
});

function handleError(err) {
    process.exit(-1);
}
