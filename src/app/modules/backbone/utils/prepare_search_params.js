"use strict";
const http_1 = require('@angular/http');
const underscore_1 = require('underscore');
function setSearchParams(searchParams, queryParams = {}) {
    underscore_1.pairs(queryParams).forEach((pair) => {
        let key = pair[0], value = pair[1];
        searchParams.set(key, value);
    });
    return searchParams;
}
function prepareSearchParams(searchParams, queryParams) {
    if (!searchParams) {
        return setSearchParams(new http_1.URLSearchParams(), queryParams);
    }
    else if (searchParams instanceof http_1.URLSearchParams) {
        return setSearchParams(searchParams, queryParams);
    }
    else if (!(searchParams instanceof http_1.URLSearchParams) && underscore_1.isObject(searchParams)) {
        queryParams = underscore_1.extend({}, queryParams, searchParams);
        return setSearchParams(new http_1.URLSearchParams(), queryParams);
    }
    else {
        throw new Error('Search property of options has to be an object');
    }
}
exports.prepareSearchParams = prepareSearchParams;
//# sourceMappingURL=prepare_search_params.js.map