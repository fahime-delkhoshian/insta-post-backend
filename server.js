require('app-module-path').addPath(__dirname);
const application = require('./app'); 
require('dotenv').config();
global.config = require('app/config');



console.log("run");
new application();