"use strict";
const underscore_1 = require('underscore');
function concatUrlParts(...args) {
    let urlParts = underscore_1.toArray(arguments), cleanedUrlParts = [];
    // remove empty strings
    urlParts = underscore_1.compact(urlParts);
    underscore_1.each(urlParts, function (url, index) {
        if (index === 0) {
            // remove only trailing slash
            url = url.replace(/\/$/g, '');
        }
        else {
            // Removing leading and trailing slash
            url = url.replace(/^\/|\/$/g, '');
        }
        cleanedUrlParts.push(url);
    });
    return cleanedUrlParts.join('/');
}
exports.concatUrlParts = concatUrlParts;
//# sourceMappingURL=concat_url_parts.util.js.map