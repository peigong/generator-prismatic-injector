'use strict';

var del = require('del');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// 清理构建输出
gulp.task('clean', function(){
    del(['template.md', './dist/**']);
});

// 复制模板开发规范
gulp.task('build:doc', function(){
    return gulp.src('node_modules/prismatic-injector/doc/template.md')
        .pipe(gulp.dest('.'));
});

// 复制针头脚本
gulp.task('build:needle', function(){
    return gulp.src('node_modules/prismatic-injector/lib/needle.js')
        .pipe(gulp.dest('./dist'));
});

// 复制宿主页面
gulp.task('build:parasitifer', function(){
    return gulp.src('node_modules/prismatic-injector-stub/src/index.html')
        .pipe(gulp.dest('./dist'));
});

// 构建模板
gulp.task('build:templates', function(){
    return gulp.src('./src/templates/**')
        .pipe(gulp.dest('./dist/templates/<%= name %>'));
});

// 复制数据服务桩文件
gulp.task('build:stub', function(){
    return gulp.src('./src/stub/**')
        .pipe(gulp.dest('./dist/stub'));
});

// 实时运行宿主页面
gulp.task('serve', function(){
    var settings = {
        server: {
            baseDir: './dist'
        }
    }
    browserSync.init(settings);

    gulp.watch('./src/**', ['build:templates', 'build:stub']);
    gulp.watch(['./dist/**'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'build:doc', 'build:needle', 'build:parasitifer', 'build:templates', 'build:stub']);
