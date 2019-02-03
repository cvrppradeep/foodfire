const shell = require('shelljs');

shell.mkdir('prod');
shell.rm('-rf', 'prod/*');
shell.cp('-R', 'package.json', 'prod/package.json');
shell.cp('-R', '.nuxt', 'prod/.nuxt');
shell.cp('-R', 'static', 'prod/static');
shell.cp('-R', 'server', 'prod/server');
shell.cp('-R', 'nuxt.config.js', 'prod/nuxt.config.js');
shell.cd('prod')
    .exec('git init')
    .exec("ssh-agent bash -c 'ssh-add ~/.ssh/swadesh.pem; git remote add live ssh://root@139.59.42.129/opt/litekart.git'")
    .exec('git pull live master')
    .exec('git add .')
    .exec("git commit -m '-'")
    .exec('git push live master -f')
