'use strict'

var debug = require('debug')('swagger:serialize');
var path = require('path');
var _ = require('lodash');

module.exports = function create(fittingDef, bagpipes) {
    var swaggerNodeRunner = bagpipes.config.swaggerNodeRunner;
    var appRoot = swaggerNodeRunner.config.swagger.appRoot;
    var serdesDirs = fittingDef.serdesDirs.map(function(dir) {
        return path.resolve(appRoot, dir);
    });
    var serdesFunctionCache = {};
    
    return function swagger_serdes(context, next) {
        var serdesNameKey = fittingDef.serdesNameKey
        var operation = context.request.swagger.operation;
        var serdes;

        try {
            var serdesName = operation[serdesNameKey] || operation.pathObject[serdesNameKey];
        } catch (err) {
            // serdes is optional, hand off to the next fitting if serdesName is undefined.
            return next();
        }

        if (serdesName in serdesFunctionCache) {
            serdes = serdesFunctionCache[serdesName];
        } else {
            for(var i = 0; i < serdesDirs.length; i++) {
                var serdesPath = path.resolve(serdesDirs[i], serdesName);
                try {
                    serdes = require(serdesPath);
                    serdesFunctionCache[serdesName] = serdes;
                    break;
                } catch (err) {
                    if (i === controllersDirs.length - 1) { return next(err); }
                }
            }
        }
        if (serdes) {
            var serdesFunction = serdes[operation.operationId];
            if (serdesFunction && typeof serdesFunction === 'function') {
                serdesFunction(context.request, context.response);
                //HACK! This should be handled by the to-be-created render fitting
                if (serdesNameKey === 'x-swagger-serializer') {
                    return context.response.json(context.response.body);
                }
                return next();
            }
        }
        next(new Error('No serdes found for ' + serdesName));
    }
}

