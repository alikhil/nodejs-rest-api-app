"use strict"

/// API v1
var passport = require("passport");
var mongoose = require("mongoose");
var config = require("../../../config.js");
var User = require("../../../models/user");
var jwt = require('jwt-simple');

// configuring passport to work with jwt
require("../../../config/passport")(passport);

function init(db) {
    mongoose = db;
}
var router = require("express").Router(); 

var users = [
    { name: "alik", age: 18},
    { name: "Timur", age: 19}
];

/**
 * @apiDefine Status
 * @apiSuccess {Boolean} succes Status of response. `true` -> ok. `false` -> see `message`
 */
/**
 * @apiDefine Message
 * @apiSuccess {String} [message] Message describing status of response.
 */

/**
 * @apiName Users
 * @apiGroup Users
 * @api {get} /users/
 * @apiDescription Getting list of `User`s
 * @apiHeader authorization JWT token that given by `/auth` method
 * @apiVersion 1.0.0
 * @apiUse Status
 * @apiUse Message
 * @apiSuccess {User[]} users List of users of type `User`
 * @apiSampleRequest http://localhost:3535/api/v1/users/
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": true,
 *      "users": [ {"name": "alik", "age": 19 } ]
 *  }
 */
router.get("/users", (req, res, next) => {
    res.status(200).json({ status:true, users });
});


/**
 * @apiName SignUp
 * @apiGroup Authorization
 * @apiVersion 1.0.0
 * @apiDescription Creates user with `name` and `password`.
 * @api {post} /signup/
 * @apiParam {String} name Username
 * @apiParam {String} password Password
 * @apiUse Message
 * @apiUse Status
 * @apiSampleRequest http://localhost:3535/api/v1/signup/
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": true,
 *      "message": "Successful created new user."
 *  }
 */

router.post("/signup", (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.json({ success: false, message: "Please pass name and password"});
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        newUser.save()
            .then((user) => {
                res.json({ success: true, message: "Successful created new user." });
            })
            .catch((err) => {
                return res.json({ success: false, message: "Username already exists."});
            });
    }
});


/**
 * @apiName Auth
 * @apiGroup Authorization
 * @apiVersion 1.0.0
 * @apiDescription Authorizes user by his `name` and `password` and returns `token` to access other api functions. 
 * @api {post} /auth/
 * @apiParam {String} name Username
 * @apiParam {String} password Password of user
 * @apiUse Status
 * @apiUse Message
 * @apiSuccess {String} [token] Contains jwt token if authorization succes 
 * @apiSampleRequest http://localhost:3535/api/v1/auth/
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": true,
 *      "token": "JWT long token here_asxassdv,d;fmdfmgdflfmdlmgdlfmgldfmgldmfgldfgdlfm"
 *  }
 */

router.post("/auth", (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.json({ success: false, message: "Please pass name and password"});
    } else {
        User.findOne({ name: req.body.name })
            .then((user) => {
                if (!user) {
                    res.json({ success: false, message: "Authentication failed. User not found. "});
                } else {
                    user.comparePasswords(req.body.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                let token = jwt.encode(user, config.secret);
                                res.json({ success: true, token: "JWT " + token });
                            } else {
                                res.json({ success: false, message: "Authentication failed. Wrong password." });
                            }
                        })
                        .catch((err) => {
                            res.json({ success: false, message: "Authentication failed." + err });
                        });
                }
            })
            .catch((err) => {
                res.json({ success: false, message: "Authentication failed." + err });
            });
    }
});

module.exports = {
    init,
    router
}
