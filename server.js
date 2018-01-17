'use strict';

<<<<<<< HEAD
/******************************************************
 * Edit ./app.js file instead of this one.
 ******************************************************/

const childProcess = require('child_process');

=======
const childProcess = require('child_process');

>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
const process = childProcess.fork('./bin/www', {
    stdio: 'inherit'
});
