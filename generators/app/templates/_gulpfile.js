'use strict';

var fs = require('fs');
var del = require('del');
var gen = require('random-gen');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

const loc = './loc.json';
var hostname = 'localhost';
if(fs.existsSync(loc)){
    hostname = require(loc).hostname;
}

// 导入配置文件
var settings = require('./needle.json');
if('random' === settings.namespace){ // 如果命名空间设置为'random'，则使用随机生成的标识
    settings.namespace = gen.upper(8); // 8个随机大写字符的标识
}
settings.id = settings.namespace.toLowerCase();

// 清理构建输出
gulp.task('clean', function(){
    return del.sync(['./dist', './.tmp']);
});

// 复制模板开发规范
gulp.task('build:doc', function(){
    return gulp.src(['node_modules/prismatic-injector/doc/**'])
        .pipe(gulp.dest('./doc'));
});


// 预处理针头脚本
gulp.task('pre-process', function(){
    return gulp.src('node_modules/prismatic-injector/lib/needle.js')
        .pipe($.preprocess({ context: { AUTO: !settings.server, SERVER: settings.server } }))
        .pipe($.replace('__PI__', settings.namespace))
        .pipe($.replace('opt.do', settings.opt))
        .pipe(gulp.dest('./.tmp/processed'));
});

// 构建针头脚本
gulp.task('build:needle', ['pre-process'], function(){
    return gulp.src('./.tmp/processed/needle.js')
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.rename(settings.name))
        .pipe($.if(settings.revisioning, $.rev()))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('./dist'));
});

// 输出针头脚本的ID和文件名
gulp.task('build:inject', ['build:needle'], function(){
    var conf = { script: { id: settings.id } };
    var name = settings.name;
    if(settings.revisioning){
        var manifest = require('./dist/rev-manifest.json');
        if(manifest.hasOwnProperty(name)){
            name = manifest[name];
        }
    }
    conf.script.filename = name;
    fs.writeFile('inject.json', JSON.stringify(conf, null, 4));
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
gulp.task('serve', ['build:inject'], function(){
    function handle(req, res, next){
        res.end('<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body></body></html>');
        next();
    }
    var settings = {
        middleware: [
            { route: '/', handle: handle },
            { route: '/index.html', handle: handle },
            {
                route: '/favicon.ico',
                handle: function(req, res, next){
                    res.end('');
                    next();
                }
            }
        ],
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    var inject = require('./inject.json')
                    return [
                        snippet,
                        '<script id="',
                        inject.script.id,
                        `" charset="utf-8" src="http://${ hostname }:3080/`,
                        inject.script.filename,
                        '"></script>',
                        match
                    ].join('');
                }
            }
        },
        server: {
            baseDir: './dist'
        }
    };
    browserSync.init(settings);

    gulp.watch('./src/**', ['build:concat', 'build:templates', 'build:stub']);
    gulp.watch(['./dist/**'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'build:doc', 'build:needle', 'build:inject', 'build:templates', 'build:stub']);
