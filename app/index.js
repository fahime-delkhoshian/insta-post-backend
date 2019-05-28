const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const mongoose = require('mongoose');

module.exports = class Application{

    constructor() {
        this.setUpExpress();
        this.setMongoconnection();
        this.setConfig();
        this.setRouters();
    }

    setUpExpress() {
        const server = http.createServer(app);
        server.listen(config.port, () => console.log(`listening on port ${config.port}!`));
    }

    setMongoconnection() {

        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url, {useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }

    /**
     * Express Config
     */
    setConfig() {

        app.use(bodyParser.json({ type: 'application/json'}));
        app.use(bodyParser.urlencoded({ extended: true}));
        app.use(validator());
        app.use('/public' , express.static('public'))

    }

    setRouters() {
        app.use('', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            //Auth Each API Request created by user.
            next();
            });
        app.use('/api', require('app/routes/api'));

    }
}