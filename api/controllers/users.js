'use strict'

var UserDB = require('../../lib/db');
var controller = require('../../lib/controller');

var usersGet = controller(function(req, res) {
    if (global.userDB) {
        var name = req.swagger.params.name.value;
        var email = req.swagger.params.email.value;
        var query;
        if (name || email) {
            query = {};
            if (name) {query.name = name;}
            if (email) {query.email = email; }
        } 
        if (query) {
            console.log('query name: ' + query.name + ' query email: ' + query.email);
            return global.userDB.findUser(query);
        } else {
            console.log('allUsers');
            return global.userDB.allUsers();
        }
    } else {
        console.log('noUsers');
        global.userDB = new UserDB();
        return [];
    }
});

var usersPost = controller(function(req, res) {
    if (global.userDB) {
        console.log('addUser: ' + req.body);
        global.userDB.addUser(req.body);
    } else {
        console.log('new UserDB: ' + req.body);
        global.userDB = new UserDB([req.body]);
    }
    return {
        message: 'User added.'
    };
});


module.exports = {
    usersGet: usersGet,
    usersPost: usersPost
};
