var settings = require('./needle.json');

require('prismatic-injector-stub')({
    service: settings.opt
});
