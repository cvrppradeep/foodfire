const shell = require('shelljs');

shell.rm('-Rf', 'prod');
shell.mkdir('prod');
shell.cp('-R', '.nuxt', 'prod/.nuxt');
shell.cp('-R', 'package.json', 'prod/package.json');
shell.cp('-R', 'config.js', 'prod/config.js');
shell.cp('-R', 'nuxt.config.js', 'prod/nuxt.config.js');
shell.cp('-R', 'static', 'prod/static');
