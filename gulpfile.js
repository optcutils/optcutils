const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const minify = require('gulp-minify');
const push = require('gulp-git-push');

const scripts = [
    {
        path: './src/stamina/stamina.js',
        name: 'stamina.js',
        destination: './stamina/assets/js/'
    },
    {
        path: './src/bookhelper/bookhelper.js',
        name: 'bookhelper.js',
        destination: './bookhelper/assets/js/'
    }
];

gulp.task('push', function(){
    return scripts.map(function(file){
        browserify(file.path)
        .transform('babelify', {presets: ['env']})
        .bundle()
        .pipe(source(file.name))
        .pipe(buffer())
        .pipe(minify({ext:{min:'.js'}, noSource: true}))
        .pipe(gulp.dest(file.destination))
        .pipe(push());
});});

gulp.task('scripts', function(){
    return scripts.map(function(file){
        browserify(file.path)
        .transform('babelify', {presets: ['env']})
        .bundle()
        .pipe(source(file.name))
        .pipe(buffer())
        .pipe(minify({ext:{min:'.js'}, noSource: true}))
        .pipe(gulp.dest(file.destination));
});});
