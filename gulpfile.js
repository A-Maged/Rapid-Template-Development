const { parallel, watch, src, dest, series } = require("gulp");
/* JS */
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
/* Style */
const postcss = require("gulp-postcss");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();

const VARS = {
  isProd: process.env.NODE_ENV == "production",
  styles: {
    OutputName: "style.css",
    Path: "resources/styles/style.pcss",
    PathGlob: "resources/styles/**/*.pcss",
  },
  js: {
    OutputName: "index.js",
    Path: "resources/scripts/index.ts",
    PathGlob: "resources/scripts/**/*.ts",
  },
  templatesPathGlob: "resources/views/**/*.*",
  serverPathGlob: "server/**/*.*",
  distPath: "public/dist",
};

function serve() {
  browserSync.init({
    // server: "./public",
    proxy: "localhost:2020",
    files: ["resources/templates/**/*.pug", "public/dist/*.*"],
  });

  watch(VARS.styles.PathGlob, styles);

  watch([VARS.templatesPathGlob, VARS.serverPathGlob]).on(
    "change",
    browserSync.reload
  );

  watch(VARS.js.PathGlob).on("change", async () => {
    await js();

    browserSync.reload();
  });
}

function compile() {
  return series(cleanDist, parallel(styles, js));
}

function styles() {
  return src(VARS.styles.Path, { allowEmpty: true })
    .pipe(postcss())
    .pipe(VARS.isProd ? cleanCSS() : browserSync.stream())
    .pipe(rename(VARS.styles.OutputName))
    .pipe(dest(VARS.distPath));
}

function js() {
  return browserify({
    basedir: ".",
    debug: VARS.isProd ? false : true,
    entries: [VARS.js.Path],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source(VARS.js.OutputName))
    .pipe(dest(VARS.distPath));
}

function cleanDist() {
  return src(VARS.distPath, { read: false, allowEmpty: true }).pipe(clean());
}

exports.build = compile();
exports.default = series(compile(), serve);
