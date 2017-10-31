"use strict";
const backbone_1 = require('backbone');
const underscore_1 = require('underscore');
const concat_url_parts_util_1 = require('./concat_url_parts.util');
function request(url, method, options, instance) {
    options = options || {};
    let requestOptions = {
        url: url,
        type: method
    }, hostName;
    if (url && !url.match(/\/\//)) {
        if (instance instanceof backbone_1.Model || instance instanceof backbone_1.Collection) {
            hostName = underscore_1.result(instance, 'hostName');
        }
        else {
            hostName = '';
        }
        requestOptions.url = concat_url_parts_util_1.concatUrlParts(hostName, url);
    }
    return backbone_1.ajax(underscore_1.extend(requestOptions, options));
}
exports.request = request;
//# sourceMappingURL=request.util.js.map