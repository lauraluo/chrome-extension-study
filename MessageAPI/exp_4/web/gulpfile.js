var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require("gulp.spritesmith"),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    open = require('gulp-open');
// bowerFiles = require('bower-files');


// // Sass
gulp.task('sass', function() {
    gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['src/scss/**/**']
        }))
        .pipe(autoprefixer({
            browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());

});

// CSS Sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/images/sprites/**/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 10,
        exportOpts : { quality: 50 },
        cssTemplate: function(data) {
            var output = '';
            var v = Math.random();
            data.sprites.forEach(function(sprite){
                output += [
                    '.'+sprite.name+' {\n',
                    '  display: block;\n',
                    '  background-image: url(../images/'+sprite.image+'?v='+ v+');\n',
                    '  background-position: '+sprite.px.offset_x+' '+sprite.px.offset_y+';\n',
                    '  width:'+sprite.px.width+';\n',
                    '  height: '+sprite.px.height+';\n',
                    '/*source-image:'+sprite.source_image+'*/\n',
                    '}\n',
                    '@mixin '+sprite.name+'() {\n',
                    '  display: block;\n',
                    '  background-image: url(../images/'+sprite.image+'?v='+ v+');\n',
                    '  background-position: '+sprite.px.offset_x+' '+sprite.px.offset_y+';\n',
                    '  width:'+sprite.px.width+';\n',
                    '  height: '+sprite.px.height+';\n',
                    '/*source-image:'+sprite.source_image+'*/\n',
                    '}\n'
                ].join('')
            });
            return output;
        }
    }));

    spriteData.img.pipe(gulp.dest('dist/images'));
    spriteData.css.pipe(gulp.dest('src/scss/'));
});



// Jade
gulp.task('jade', function() {
    gulp.src(['src/*.jade', '!src/_*.jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
    gulp.src('dist/*.html')
        .pipe(connect.reload());
});

//Sever
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 3001,
        livereload: true
    });
});

//Copy
gulp.task('copyJS', function() {
    gulp.src(['src/js/**'])
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('copyImg', function() {
    gulp.src(['src/images/*','!src/images/sprite'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copyAssets', function() {
    gulp.src(['src/assets/**'])
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copyAll', ['copyJS', 'copyImg', 'copyAssets'], function() {});

//Clean
gulp.task('reset', function() {
    gulp.src(['dist/'])
        .pipe(clean());
});


//Open
gulp.task('open', function() {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:3001',
            app: 'firefox'
        }));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['src/*.jade'], ['jade']);
    gulp.watch('src/scss/**/**.scss', ['sass']);
    gulp.watch(['src/js/**'], ['copyJS']);
    gulp.watch(['src/images/*'], ['copyImg']);
    gulp.watch(['src/images/sprites/*'], ['sprite']);
    gulp.watch(['dist/*.html'], ['html']);
});

//Build
gulp.task('build', ['sprite','jade', 'sass', 'copyAll'], function() {});

//Group Dev
gulp.task('dev', ['build', 'connectDist', 'watch', 'open'], function() {});

//Default  Task
gulp.task('default', ['dev'], function() {});



// var jslint = require('gulp-jslint');
 
// gulp.task('jslint', function () {
//     return gulp.src(['src/js/app.js'])
//             .pipe(jslint())
//             .pipe(jslint.reporter('default',errorsOnly));
// });