'use strict'

var User = require('../../lib/user');

module.exports = {
    usersGet: userSerialize,
    usersPost: userDeserialize
};

function userDeserialize(req, res) {
    req.body = new User(req.body);
}

function userSerialize(req, res) {
    res.body = res.body.map(function(user) {
        return {
            name: user.getName(),
            email: user.getEmail()
        };
    });
}
