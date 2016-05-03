'use strict';

var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('appname', { type: String, optional: true, defaults: 'demo' });
  },
  // 对用户提问
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('棱镜注射器模板') + '生成器！'
    ));

    var questions = [
        {
            type    : 'input',
            name    : 'name',
            message : '模板名：',
            default : this.appname
        },
        {
            type    : 'input',
            name    : 'description',
            message : '模板描述：'
        },
        {
            type    : 'input',
            name    : 'username',
            message : '作者英文名：'
            // default : this.user.github.username()
        },
        {
            type    : 'input',
            name    : 'nickname',
            message : '作者中文名：',
            default : this.user.git.name()
        },
        {
            type    : 'input',
            name    : 'email',
            message : '电子邮箱：',
            default : this.user.git.email()
        }
    ];

    this.prompt(questions, function (answers) {
      this.answers = answers;
      this.name = answers.name;
      this.description = answers.description || '';
      this.username = answers.username || '';
      this.nickname = answers.nickname || '';
      this.email = answers.email || '';
      done();
    }.bind(this));
  },

  writing: function () {
    var dest;
    var date = new Date();
    var data = {
      name: this.name,
      description: this.description,
      username: this.username,
      nickname: this.nickname,
      email: this.email,
      year: date.getFullYear(),
      date: date.toLocaleString()
    };
    // 生成根目录下文件
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('_server.js'), this.destinationPath('server.js'));

    this.fs.copyTpl(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'), data);
    this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), data);
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), data);
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), data);

    // 生成桩数据
    dest = 'src/stub/';
    mkdirp(dest);
    this.fs.copyTpl(this.templatePath('stub-query.json'), this.destinationPath([dest, this.name, '-query.json'].join('')), data);
    // 生模板
    dest = 'src/templates/';
    mkdirp(dest);
    this.fs.copyTpl(this.templatePath('template.json'), this.destinationPath([dest, 'template.json'].join('')), data);
    this.fs.copyTpl(this.templatePath('template-entry.js'), this.destinationPath([dest, 'js/entry.js'].join('')), data);
    this.fs.copyTpl(this.templatePath('template-style.css'), this.destinationPath([dest, 'css/style.css'].join('')), data);
  },

  install: function () {
    //this.installDependencies();
  }
});
