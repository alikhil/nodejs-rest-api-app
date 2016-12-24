
var passport = require("passport");
var mongoose = require("mongoose");
var config = require("../config.js");
var User = require("../models/user");
var jwt = require('jwt-simple');
// configuring passport to work with jwt
require("../config/passport")(passport);

function init(db) {
    mongoose = db;
}

function getToken(headers) {
    if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
        return parted[1];
    } else {
        return null;
    }
  } else {
        return null;
  }
};

function safeDecode(token) {
    return new Promise(
        function(resolve, reject) {
            try {
                var decoded = jwt.decode(token, config.secret);
                resolve(decoded);
            }
            catch(err){
                reject(Error(err));
            }
    });
}


function checkSession (req, res, next) {
    if (req.url.indexOf("/signup") >= 0 || req.url.indexOf("/auth") >= 0) {
        return next();
    }
    var token = getToken(req.headers);
    if (!token) {
       res.json({ status: false, message: "Access denied. Token not provided." });
    } else {
        safeDecode(token)
            .then((decoded) => {
                User.findOne({ name: decoded.name })
                    .then((user) => {
                        if (!user) {
                            return res.json({ status: false, message: "Authentication failed. User not found." });
                        } else {
                            req.user = user;
                            next();
                        }
                    })
                    .catch((err) => {
                        return res.json({ status: false, message: "Authentication failed. " + err});
                    });
            })
            .catch((err) => {
                return res.json({ status: false, message: "Authentication failed. " + err});
            });
    }

}

module.exports = {
    init, checkSession
}