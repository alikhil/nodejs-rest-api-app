"use strict"
const apiV1 = require("./v1");
const apiV2 = require("./v2");

module.exports.register = (app, db) => {
    apiV1.init(db);
    app.use("/api/v1", apiV1.router);
    app.use("/api/v2", apiV2);
}