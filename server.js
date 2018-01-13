'use strict';

const childProcess = require('child_process');

const process = childProcess.fork('./bin/www', {
    stdio: 'inherit'
});
