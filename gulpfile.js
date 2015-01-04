var gulp = require('gulp')
    , del = require('del')
    , sass = require('gulp-sass')
    , notify = require('gulp-notify')
    , jade = require('gulp-jade')
    , marked = require('marked')
    , prettify = require('gulp-prettify')
    , fs = require('fs')
    , browserSync = require('browser-sync')
    , reload = browserSync.reload
    ;

// 
// ----------- private tasks ----------- 
//

gulp.task('clean', function(cb) {
    del(['build/assets/css'], cb);//, 'build/assets/js', 'build/assets/img'], cb);
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
            pretty:true,
            data: JSON.parse( fs.readFileSync('src/globals.json', { encoding: 'utf8' }) )
        }))
        .pipe(prettify({indent_size:4}))
        .pipe(gulp.dest('build/'))
        .pipe(notify({message:'templates task complete'}))
        .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('src/assets/css/**/*.scss', ['css']);
    gulp.watch('src/**/*.jade', ['templates']);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './build',
            directory: true
        }
    });
});


// 
// ----------- public tasks ----------- 
//

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'templates', 'watch', 'browser-sync');
});


// gulp.task('default', ['js','css','templates','express','watch']);
