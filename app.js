"use strict"

const express = require("express");
const compress = require("compression");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const app = express();
const morgan = require("morgan");

const config = require("./config.js");
const routes = require("./routes");
const api = require("./routes/api");
const auth = require("./middleware/auth");
var mongoose = require("mongoose");

mongoose.connect(config.database)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(`connection to database ${config.database} failed`));

auth.init(mongoose);
logger(app);

app.use(morgan("dev"))
    .use(compress())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended : false }));

app.use(auth.checkSession);
api.register(app, mongoose);
app.use("/", routes.hello);
    
app.use(function(req, res, next) {

    app.logger.error("not found - %s", req.url);
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json(err);
});

module.exports = app;
    