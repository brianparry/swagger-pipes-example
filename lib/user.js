var _ = require('lodash');

module.exports = User

function User(params) {
    var public = this;
    var private = {
        name: params.name,
        email: params.email
    }
    
    public.getName = function() {
        return private.name;
    }

    public.setName = function(name) {
        private.name = name;
    }

    public.getEmail = function(email) {
        return private.email;
    }

    public.setEmail = function(email) {
        private.email = email;
    }
    
    public.match = function(query) {
        return _.isMatch(private, query);        
    }
}
