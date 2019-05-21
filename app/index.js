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
    }

    setRouters() {
        app.use('/api', require('app/routes/api'));
    }
}