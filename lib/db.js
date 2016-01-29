var User = require('./user');
var _ = require('lodash');

module.exports = UserDB;

function UserDB(users) {
    var users = users || [];
    var self = this;
    this.users = [];

    this.addUser = function(user) {
        self.users.push(user);
    }

    this.findUser = function(query) {
        var matches = []
        _.forEach(self.users, function(user) {
            if (user.match(query)) {
                matches.push(user);
            }
        });
        console.log(matches);
        return matches;
    }

    this.allUsers = function() {
        return self.users;
    }

    _.forEach(users, function(user) {
        self.addUser(user);
    });
}
