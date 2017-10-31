"use strict";
const backbone_1 = require('backbone');
const underscore_1 = require('underscore');
const concat_url_parts_util_1 = require('./concat_url_parts.util');
function getUrl(instance) {
    let hostName, basePath, endpoint;
    if (instance instanceof backbone_1.Model || instance instanceof backbone_1.Collection) {
        hostName = underscore_1.result(instance, 'hostName') || '';
        basePath = underscore_1.result(instance, 'basePath') || '';
        endpoint = underscore_1.result(instance, 'endpoint');
    }
    else {
        throw new Error('An instance of a collection or a model has to be passed as argument to the function');
    }
    if (!endpoint || endpoint.length === 0) {
        throw new Error('An endpoint has to be specified');
    }
    return concat_url_parts_util_1.concatUrlParts(hostName, basePath, endpoint);
}
exports.getUrl = getUrl;
;
//# sourceMappingURL=get_url.util.js.map