var gulp = require('gulp');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
//all files in folder
var jsFiles = 'src/js/*.js';

//sorted
var jsFiles = ['view/js/vendor/orinoco.js', 'src/js/main.js'];

var paths = {
    scripts: 'src/js/*.js',
    scss: 'src/sass/*.scss',
    img: 'src/img/*.{png,gif,jpg}'
};

gulp.task('scripts', function ()
{
    return gulp.src(jsFiles)
            .pipe(concat('scripts.min.js'))
            .pipe(gulp.dest('view/js'))
            .pipe(babel({
                presets: ['es2015'],
                babelrc: false
            }))
            .on('error', function (error) {
                console.log("ERROR: ", error);
            })
//            .pipe(uglify())
            .pipe(gulp.dest('view/js'));
});

gulp.task('compass', function ()
{
    return gulp.src('src/sass/*.scss')
            .pipe(compass({
                config_file: 'config.rb',
                css: 'view/css',
                sass: 'src/sass'
            }))
            .on('error', function (error)
            {
                console.error('' + error);
                this.emit('end');
            })
            .pipe(browserSync.stream());
});

gulp.task('compass-watch', ["compass"]);
gulp.task('scripts-watch', ["scripts"], browserSync.reload);

gulp.task('images', function ()
{
    return gulp.src('src/img/*.{png,gif,jpg}')
            .pipe(imagemin())
            .pipe(gulp.dest('view/files'));
});

gulp.task('watch-bs', function ()
{
    browserSync(
            {
                server:
                        {
                            baseDir: "view/"
                        }
            });

    gulp.watch("view/*.html").on('change', browserSync.reload);
    gulp.watch(paths.scripts, ['scripts-watch']);
    gulp.watch(paths.scss, ['compass-watch']);
});

gulp.task('watch', function ()
{
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.scss, ['compass']);
});