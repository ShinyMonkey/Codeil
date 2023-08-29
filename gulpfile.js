const gulp = require('gulp');
const sass= require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify= require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

const del =require('del')


gulp.task('css', function(){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});


// for minifing js

gulp.task('js',function(done){
    console.log('Minifing js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true,
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// for minifing images
gulp.task('images',function(done){
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg')
    .pipe(imagemin())
    .pipe(rev())
    .pipe( gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


// emty the public/assets
gulp.task('clean:assets',function(done){
    del.sync('./public/assets')
    done();
})


// fro running all for

gulp.task('build',gulp.series('clean:assets', 'css','js','images'),function(done){
    console.log('gulp is Minifing the assets');
    done();
})