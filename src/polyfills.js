"use strict";
require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('web-animations-js/web-animations.min');
if (process.env.ENV === 'prod') {
}
else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map