'use strict'

module.exports = controllerFactory;

function controllerFactory(callback) {
    return function(req, res, next) {
        var result = callback(req, res);
        if (!res.headersSent) {
            res.body = result;
            next();
        }
    }
}
