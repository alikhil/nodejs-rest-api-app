"use strict"
var User = require("../../../models/user");
// API V2
var router = require("express").Router(); 

/**
 * @apiName users
 * @apiGroup Users
 * @apiVersion 2.0.0
 * @apiDescription Getting list of users.
 * @apiHeader authorization JWT token that given by `/auth` method
 * @api {get} /users/
 * @apiSuccess {Object[]} users List of real users this service.
 * @apiUse Status
 * @apiUse Message
 * @apiSampleRequest http://localhost:3535/api/v2/users/

 */
router.get("/users", (req, res, next) => {
    User.collection.find({}).toArray()
        .then((users) => {
            res.status(200).json({success: true, users });
        })
        .catch((err) => {
            res.json({success:false, message: "Can not list of users. " + err });
        });
});

module.exports = router;