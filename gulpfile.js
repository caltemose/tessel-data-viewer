var gulp = require('gulp')
    , del = require('del')
    , sass = require('gulp-sass')
    , notify = require('gulp-notify')
    , jade = require('gulp-jade')
    , marked = require('marked')
    , prettify = require('gulp-prettify')
    , fs = require('fs')
    , coffee = require('gulp-coffee')
    , copy = require('gulp-copy')
    , browserSync = require('browser-sync')
    , reload = browserSync.reload
    ;

// 
// ----------- private tasks ----------- 
//

gulp.task('clean', function(cb) {
    del(['build/assets/css'], cb);
});

gulp.task('css', function() {
    return gulp.src('src/assets/css/main.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(notify({message:'styles task complete'}))
        .pipe(reload({stream:true}));
});

gulp.task('templates', function() {
    return gulp.src('src/**/*.jade')
        .pipe(jade({
            pretty: true
            // , data: JSON.parse( fs.readFileSync('src/globals.json', { encoding: 'utf8' }) )
        }))
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest('build/'))
        .pipe(notify({message:'templates task complete'}))
        .pipe(reload({stream:true}));
});

gulp.task('coffee', function() {
    return gulp.src('src/assets/js/*.coffee')
        .pipe(coffee({bare: true}).on('error', function (err) { console.log(err) }))
        .pipe(gulp.dest('build/assets/js/'))
        .pipe(notify({message:'coffee task complete'}));
});

gulp.task('copyassets', function () {
    return gulp.src('src/assets/vendor/*')
        .pipe(copy('build/', {prefix:1}))
        .pipe(notify({message:'copyassets task complete'}));
});

gulp.task('watch', function () {
    gulp.watch('src/assets/css/**/*.scss', ['css']);
    gulp.watch('src/**/*.jade', ['templates']);
    gulp.watch('src/assets/js/**/*.coffee', ['coffee']);
    gulp.watch('build/assets/js/**', function (file) {
        if (file.type === 'changed') browserSync.reload(file.path);
    });
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './build',
            directory: true
        },
        port: 3333
    });
});


// 
// ----------- public tasks ----------- 
//

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'templates', 'coffee', 'copyassets', 'watch', 'browser-sync');
});

// gulp.task('test', ['copyassets']);

// gulp.task('default', ['js','css','templates','express','watch']);
