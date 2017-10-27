webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const platform_browser_dynamic_1 = __webpack_require__(1);
	const core_1 = __webpack_require__(3);
	let runtime = __webpack_require__(23);
	let registerEvents = __webpack_require__(24);
	const main_module_1 = __webpack_require__(25);
	if (true) {
	    core_1.enableProdMode();
	}
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.MainModule);
	if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
	    const registration = runtime.register();
	    registerEvents(registration, {
	        onInstalled: () => {
	            console.log('[SW] onInstalled');
	        },
	        onUpdateReady: () => {
	            console.log('[SW] onUpdateReady');
	        },
	        onUpdating: () => {
	            console.log('[SW] onUpdating');
	        },
	        onUpdateFailed: () => {
	            console.log('[SW] onUpdateFailed');
	        },
	        onUpdated: () => {
	            console.log('[SW] onUpdated');
	        },
	    });
	}
	else {
	    console.log('serviceWorker not available');
	}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

	var serviceWorkerOption = {"scriptURL":"/sw.js"};
	      "use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable flowtype/require-valid-file-annotation */
	/* global serviceWorkerOption */

	exports.default = {
	  register: function register() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (navigator.serviceWorker) {
	      return navigator.serviceWorker.register(serviceWorkerOption.scriptURL, options);
	    }

	    return false;
	  }
	};
	module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak

	function registerEvents(registration, callbacks) {
	  var sendEvent = function sendEvent(event) {
	    if (typeof callbacks[event] === 'function') {
	      callbacks[event]();
	    }
	  };

	  var handleUpdating = function handleUpdating(registration2) {
	    var serviceworker = registration2.installing || registration2.waiting;
	    var ignoreWaiting = void 0;

	    // No SW or already handled
	    if (!serviceworker || serviceworker.onstatechange) {
	      return;
	    }

	    if (registration2.waiting) {
	      ignoreWaiting = true;
	    }

	    function onUpdateStateChange() {
	      switch (serviceworker.state) {
	        case 'redundant':
	          sendEvent('onUpdateFailed');
	          serviceworker.onstatechange = null;
	          break;

	        case 'installing':
	          sendEvent('onUpdating');
	          break;

	        case 'installed':
	          if (!ignoreWaiting) {
	            sendEvent('onUpdateReady');
	          }
	          break;

	        case 'activated':
	          sendEvent('onUpdated');
	          serviceworker.onstatechange = null;
	          break;

	        default:
	          break;
	      }
	    }

	    function onInstallStateChange() {
	      switch (serviceworker.state) {
	        case 'redundant':
	          // Failed to install, ignore
	          serviceworker.onstatechange = null;
	          break;

	        case 'activated':
	          sendEvent('onInstalled');
	          serviceworker.onstatechange = null;
	          break;

	        default:
	          break;
	      }
	    }

	    var stateChangeHandler = void 0;

	    // Already has a SW
	    if (registration2.active) {
	      onUpdateStateChange();
	      stateChangeHandler = onUpdateStateChange;
	    } else {
	      onInstallStateChange();
	      stateChangeHandler = onInstallStateChange;
	    }

	    serviceworker.onstatechange = stateChangeHandler;
	  };

	  registration.then(function (registration2) {
	    handleUpdating(registration2);
	    registration2.onupdatefound = function () {
	      handleUpdating(registration2);
	    };
	  }).catch(function (err) {
	    sendEvent('onError');
	    return Promise.reject(err);
	  });
	}

	exports.default = registerEvents;
	module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	__webpack_require__(26);
	const core_1 = __webpack_require__(3);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const http_1 = __webpack_require__(65);
	const backbone_module_1 = __webpack_require__(66);
	const tracks_module_1 = __webpack_require__(89);
	const dashboard_module_1 = __webpack_require__(346);
	const main_component_1 = __webpack_require__(396);
	const main_routes_1 = __webpack_require__(400);
	const audio_player_module_1 = __webpack_require__(409);
	const session_module_1 = __webpack_require__(352);
	const users_module_1 = __webpack_require__(427);
	const common_1 = __webpack_require__(22);
	const nav_component_1 = __webpack_require__(429);
	const playlist_module_1 = __webpack_require__(378);
	const auth_service_1 = __webpack_require__(147);
	const shared_module_1 = __webpack_require__(121);
	const desktop_app_view_component_1 = __webpack_require__(401);
	const user_analytics_module_1 = __webpack_require__(433);
	let MainModule = class MainModule {
	};
	MainModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            http_1.HttpModule,
	            backbone_module_1.BackboneModule,
	            tracks_module_1.TracksModule,
	            dashboard_module_1.DashboardModule,
	            main_routes_1.MainRoutingModule,
	            audio_player_module_1.AudioPlayerModule,
	            session_module_1.SessionModule,
	            users_module_1.UsersModule,
	            playlist_module_1.PlaylistModule,
	            shared_module_1.SharedModule,
	            user_analytics_module_1.UserAnalyticsModule
	        ],
	        declarations: [
	            main_component_1.MainComponent,
	            nav_component_1.NavComponent,
	            desktop_app_view_component_1.DesktopAppViewComponent
	        ],
	        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, auth_service_1.AuthService],
	        bootstrap: [main_component_1.MainComponent]
	    }), 
	    __metadata('design:paramtypes', [])
	], MainModule);
	exports.MainModule = MainModule;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// Observable class extensions
	__webpack_require__(27);
	__webpack_require__(33);
	// Observable operators
	__webpack_require__(36);
	__webpack_require__(43);
	__webpack_require__(50);
	__webpack_require__(52);
	__webpack_require__(54);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(60);


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license Angular v2.4.10
	 * (c) 2010-2017 Google, Inc. https://angular.io/
	 * License: MIT
	 */
	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(3), __webpack_require__(61), __webpack_require__(6), __webpack_require__(7), __webpack_require__(63)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/operator/toPromise', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/observable/fromPromise'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.forms = global.ng.forms || {}),global.ng.core,global.Rx.Observable.prototype,global.Rx,global.Rx,global.Rx.Observable));
	}(this, function (exports,_angular_core,rxjs_operator_toPromise,rxjs_Subject,rxjs_Observable,rxjs_observable_fromPromise) { 'use strict';

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Base class for control directives.
	     *
	     * Only used internally in the forms module.
	     *
	     * \@stable
	     * @abstract
	     */
	    var AbstractControlDirective = (function () {
	        function AbstractControlDirective() {
	        }
	        Object.defineProperty(AbstractControlDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { throw new Error('unimplemented'); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "value", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.value : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.valid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.invalid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pending", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.pending : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "errors", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.errors : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.pristine : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.dirty : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "touched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.touched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.untouched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.disabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.enabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.statusChanges : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.control ? this.control.valueChanges : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.reset = function (value) {
	            if (value === void 0) { value = undefined; }
	            if (this.control)
	                this.control.reset(value);
	        };
	        /**
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.hasError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return this.control ? this.control.hasError(errorCode, path) : false;
	        };
	        /**
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControlDirective.prototype.getError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return this.control ? this.control.getError(errorCode, path) : null;
	        };
	        return AbstractControlDirective;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$1 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * A directive that contains multiple {\@link NgControl}s.
	     *
	     * Only used by the forms module.
	     *
	     * \@stable
	     */
	    var ControlContainer = (function (_super) {
	        __extends$1(ControlContainer, _super);
	        function ControlContainer() {
	            _super.apply(this, arguments);
	        }
	        Object.defineProperty(ControlContainer.prototype, "formDirective", {
	            /**
	             * Get the form to which this container belongs.
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ControlContainer.prototype, "path", {
	            /**
	             * Get the path to this container.
	             * @return {?}
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        return ControlContainer;
	    }(AbstractControlDirective));

	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isPresent(obj) {
	        return obj != null;
	    }
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isBlank(obj) {
	        return obj == null;
	    }
	    /**
	     * @param {?} a
	     * @param {?} b
	     * @return {?}
	     */
	    function looseIdentical(a, b) {
	        return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	    }
	    /**
	     * @param {?} o
	     * @return {?}
	     */
	    function isJsObject(o) {
	        return o !== null && (typeof o === 'function' || typeof o === 'object');
	    }
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function isPrimitive(obj) {
	        return !isJsObject(obj);
	    }

	    /**
	     * Wraps Javascript Objects
	     */
	    var StringMapWrapper = (function () {
	        function StringMapWrapper() {
	        }
	        /**
	         * @param {?} m1
	         * @param {?} m2
	         * @return {?}
	         */
	        StringMapWrapper.merge = function (m1, m2) {
	            var /** @type {?} */ m = {};
	            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
	                var k = _a[_i];
	                m[k] = m1[k];
	            }
	            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
	                var k = _c[_b];
	                m[k] = m2[k];
	            }
	            return m;
	        };
	        /**
	         * @param {?} m1
	         * @param {?} m2
	         * @return {?}
	         */
	        StringMapWrapper.equals = function (m1, m2) {
	            var /** @type {?} */ k1 = Object.keys(m1);
	            var /** @type {?} */ k2 = Object.keys(m2);
	            if (k1.length != k2.length) {
	                return false;
	            }
	            for (var /** @type {?} */ i = 0; i < k1.length; i++) {
	                var /** @type {?} */ key = k1[i];
	                if (m1[key] !== m2[key]) {
	                    return false;
	                }
	            }
	            return true;
	        };
	        return StringMapWrapper;
	    }());
	    var ListWrapper = (function () {
	        function ListWrapper() {
	        }
	        /**
	         * @param {?} arr
	         * @param {?} condition
	         * @return {?}
	         */
	        ListWrapper.findLast = function (arr, condition) {
	            for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
	                if (condition(arr[i])) {
	                    return arr[i];
	                }
	            }
	            return null;
	        };
	        /**
	         * @param {?} list
	         * @param {?} items
	         * @return {?}
	         */
	        ListWrapper.removeAll = function (list, items) {
	            for (var /** @type {?} */ i = 0; i < items.length; ++i) {
	                var /** @type {?} */ index = list.indexOf(items[i]);
	                if (index > -1) {
	                    list.splice(index, 1);
	                }
	            }
	        };
	        /**
	         * @param {?} list
	         * @param {?} el
	         * @return {?}
	         */
	        ListWrapper.remove = function (list, el) {
	            var /** @type {?} */ index = list.indexOf(el);
	            if (index > -1) {
	                list.splice(index, 1);
	                return true;
	            }
	            return false;
	        };
	        /**
	         * @param {?} a
	         * @param {?} b
	         * @return {?}
	         */
	        ListWrapper.equals = function (a, b) {
	            if (a.length != b.length)
	                return false;
	            for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	                if (a[i] !== b[i])
	                    return false;
	            }
	            return true;
	        };
	        /**
	         * @param {?} list
	         * @return {?}
	         */
	        ListWrapper.flatten = function (list) {
	            return list.reduce(function (flat, item) {
	                var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
	                return ((flat)).concat(flatItem);
	            }, []);
	        };
	        return ListWrapper;
	    }());

	    var /** @type {?} */ isPromise = _angular_core.__core_private__.isPromise;
	    var /** @type {?} */ isObservable = _angular_core.__core_private__.isObservable;

	    /**
	     * @param {?} value
	     * @return {?}
	     */
	    function isEmptyInputValue(value) {
	        // we don't check for string here so it also works with arrays
	        return value == null || value.length === 0;
	    }
	    /**
	     * Providers for validators to be used for {@link FormControl}s in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * ### Example
	     *
	     * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
	     * @stable
	     */
	    var /** @type {?} */ NG_VALIDATORS = new _angular_core.OpaqueToken('NgValidators');
	    /**
	     * Providers for asynchronous validators to be used for {@link FormControl}s
	     * in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * See {@link NG_VALIDATORS} for more details.
	     *
	     * @stable
	     */
	    var /** @type {?} */ NG_ASYNC_VALIDATORS = new _angular_core.OpaqueToken('NgAsyncValidators');
	    /**
	     * Provides a set of validators used by form controls.
	     *
	     * A validator is a function that processes a {\@link FormControl} or collection of
	     * controls and returns a map of errors. A null map means that validation has passed.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * var loginControl = new FormControl("", Validators.required)
	     * ```
	     *
	     * \@stable
	     */
	    var Validators = (function () {
	        function Validators() {
	        }
	        /**
	         * Validator that requires controls to have a non-empty value.
	         * @param {?} control
	         * @return {?}
	         */
	        Validators.required = function (control) {
	            return isEmptyInputValue(control.value) ? { 'required': true } : null;
	        };
	        /**
	         * Validator that requires control value to be true.
	         * @param {?} control
	         * @return {?}
	         */
	        Validators.requiredTrue = function (control) {
	            return control.value === true ? null : { 'required': true };
	        };
	        /**
	         * Validator that requires controls to have a value of a minimum length.
	         * @param {?} minLength
	         * @return {?}
	         */
	        Validators.minLength = function (minLength) {
	            return function (control) {
	                if (isEmptyInputValue(control.value)) {
	                    return null; // don't validate empty values to allow optional controls
	                }
	                var /** @type {?} */ length = control.value ? control.value.length : 0;
	                return length < minLength ?
	                    { 'minlength': { 'requiredLength': minLength, 'actualLength': length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires controls to have a value of a maximum length.
	         * @param {?} maxLength
	         * @return {?}
	         */
	        Validators.maxLength = function (maxLength) {
	            return function (control) {
	                var /** @type {?} */ length = control.value ? control.value.length : 0;
	                return length > maxLength ?
	                    { 'maxlength': { 'requiredLength': maxLength, 'actualLength': length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires a control to match a regex to its value.
	         * @param {?} pattern
	         * @return {?}
	         */
	        Validators.pattern = function (pattern) {
	            if (!pattern)
	                return Validators.nullValidator;
	            var /** @type {?} */ regex;
	            var /** @type {?} */ regexStr;
	            if (typeof pattern === 'string') {
	                regexStr = "^" + pattern + "$";
	                regex = new RegExp(regexStr);
	            }
	            else {
	                regexStr = pattern.toString();
	                regex = pattern;
	            }
	            return function (control) {
	                if (isEmptyInputValue(control.value)) {
	                    return null; // don't validate empty values to allow optional controls
	                }
	                var /** @type {?} */ value = control.value;
	                return regex.test(value) ? null :
	                    { 'pattern': { 'requiredPattern': regexStr, 'actualValue': value } };
	            };
	        };
	        /**
	         * No-op validator.
	         * @param {?} c
	         * @return {?}
	         */
	        Validators.nullValidator = function (c) { return null; };
	        /**
	         * Compose multiple validators into a single function that returns the union
	         * of the individual error maps.
	         * @param {?} validators
	         * @return {?}
	         */
	        Validators.compose = function (validators) {
	            if (!validators)
	                return null;
	            var /** @type {?} */ presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                return _mergeErrors(_executeValidators(control, presentValidators));
	            };
	        };
	        /**
	         * @param {?} validators
	         * @return {?}
	         */
	        Validators.composeAsync = function (validators) {
	            if (!validators)
	                return null;
	            var /** @type {?} */ presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                var /** @type {?} */ promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
	                return Promise.all(promises).then(_mergeErrors);
	            };
	        };
	        return Validators;
	    }());
	    /**
	     * @param {?} obj
	     * @return {?}
	     */
	    function _convertToPromise(obj) {
	        return isPromise(obj) ? obj : rxjs_operator_toPromise.toPromise.call(obj);
	    }
	    /**
	     * @param {?} control
	     * @param {?} validators
	     * @return {?}
	     */
	    function _executeValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    /**
	     * @param {?} control
	     * @param {?} validators
	     * @return {?}
	     */
	    function _executeAsyncValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    /**
	     * @param {?} arrayOfErrors
	     * @return {?}
	     */
	    function _mergeErrors(arrayOfErrors) {
	        var /** @type {?} */ res = arrayOfErrors.reduce(function (res, errors) {
	            return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
	        }, {});
	        return Object.keys(res).length === 0 ? null : res;
	    }

	    /**
	     * Used to provide a {@link ControlValueAccessor} for form controls.
	     *
	     * See {@link DefaultValueAccessor} for how to implement one.
	     * @stable
	     */
	    var /** @type {?} */ NG_VALUE_ACCESSOR = new _angular_core.OpaqueToken('NgValueAccessor');

	    var /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return CheckboxControlValueAccessor; }),
	        multi: true,
	    };
	    /**
	     * The accessor for writing a value and listening to changes on a checkbox input element.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="checkbox" name="rememberLogin" ngModel>
	     *  ```
	     *
	     *  \@stable
	     */
	    var CheckboxControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function CheckboxControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.writeValue = function (value) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        CheckboxControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        CheckboxControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
	                        host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
	                        providers: [CHECKBOX_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        CheckboxControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return CheckboxControlValueAccessor;
	    }());

	    var /** @type {?} */ DEFAULT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return DefaultValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The default accessor for writing a value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="text" name="searchQuery" ngModel>
	     *  ```
	     *
	     *  \@stable
	     */
	    var DefaultValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function DefaultValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.writeValue = function (value) {
	            var /** @type {?} */ normalizedValue = value == null ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        DefaultValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        DefaultValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
	                        // TODO: vsavkin replace the above selector with the one below it once
	                        // https://github.com/angular/angular/issues/3011 is implemented
	                        // selector: '[ngControl],[ngModel],[ngFormControl]',
	                        host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [DEFAULT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        DefaultValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return DefaultValueAccessor;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function normalizeValidator(validator) {
	        if (((validator)).validate) {
	            return function (c) { return ((validator)).validate(c); };
	        }
	        else {
	            return (validator);
	        }
	    }
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function normalizeAsyncValidator(validator) {
	        if (((validator)).validate) {
	            return function (c) { return ((validator)).validate(c); };
	        }
	        else {
	            return (validator);
	        }
	    }

	    var /** @type {?} */ NUMBER_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return NumberValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a number value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="number" [(ngModel)]="age">
	     *  ```
	     */
	    var NumberValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function NumberValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.writeValue = function (value) {
	            // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
	            var /** @type {?} */ normalizedValue = value == null ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.registerOnChange = function (fn) {
	            this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        NumberValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        NumberValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
	                        host: {
	                            '(change)': 'onChange($event.target.value)',
	                            '(input)': 'onChange($event.target.value)',
	                            '(blur)': 'onTouched()'
	                        },
	                        providers: [NUMBER_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        NumberValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return NumberValueAccessor;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$2 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @return {?}
	     */
	    function unimplemented() {
	        throw new Error('unimplemented');
	    }
	    /**
	     * A base class that all control directive extend.
	     * It binds a {\@link FormControl} object to a DOM element.
	     *
	     * Used internally by Angular forms.
	     *
	     * \@stable
	     * @abstract
	     */
	    var NgControl = (function (_super) {
	        __extends$2(NgControl, _super);
	        function NgControl() {
	            _super.apply(this, arguments);
	            /** @internal */
	            this._parent = null;
	            this.name = null;
	            this.valueAccessor = null;
	            /** @internal */
	            this._rawValidators = [];
	            /** @internal */
	            this._rawAsyncValidators = [];
	        }
	        Object.defineProperty(NgControl.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return (unimplemented()); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgControl.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return (unimplemented()); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @abstract
	         * @param {?} newValue
	         * @return {?}
	         */
	        NgControl.prototype.viewToModelUpdate = function (newValue) { };
	        return NgControl;
	    }(AbstractControlDirective));

	    var /** @type {?} */ RADIO_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return RadioControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * Internal class used by Angular to uncheck radio buttons with the matching name.
	     */
	    var RadioControlRegistry = (function () {
	        function RadioControlRegistry() {
	            this._accessors = [];
	        }
	        /**
	         * @param {?} control
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.add = function (control, accessor) {
	            this._accessors.push([control, accessor]);
	        };
	        /**
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.remove = function (accessor) {
	            for (var /** @type {?} */ i = this._accessors.length - 1; i >= 0; --i) {
	                if (this._accessors[i][1] === accessor) {
	                    this._accessors.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        /**
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype.select = function (accessor) {
	            var _this = this;
	            this._accessors.forEach(function (c) {
	                if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
	                    c[1].fireUncheck(accessor.value);
	                }
	            });
	        };
	        /**
	         * @param {?} controlPair
	         * @param {?} accessor
	         * @return {?}
	         */
	        RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
	            if (!controlPair[0].control)
	                return false;
	            return controlPair[0]._parent === accessor._control._parent &&
	                controlPair[1].name === accessor.name;
	        };
	        RadioControlRegistry.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        RadioControlRegistry.ctorParameters = function () { return []; };
	        return RadioControlRegistry;
	    }());
	    /**
	     * \@whatItDoes Writes radio control values and listens to radio control changes.
	     *
	     * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
	     * to keep the view synced with the {\@link FormControl} model.
	     *
	     * \@howToUse
	     *
	     * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
	     * value accessor will be active on any radio control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use radio buttons with form directives
	     *
	     * To use radio buttons in a template-driven form, you'll want to ensure that radio buttons
	     * in the same group have the same `name` attribute.  Radio buttons with different `name`
	     * attributes do not affect each other.
	     *
	     * {\@example forms/ts/radioButtons/radio_button_example.ts region='TemplateDriven'}
	     *
	     * When using radio buttons in a reactive form, radio buttons in the same group should have the
	     * same `formControlName`. You can also add a `name` attribute, but it's optional.
	     *
	     * {\@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
	     *
	     *  * **npm package**: `\@angular/forms`
	     *
	     *  \@stable
	     */
	    var RadioControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         * @param {?} _registry
	         * @param {?} _injector
	         */
	        function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this._registry = _registry;
	            this._injector = _injector;
	            this.onChange = function () { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.ngOnInit = function () {
	            this._control = this._injector.get(NgControl);
	            this._checkName();
	            this._registry.add(this._control, this);
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.writeValue = function (value) {
	            this._state = value === this.value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', this._state);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this._fn = fn;
	            this.onChange = function () {
	                fn(_this.value);
	                _this._registry.select(_this);
	            };
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.fireUncheck = function (value) { this.writeValue(value); };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype._checkName = function () {
	            if (this.name && this.formControlName && this.name !== this.formControlName) {
	                this._throwNameError();
	            }
	            if (!this.name && this.formControlName)
	                this.name = this.formControlName;
	        };
	        /**
	         * @return {?}
	         */
	        RadioControlValueAccessor.prototype._throwNameError = function () {
	            throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
	        };
	        RadioControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
	                        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
	                        providers: [RADIO_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        RadioControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	            { type: RadioControlRegistry, },
	            { type: _angular_core.Injector, },
	        ]; };
	        RadioControlValueAccessor.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'formControlName': [{ type: _angular_core.Input },],
	            'value': [{ type: _angular_core.Input },],
	        };
	        return RadioControlValueAccessor;
	    }());

	    var /** @type {?} */ RANGE_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return RangeValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a range value and listening to changes that is used by the
	     * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="range" [(ngModel)]="age" >
	     *  ```
	     */
	    var RangeValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function RangeValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.writeValue = function (value) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.registerOnChange = function (fn) {
	            this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        RangeValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        RangeValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
	                        host: {
	                            '(change)': 'onChange($event.target.value)',
	                            '(input)': 'onChange($event.target.value)',
	                            '(blur)': 'onTouched()'
	                        },
	                        providers: [RANGE_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        RangeValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return RangeValueAccessor;
	    }());

	    var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * @param {?} id
	     * @param {?} value
	     * @return {?}
	     */
	    function _buildValueString(id, value) {
	        if (id == null)
	            return "" + value;
	        if (!isPrimitive(value))
	            value = 'Object';
	        return (id + ": " + value).slice(0, 50);
	    }
	    /**
	     * @param {?} valueString
	     * @return {?}
	     */
	    function _extractId(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * \@whatItDoes Writes values and listens to changes on a select element.
	     *
	     * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
	     * to keep the view synced with the {\@link FormControl} model.
	     *
	     * \@howToUse
	     *
	     * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
	     * value accessor will be active on any select control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use select controls with form directives
	     *
	     * To use a select in a template-driven form, simply add an `ngModel` and a `name`
	     * attribute to the main `<select>` tag.
	     *
	     * If your option values are simple strings, you can bind to the normal `value` property
	     * on the option.  If your option values happen to be objects (and you'd like to save the
	     * selection in your form as an object), use `ngValue` instead:
	     *
	     * {\@example forms/ts/selectControl/select_control_example.ts region='Component'}
	     *
	     * In reactive forms, you'll also want to add your form directive (`formControlName` or
	     * `formControl`) on the main `<select>` tag. Like in the former example, you have the
	     * choice of binding to the  `value` or `ngValue` property on the select's options.
	     *
	     * {\@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
	     *
	     * Note: We listen to the 'change' event because 'input' events aren't fired
	     * for selects in Firefox and IE:
	     * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
	     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var SelectControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function SelectControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.writeValue = function (value) {
	            this.value = value;
	            var /** @type {?} */ id = this._getOptionId(value);
	            if (id == null) {
	                this._renderer.setElementProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
	            }
	            var /** @type {?} */ valueString = _buildValueString(id, value);
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (valueString) {
	                _this.value = valueString;
	                fn(_this._getOptionValue(valueString));
	            };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id), value))
	                    return id;
	            }
	            return null;
	        };
	        /**
	         * \@internal
	         * @param {?} valueString
	         * @return {?}
	         */
	        SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var /** @type {?} */ id = _extractId(valueString);
	            return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
	        };
	        SelectControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
	                        host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return SelectControlValueAccessor;
	    }());
	    /**
	     * \@whatItDoes Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * \@howToUse
	     *
	     * See docs for {\@link SelectControlValueAccessor} for usage examples.
	     *
	     * \@stable
	     */
	    var NgSelectOption = (function () {
	        /**
	         * @param {?} _element
	         * @param {?} _renderer
	         * @param {?} _select
	         */
	        function NgSelectOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (this._select)
	                this.id = this._select._registerOption();
	        }
	        Object.defineProperty(NgSelectOption.prototype, "ngValue", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._select._optionMap.set(this.id, value);
	                this._setElementValue(_buildValueString(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectOption.prototype, "value", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                this._setElementValue(value);
	                if (this._select)
	                    this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        NgSelectOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        /**
	         * @return {?}
	         */
	        NgSelectOption.prototype.ngOnDestroy = function () {
	            if (this._select) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectOption.ctorParameters = function () { return [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ]; };
	        NgSelectOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectOption;
	    }());

	    var /** @type {?} */ SELECT_MULTIPLE_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectMultipleControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * @param {?} id
	     * @param {?} value
	     * @return {?}
	     */
	    function _buildValueString$1(id, value) {
	        if (id == null)
	            return "" + value;
	        if (typeof value === 'string')
	            value = "'" + value + "'";
	        if (!isPrimitive(value))
	            value = 'Object';
	        return (id + ": " + value).slice(0, 50);
	    }
	    /**
	     * @param {?} valueString
	     * @return {?}
	     */
	    function _extractId$1(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * The accessor for writing a value and listening to changes on a select element.
	     *
	     * \@stable
	     */
	    var SelectMultipleControlValueAccessor = (function () {
	        /**
	         * @param {?} _renderer
	         * @param {?} _elementRef
	         */
	        function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.writeValue = function (value) {
	            var _this = this;
	            this.value = value;
	            var /** @type {?} */ optionSelectedStateSetter;
	            if (Array.isArray(value)) {
	                // convert values to ids
	                var /** @type {?} */ ids_1 = value.map(function (v) { return _this._getOptionId(v); });
	                optionSelectedStateSetter = function (opt, o) { opt._setSelected(ids_1.indexOf(o.toString()) > -1); };
	            }
	            else {
	                optionSelectedStateSetter = function (opt, o) { opt._setSelected(false); };
	            }
	            this._optionMap.forEach(optionSelectedStateSetter);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (_) {
	                var /** @type {?} */ selected = [];
	                if (_.hasOwnProperty('selectedOptions')) {
	                    var /** @type {?} */ options = _.selectedOptions;
	                    for (var /** @type {?} */ i = 0; i < options.length; i++) {
	                        var /** @type {?} */ opt = options.item(i);
	                        var /** @type {?} */ val = _this._getOptionValue(opt.value);
	                        selected.push(val);
	                    }
	                }
	                else {
	                    var /** @type {?} */ options = (_.options);
	                    for (var /** @type {?} */ i = 0; i < options.length; i++) {
	                        var /** @type {?} */ opt = options.item(i);
	                        if (opt.selected) {
	                            var /** @type {?} */ val = _this._getOptionValue(opt.value);
	                            selected.push(val);
	                        }
	                    }
	                }
	                _this.value = selected;
	                fn(selected);
	            };
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        /**
	         * @param {?} isDisabled
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._registerOption = function (value) {
	            var /** @type {?} */ id = (this._idCounter++).toString();
	            this._optionMap.set(id, value);
	            return id;
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id)._value, value))
	                    return id;
	            }
	            return null;
	        };
	        /**
	         * \@internal
	         * @param {?} valueString
	         * @return {?}
	         */
	        SelectMultipleControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var /** @type {?} */ id = _extractId$1(valueString);
	            return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
	        };
	        SelectMultipleControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
	                        host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectMultipleControlValueAccessor.ctorParameters = function () { return [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ]; };
	        return SelectMultipleControlValueAccessor;
	    }());
	    /**
	     * Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * ### Example
	     *
	     * ```
	     * <select multiple name="city" ngModel>
	     *   <option *ngFor="let c of cities" [value]="c"></option>
	     * </select>
	     * ```
	     */
	    var NgSelectMultipleOption = (function () {
	        /**
	         * @param {?} _element
	         * @param {?} _renderer
	         * @param {?} _select
	         */
	        function NgSelectMultipleOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (this._select) {
	                this.id = this._select._registerOption(this);
	            }
	        }
	        Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._value = value;
	                this._setElementValue(_buildValueString$1(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                if (this._select) {
	                    this._value = value;
	                    this._setElementValue(_buildValueString$1(this.id, value));
	                    this._select.writeValue(this._select.value);
	                }
	                else {
	                    this._setElementValue(value);
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        /**
	         * \@internal
	         * @param {?} selected
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype._setSelected = function (selected) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'selected', selected);
	        };
	        /**
	         * @return {?}
	         */
	        NgSelectMultipleOption.prototype.ngOnDestroy = function () {
	            if (this._select) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectMultipleOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectMultipleOption.ctorParameters = function () { return [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectMultipleControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ]; };
	        NgSelectMultipleOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectMultipleOption;
	    }());

	    /**
	     * @param {?} name
	     * @param {?} parent
	     * @return {?}
	     */
	    function controlPath(name, parent) {
	        return parent.path.concat([name]);
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function setUpControl(control, dir) {
	        if (!control)
	            _throwError(dir, 'Cannot find control with');
	        if (!dir.valueAccessor)
	            _throwError(dir, 'No value accessor for form control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	        dir.valueAccessor.writeValue(control.value);
	        // view -> model
	        dir.valueAccessor.registerOnChange(function (newValue) {
	            dir.viewToModelUpdate(newValue);
	            control.markAsDirty();
	            control.setValue(newValue, { emitModelToViewChange: false });
	        });
	        // touched
	        dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
	        control.registerOnChange(function (newValue, emitModelEvent) {
	            // control -> view
	            dir.valueAccessor.writeValue(newValue);
	            // control -> ngModel
	            if (emitModelEvent)
	                dir.viewToModelUpdate(newValue);
	        });
	        if (dir.valueAccessor.setDisabledState) {
	            control.registerOnDisabledChange(function (isDisabled) { dir.valueAccessor.setDisabledState(isDisabled); });
	        }
	        // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
	        dir._rawValidators.forEach(function (validator) {
	            if (((validator)).registerOnValidatorChange)
	                ((validator)).registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	        dir._rawAsyncValidators.forEach(function (validator) {
	            if (((validator)).registerOnValidatorChange)
	                ((validator)).registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function cleanUpControl(control, dir) {
	        dir.valueAccessor.registerOnChange(function () { return _noControlError(dir); });
	        dir.valueAccessor.registerOnTouched(function () { return _noControlError(dir); });
	        dir._rawValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange) {
	                validator.registerOnValidatorChange(null);
	            }
	        });
	        dir._rawAsyncValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange) {
	                validator.registerOnValidatorChange(null);
	            }
	        });
	        if (control)
	            control._clearChangeFns();
	    }
	    /**
	     * @param {?} control
	     * @param {?} dir
	     * @return {?}
	     */
	    function setUpFormContainer(control, dir) {
	        if (isBlank(control))
	            _throwError(dir, 'Cannot find control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	    }
	    /**
	     * @param {?} dir
	     * @return {?}
	     */
	    function _noControlError(dir) {
	        return _throwError(dir, 'There is no FormControl instance attached to form control element with');
	    }
	    /**
	     * @param {?} dir
	     * @param {?} message
	     * @return {?}
	     */
	    function _throwError(dir, message) {
	        var /** @type {?} */ messageEnd;
	        if (dir.path.length > 1) {
	            messageEnd = "path: '" + dir.path.join(' -> ') + "'";
	        }
	        else if (dir.path[0]) {
	            messageEnd = "name: '" + dir.path + "'";
	        }
	        else {
	            messageEnd = 'unspecified name attribute';
	        }
	        throw new Error(message + " " + messageEnd);
	    }
	    /**
	     * @param {?} validators
	     * @return {?}
	     */
	    function composeValidators(validators) {
	        return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
	    }
	    /**
	     * @param {?} validators
	     * @return {?}
	     */
	    function composeAsyncValidators(validators) {
	        return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
	            null;
	    }
	    /**
	     * @param {?} changes
	     * @param {?} viewModel
	     * @return {?}
	     */
	    function isPropertyUpdated(changes, viewModel) {
	        if (!changes.hasOwnProperty('model'))
	            return false;
	        var /** @type {?} */ change = changes['model'];
	        if (change.isFirstChange())
	            return true;
	        return !looseIdentical(viewModel, change.currentValue);
	    }
	    var /** @type {?} */ BUILTIN_ACCESSORS = [
	        CheckboxControlValueAccessor,
	        RangeValueAccessor,
	        NumberValueAccessor,
	        SelectControlValueAccessor,
	        SelectMultipleControlValueAccessor,
	        RadioControlValueAccessor,
	    ];
	    /**
	     * @param {?} valueAccessor
	     * @return {?}
	     */
	    function isBuiltInAccessor(valueAccessor) {
	        return BUILTIN_ACCESSORS.some(function (a) { return valueAccessor.constructor === a; });
	    }
	    /**
	     * @param {?} dir
	     * @param {?} valueAccessors
	     * @return {?}
	     */
	    function selectValueAccessor(dir, valueAccessors) {
	        if (!valueAccessors)
	            return null;
	        var /** @type {?} */ defaultAccessor;
	        var /** @type {?} */ builtinAccessor;
	        var /** @type {?} */ customAccessor;
	        valueAccessors.forEach(function (v) {
	            if (v.constructor === DefaultValueAccessor) {
	                defaultAccessor = v;
	            }
	            else if (isBuiltInAccessor(v)) {
	                if (builtinAccessor)
	                    _throwError(dir, 'More than one built-in value accessor matches form control with');
	                builtinAccessor = v;
	            }
	            else {
	                if (customAccessor)
	                    _throwError(dir, 'More than one custom value accessor matches form control with');
	                customAccessor = v;
	            }
	        });
	        if (customAccessor)
	            return customAccessor;
	        if (builtinAccessor)
	            return builtinAccessor;
	        if (defaultAccessor)
	            return defaultAccessor;
	        _throwError(dir, 'No valid value accessor for form control with');
	        return null;
	    }

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * This is a base class for code shared between {\@link NgModelGroup} and {\@link FormGroupName}.
	     *
	     * \@stable
	     */
	    var AbstractFormGroupDirective = (function (_super) {
	        __extends(AbstractFormGroupDirective, _super);
	        function AbstractFormGroupDirective() {
	            _super.apply(this, arguments);
	        }
	        /**
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormGroup(this);
	        };
	        /**
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormGroup(this);
	            }
	        };
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
	            /**
	             * Get the {\@link FormGroup} backing this binding.
	             * @return {?}
	             */
	            get: function () { return this.formDirective.getFormGroup(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
	            /**
	             * Get the path to this control group.
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
	            /**
	             * Get the {\@link Form} to which this group belongs.
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractFormGroupDirective.prototype._checkParentType = function () { };
	        return AbstractFormGroupDirective;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$3 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var AbstractControlStatus = (function () {
	        /**
	         * @param {?} cd
	         */
	        function AbstractControlStatus(cd) {
	            this._cd = cd;
	        }
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.untouched : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.touched : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.pristine : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.dirty : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.valid : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.invalid : false; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._cd.control ? this._cd.control.pending : false; },
	            enumerable: true,
	            configurable: true
	        });
	        return AbstractControlStatus;
	    }());
	    var /** @type {?} */ ngControlStatusHost = {
	        '[class.ng-untouched]': 'ngClassUntouched',
	        '[class.ng-touched]': 'ngClassTouched',
	        '[class.ng-pristine]': 'ngClassPristine',
	        '[class.ng-dirty]': 'ngClassDirty',
	        '[class.ng-valid]': 'ngClassValid',
	        '[class.ng-invalid]': 'ngClassInvalid',
	        '[class.ng-pending]': 'ngClassPending',
	    };
	    /**
	     * Directive automatically applied to Angular form controls that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * \@stable
	     */
	    var NgControlStatus = (function (_super) {
	        __extends$3(NgControlStatus, _super);
	        /**
	         * @param {?} cd
	         */
	        function NgControlStatus(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatus.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
	        ];
	        /** @nocollapse */
	        NgControlStatus.ctorParameters = function () { return [
	            { type: NgControl, decorators: [{ type: _angular_core.Self },] },
	        ]; };
	        return NgControlStatus;
	    }(AbstractControlStatus));
	    /**
	     * Directive automatically applied to Angular form groups that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * \@stable
	     */
	    var NgControlStatusGroup = (function (_super) {
	        __extends$3(NgControlStatusGroup, _super);
	        /**
	         * @param {?} cd
	         */
	        function NgControlStatusGroup(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatusGroup.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
	                        host: ngControlStatusHost
	                    },] },
	        ];
	        /** @nocollapse */
	        NgControlStatusGroup.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Self },] },
	        ]; };
	        return NgControlStatusGroup;
	    }(AbstractControlStatus));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$5 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Use by directives and components to emit custom Events.
	     *
	     * ### Examples
	     *
	     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	     * title gets clicked:
	     *
	     * ```
	     * \@Component({
	     *   selector: 'zippy',
	     *   template: `
	     *   <div class="zippy">
	     *     <div (click)="toggle()">Toggle</div>
	     *     <div [hidden]="!visible">
	     *       <ng-content></ng-content>
	     *     </div>
	     *  </div>`})
	     * export class Zippy {
	     *   visible: boolean = true;
	     *   \@Output() open: EventEmitter<any> = new EventEmitter();
	     *   \@Output() close: EventEmitter<any> = new EventEmitter();
	     *
	     *   toggle() {
	     *     this.visible = !this.visible;
	     *     if (this.visible) {
	     *       this.open.emit(null);
	     *     } else {
	     *       this.close.emit(null);
	     *     }
	     *   }
	     * }
	     * ```
	     *
	     * The events payload can be accessed by the parameter `$event` on the components output event
	     * handler:
	     *
	     * ```
	     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	     * ```
	     *
	     * Uses Rx.Observable but provides an adapter to make it work as specified here:
	     * https://github.com/jhusain/observable-spec
	     *
	     * Once a reference implementation of the spec is available, switch to it.
	     * \@stable
	     */
	    var EventEmitter = (function (_super) {
	        __extends$5(EventEmitter, _super);
	        /**
	         * Creates an instance of [EventEmitter], which depending on [isAsync],
	         * delivers events synchronously or asynchronously.
	         * @param {?=} isAsync
	         */
	        function EventEmitter(isAsync) {
	            if (isAsync === void 0) { isAsync = false; }
	            _super.call(this);
	            this.__isAsync = isAsync;
	        }
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	        /**
	         * @param {?=} generatorOrNext
	         * @param {?=} error
	         * @param {?=} complete
	         * @return {?}
	         */
	        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	            var /** @type {?} */ schedulerFn;
	            var /** @type {?} */ errorFn = function (err) { return null; };
	            var /** @type {?} */ completeFn = function () { return null; };
	            if (generatorOrNext && typeof generatorOrNext === 'object') {
	                schedulerFn = this.__isAsync ? function (value) {
	                    setTimeout(function () { return generatorOrNext.next(value); });
	                } : function (value) { generatorOrNext.next(value); };
	                if (generatorOrNext.error) {
	                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                        function (err) { generatorOrNext.error(err); };
	                }
	                if (generatorOrNext.complete) {
	                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                        function () { generatorOrNext.complete(); };
	                }
	            }
	            else {
	                schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
	                    function (value) { generatorOrNext(value); };
	                if (error) {
	                    errorFn =
	                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	                }
	                if (complete) {
	                    completeFn =
	                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	                }
	            }
	            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	        };
	        return EventEmitter;
	    }(rxjs_Subject.Subject));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$6 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
	     */
	    var /** @type {?} */ VALID = 'VALID';
	    /**
	     * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
	     */
	    var /** @type {?} */ INVALID = 'INVALID';
	    /**
	     * Indicates that a FormControl is pending, i.e. that async validation is occurring and
	     * errors are not yet available for the input value.
	     */
	    var /** @type {?} */ PENDING = 'PENDING';
	    /**
	     * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
	     * calculations of validity or value.
	     */
	    var /** @type {?} */ DISABLED = 'DISABLED';
	    /**
	     * @param {?} control
	     * @param {?} path
	     * @param {?} delimiter
	     * @return {?}
	     */
	    function _find(control, path, delimiter) {
	        if (path == null)
	            return null;
	        if (!(path instanceof Array)) {
	            path = ((path)).split(delimiter);
	        }
	        if (path instanceof Array && (path.length === 0))
	            return null;
	        return ((path)).reduce(function (v, name) {
	            if (v instanceof FormGroup) {
	                return v.controls[name] || null;
	            }
	            if (v instanceof FormArray) {
	                return v.at(/** @type {?} */ (name)) || null;
	            }
	            return null;
	        }, control);
	    }
	    /**
	     * @param {?} r
	     * @return {?}
	     */
	    function toObservable(r) {
	        return isPromise(r) ? rxjs_observable_fromPromise.fromPromise(r) : r;
	    }
	    /**
	     * @param {?} validator
	     * @return {?}
	     */
	    function coerceToValidator(validator) {
	        return Array.isArray(validator) ? composeValidators(validator) : validator;
	    }
	    /**
	     * @param {?} asyncValidator
	     * @return {?}
	     */
	    function coerceToAsyncValidator(asyncValidator) {
	        return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator;
	    }
	    /**
	     * \@whatItDoes This is the base class for {\@link FormControl}, {\@link FormGroup}, and
	     * {\@link FormArray}.
	     *
	     * It provides some of the shared behavior that all controls and groups of controls have, like
	     * running validators, calculating status, and resetting state. It also defines the properties
	     * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
	     * instantiated directly.
	     *
	     * \@stable
	     * @abstract
	     */
	    var AbstractControl = (function () {
	        /**
	         * @param {?} validator
	         * @param {?} asyncValidator
	         */
	        function AbstractControl(validator, asyncValidator) {
	            this.validator = validator;
	            this.asyncValidator = asyncValidator;
	            /** @internal */
	            this._onCollectionChange = function () { };
	            this._pristine = true;
	            this._touched = false;
	            /** @internal */
	            this._onDisabledChange = [];
	        }
	        Object.defineProperty(AbstractControl.prototype, "value", {
	            /**
	             * The value of the control.
	             * @return {?}
	             */
	            get: function () { return this._value; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "parent", {
	            /**
	             * The parent control.
	             * @return {?}
	             */
	            get: function () { return this._parent; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "status", {
	            /**
	             * The validation status of the control. There are four possible
	             * validation statuses:
	             *
	             * * **VALID**:  control has passed all validation checks
	             * * **INVALID**: control has failed at least one validation check
	             * * **PENDING**: control is in the midst of conducting a validation check
	             * * **DISABLED**: control is exempt from validation checks
	             *
	             * These statuses are mutually exclusive, so a control cannot be
	             * both valid AND invalid or invalid AND disabled.
	             * @return {?}
	             */
	            get: function () { return this._status; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valid", {
	            /**
	             * A control is `valid` when its `status === VALID`.
	             *
	             * In order to have this status, the control must have passed all its
	             * validation checks.
	             * @return {?}
	             */
	            get: function () { return this._status === VALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "invalid", {
	            /**
	             * A control is `invalid` when its `status === INVALID`.
	             *
	             * In order to have this status, the control must have failed
	             * at least one of its validation checks.
	             * @return {?}
	             */
	            get: function () { return this._status === INVALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pending", {
	            /**
	             * A control is `pending` when its `status === PENDING`.
	             *
	             * In order to have this status, the control must be in the
	             * middle of conducting a validation check.
	             * @return {?}
	             */
	            get: function () { return this._status == PENDING; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "disabled", {
	            /**
	             * A control is `disabled` when its `status === DISABLED`.
	             *
	             * Disabled controls are exempt from validation checks and
	             * are not included in the aggregate value of their ancestor
	             * controls.
	             * @return {?}
	             */
	            get: function () { return this._status === DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "enabled", {
	            /**
	             * A control is `enabled` as long as its `status !== DISABLED`.
	             *
	             * In other words, it has a status of `VALID`, `INVALID`, or
	             * `PENDING`.
	             * @return {?}
	             */
	            get: function () { return this._status !== DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "errors", {
	            /**
	             * Returns any errors generated by failing validation. If there
	             * are no errors, it will return null.
	             * @return {?}
	             */
	            get: function () { return this._errors; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pristine", {
	            /**
	             * A control is `pristine` if the user has not yet changed
	             * the value in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             * @return {?}
	             */
	            get: function () { return this._pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "dirty", {
	            /**
	             * A control is `dirty` if the user has changed the value
	             * in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             * @return {?}
	             */
	            get: function () { return !this.pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "touched", {
	            /**
	             * A control is marked `touched` once the user has triggered
	             * a `blur` event on it.
	             * @return {?}
	             */
	            get: function () { return this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "untouched", {
	            /**
	             * A control is `untouched` if the user has not yet triggered
	             * a `blur` event on it.
	             * @return {?}
	             */
	            get: function () { return !this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valueChanges", {
	            /**
	             * Emits an event every time the value of the control changes, in
	             * the UI or programmatically.
	             * @return {?}
	             */
	            get: function () { return this._valueChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "statusChanges", {
	            /**
	             * Emits an event every time the validation status of the control
	             * is re-calculated.
	             * @return {?}
	             */
	            get: function () { return this._statusChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Sets the synchronous validators that are active on this control.  Calling
	         * this will overwrite any existing sync validators.
	         * @param {?} newValidator
	         * @return {?}
	         */
	        AbstractControl.prototype.setValidators = function (newValidator) {
	            this.validator = coerceToValidator(newValidator);
	        };
	        /**
	         * Sets the async validators that are active on this control. Calling this
	         * will overwrite any existing async validators.
	         * @param {?} newValidator
	         * @return {?}
	         */
	        AbstractControl.prototype.setAsyncValidators = function (newValidator) {
	            this.asyncValidator = coerceToAsyncValidator(newValidator);
	        };
	        /**
	         * Empties out the sync validator list.
	         * @return {?}
	         */
	        AbstractControl.prototype.clearValidators = function () { this.validator = null; };
	        /**
	         * Empties out the async validator list.
	         * @return {?}
	         */
	        AbstractControl.prototype.clearAsyncValidators = function () { this.asyncValidator = null; };
	        /**
	         * Marks the control as `touched`.
	         *
	         * This will also mark all direct ancestors as `touched` to maintain
	         * the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = true;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `untouched`.
	         *
	         * If the control has any children, it will also mark all children as `untouched`
	         * to maintain the model, and re-calculate the `touched` status of all parent
	         * controls.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsUntouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = false;
	            this._forEachChild(function (control) { control.markAsUntouched({ onlySelf: true }); });
	            if (this._parent && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `dirty`.
	         *
	         * This will also mark all direct ancestors as `dirty` to maintain
	         * the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsDirty = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = false;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsDirty({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pristine`.
	         *
	         * If the control has any children, it will also mark all children as `pristine`
	         * to maintain the model, and re-calculate the `pristine` status of all parent
	         * controls.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsPristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = true;
	            this._forEachChild(function (control) { control.markAsPristine({ onlySelf: true }); });
	            if (this._parent && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pending`.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.markAsPending = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._status = PENDING;
	            if (this._parent && !onlySelf) {
	                this._parent.markAsPending({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Disables the control. This means the control will be exempt from validation checks and
	         * excluded from the aggregate value of any parent. Its status is `DISABLED`.
	         *
	         * If the control has children, all children will be disabled to maintain the model.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.disable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._status = DISABLED;
	            this._errors = null;
	            this._forEachChild(function (control) { control.disable({ onlySelf: true }); });
	            this._updateValue();
	            if (emitEvent !== false) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(true); });
	        };
	        /**
	         * Enables the control. This means the control will be included in validation checks and
	         * the aggregate value of its parent. Its status is re-calculated based on its value and
	         * its validators.
	         *
	         * If the control has children, all children will be enabled.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.enable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._status = VALID;
	            this._forEachChild(function (control) { control.enable({ onlySelf: true }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(false); });
	        };
	        /**
	         * @param {?} onlySelf
	         * @return {?}
	         */
	        AbstractControl.prototype._updateAncestors = function (onlySelf) {
	            if (this._parent && !onlySelf) {
	                this._parent.updateValueAndValidity();
	                this._parent._updatePristine();
	                this._parent._updateTouched();
	            }
	        };
	        /**
	         * @param {?} parent
	         * @return {?}
	         */
	        AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
	        /**
	         * Sets the value of the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.setValue = function (value, options) { };
	        /**
	         * Patches the value of the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.patchValue = function (value, options) { };
	        /**
	         * Resets the control. Abstract method (implemented in sub-classes).
	         * @abstract
	         * @param {?=} value
	         * @param {?=} options
	         * @return {?}
	         */
	        AbstractControl.prototype.reset = function (value, options) { };
	        /**
	         * Re-calculates the value and validation status of the control.
	         *
	         * By default, it will also update the value and validity of its ancestors.
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype.updateValueAndValidity = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._setInitialStatus();
	            this._updateValue();
	            if (this.enabled) {
	                this._errors = this._runValidator();
	                this._status = this._calculateStatus();
	                if (this._status === VALID || this._status === PENDING) {
	                    this._runAsyncValidator(emitEvent);
	                }
	            }
	            if (emitEvent !== false) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            if (this._parent && !onlySelf) {
	                this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updateTreeValidity = function (_a) {
	            var emitEvent = (_a === void 0 ? { emitEvent: true } : _a).emitEvent;
	            this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity({ emitEvent: emitEvent }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._setInitialStatus = function () { this._status = this._allControlsDisabled() ? DISABLED : VALID; };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._runValidator = function () {
	            return this.validator ? this.validator(this) : null;
	        };
	        /**
	         * @param {?} emitEvent
	         * @return {?}
	         */
	        AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
	            var _this = this;
	            if (this.asyncValidator) {
	                this._status = PENDING;
	                this._cancelExistingSubscription();
	                var /** @type {?} */ obs = toObservable(this.asyncValidator(this));
	                if (!(isObservable(obs))) {
	                    throw new Error("expected the following validator to return Promise or Observable: " + this.asyncValidator + ". If you are using FormBuilder; did you forget to brace your validators in an array?");
	                }
	                this._asyncValidationSubscription =
	                    obs.subscribe({ next: function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); } });
	            }
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._cancelExistingSubscription = function () {
	            if (this._asyncValidationSubscription) {
	                this._asyncValidationSubscription.unsubscribe();
	            }
	        };
	        /**
	         * Sets errors on a form control.
	         *
	         * This is used when validations are run manually by the user, rather than automatically.
	         *
	         * Calling `setErrors` will also update the validity of the parent control.
	         *
	         * ### Example
	         *
	         * ```
	         * const login = new FormControl("someLogin");
	         * login.setErrors({
	         *   "notUnique": true
	         * });
	         *
	         * expect(login.valid).toEqual(false);
	         * expect(login.errors).toEqual({"notUnique": true});
	         *
	         * login.setValue("someOtherLogin");
	         *
	         * expect(login.valid).toEqual(true);
	         * ```
	         * @param {?} errors
	         * @param {?=} __1
	         * @return {?}
	         */
	        AbstractControl.prototype.setErrors = function (errors, _a) {
	            var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
	            this._errors = errors;
	            this._updateControlsErrors(emitEvent !== false);
	        };
	        /**
	         * Retrieves a child control given the control's name or path.
	         *
	         * Paths can be passed in as an array or a string delimited by a dot.
	         *
	         * To get a control nested within a `person` sub-group:
	         *
	         * * `this.form.get('person.name');`
	         *
	         * -OR-
	         *
	         * * `this.form.get(['person', 'name']);`
	         * @param {?} path
	         * @return {?}
	         */
	        AbstractControl.prototype.get = function (path) { return _find(this, path, '.'); };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns null or undefined.
	         *
	         * If no path is given, it checks for the error on the present control.
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControl.prototype.getError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            var /** @type {?} */ control = path ? this.get(path) : this;
	            return control && control._errors ? control._errors[errorCode] : null;
	        };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns false.
	         *
	         * If no path is given, it checks for the error on the present control.
	         * @param {?} errorCode
	         * @param {?=} path
	         * @return {?}
	         */
	        AbstractControl.prototype.hasError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return !!this.getError(errorCode, path);
	        };
	        Object.defineProperty(AbstractControl.prototype, "root", {
	            /**
	             * Retrieves the top-level ancestor of this control.
	             * @return {?}
	             */
	            get: function () {
	                var /** @type {?} */ x = this;
	                while (x._parent) {
	                    x = x._parent;
	                }
	                return x;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * \@internal
	         * @param {?} emitEvent
	         * @return {?}
	         */
	        AbstractControl.prototype._updateControlsErrors = function (emitEvent) {
	            this._status = this._calculateStatus();
	            if (emitEvent) {
	                this._statusChanges.emit(this._status);
	            }
	            if (this._parent) {
	                this._parent._updateControlsErrors(emitEvent);
	            }
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._initObservables = function () {
	            this._valueChanges = new EventEmitter();
	            this._statusChanges = new EventEmitter();
	        };
	        /**
	         * @return {?}
	         */
	        AbstractControl.prototype._calculateStatus = function () {
	            if (this._allControlsDisabled())
	                return DISABLED;
	            if (this._errors)
	                return INVALID;
	            if (this._anyControlsHaveStatus(PENDING))
	                return PENDING;
	            if (this._anyControlsHaveStatus(INVALID))
	                return INVALID;
	            return VALID;
	        };
	        /**
	         * \@internal
	         * @abstract
	         * @return {?}
	         */
	        AbstractControl.prototype._updateValue = function () { };
	        /**
	         * \@internal
	         * @abstract
	         * @param {?} cb
	         * @return {?}
	         */
	        AbstractControl.prototype._forEachChild = function (cb) { };
	        /**
	         * \@internal
	         * @abstract
	         * @param {?} condition
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControls = function (condition) { };
	        /**
	         * \@internal
	         * @abstract
	         * @return {?}
	         */
	        AbstractControl.prototype._allControlsDisabled = function () { };
	        /**
	         * \@internal
	         * @param {?} status
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsHaveStatus = function (status) {
	            return this._anyControls(function (control) { return control.status === status; });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsDirty = function () {
	            return this._anyControls(function (control) { return control.dirty; });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        AbstractControl.prototype._anyControlsTouched = function () {
	            return this._anyControls(function (control) { return control.touched; });
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updatePristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = !this._anyControlsDirty();
	            if (this._parent && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?=} __0
	         * @return {?}
	         */
	        AbstractControl.prototype._updateTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = this._anyControlsTouched();
	            if (this._parent && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} formState
	         * @return {?}
	         */
	        AbstractControl.prototype._isBoxedValue = function (formState) {
	            return typeof formState === 'object' && formState !== null &&
	                Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
	        };
	        /**
	         * \@internal
	         * @param {?} fn
	         * @return {?}
	         */
	        AbstractControl.prototype._registerOnCollectionChange = function (fn) { this._onCollectionChange = fn; };
	        return AbstractControl;
	    }());
	    /**
	     * \@whatItDoes Tracks the value and validation status of an individual form control.
	     *
	     * It is one of the three fundamental building blocks of Angular forms, along with
	     * {\@link FormGroup} and {\@link FormArray}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormControl}, you can pass in an initial value as the
	     * first argument. Example:
	     *
	     * ```ts
	     * const ctrl = new FormControl('some value');
	     * console.log(ctrl.value);     // 'some value'
	     * ```
	     *
	     * You can also initialize the control with a form state object on instantiation,
	     * which includes both the value and whether or not the control is disabled.
	     * You can't use the value key without the disabled key; both are required
	     * to use this way of initialization.
	     *
	     * ```ts
	     * const ctrl = new FormControl({value: 'n/a', disabled: true});
	     * console.log(ctrl.value);     // 'n/a'
	     * console.log(ctrl.status);   // 'DISABLED'
	     * ```
	     *
	     * To include a sync validator (or an array of sync validators) with the control,
	     * pass it in as the second argument. Async validators are also supported, but
	     * have to be passed in separately as the third arg.
	     *
	     * ```ts
	     * const ctrl = new FormControl('', Validators.required);
	     * console.log(ctrl.value);     // ''
	     * console.log(ctrl.status);   // 'INVALID'
	     * ```
	     *
	     * See its superclass, {\@link AbstractControl}, for more properties and methods.
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormControl = (function (_super) {
	        __extends$6(FormControl, _super);
	        /**
	         * @param {?=} formState
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormControl(formState, validator, asyncValidator) {
	            if (formState === void 0) { formState = null; }
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, coerceToValidator(validator), coerceToAsyncValidator(asyncValidator));
	            /** @internal */
	            this._onChange = [];
	            this._applyFormState(formState);
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	            this._initObservables();
	        }
	        /**
	         * Set the value of the form control to `value`.
	         *
	         * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
	         * and not its parent component. This defaults to false.
	         *
	         * If `emitEvent` is `true`, this
	         * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
	         * to true (as it falls through to `updateValueAndValidity`).
	         *
	         * If `emitModelToViewChange` is `true`, the view will be notified about the new value
	         * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
	         * specified.
	         *
	         * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
	         * model.  This is the default behavior if `emitViewToModelChange` is not specified.
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormControl.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange, emitViewToModelChange = _b.emitViewToModelChange;
	            this._value = value;
	            if (this._onChange.length && emitModelToViewChange !== false) {
	                this._onChange.forEach(function (changeFn) { return changeFn(_this._value, emitViewToModelChange !== false); });
	            }
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Patches the value of a control.
	         *
	         * This function is functionally the same as {\@link FormControl.setValue} at this level.
	         * It exists for symmetry with {\@link FormGroup.patchValue} on `FormGroups` and `FormArrays`,
	         * where it does behave differently.
	         * @param {?} value
	         * @param {?=} options
	         * @return {?}
	         */
	        FormControl.prototype.patchValue = function (value, options) {
	            if (options === void 0) { options = {}; }
	            this.setValue(value, options);
	        };
	        /**
	         * Resets the form control. This means by default:
	         *
	         * * it is marked as `pristine`
	         * * it is marked as `untouched`
	         * * value is set to null
	         *
	         * You can also reset to a specific form state by passing through a standalone
	         * value or a form state object that contains both a value and a disabled state
	         * (these are the only two properties that cannot be calculated).
	         *
	         * Ex:
	         *
	         * ```ts
	         * this.control.reset('Nancy');
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * ```
	         *
	         * OR
	         *
	         * ```
	         * this.control.reset({value: 'Nancy', disabled: true});
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * console.log(this.control.status);  // 'DISABLED'
	         * ```
	         * @param {?=} formState
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormControl.prototype.reset = function (formState, _a) {
	            if (formState === void 0) { formState = null; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._applyFormState(formState);
	            this.markAsPristine({ onlySelf: onlySelf });
	            this.markAsUntouched({ onlySelf: onlySelf });
	            this.setValue(this._value, { onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._updateValue = function () { };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormControl.prototype._anyControls = function (condition) { return false; };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._allControlsDisabled = function () { return this.disabled; };
	        /**
	         * Register a listener for change events.
	         * @param {?} fn
	         * @return {?}
	         */
	        FormControl.prototype.registerOnChange = function (fn) { this._onChange.push(fn); };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormControl.prototype._clearChangeFns = function () {
	            this._onChange = [];
	            this._onDisabledChange = [];
	            this._onCollectionChange = function () { };
	        };
	        /**
	         * Register a listener for disabled events.
	         * @param {?} fn
	         * @return {?}
	         */
	        FormControl.prototype.registerOnDisabledChange = function (fn) {
	            this._onDisabledChange.push(fn);
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormControl.prototype._forEachChild = function (cb) { };
	        /**
	         * @param {?} formState
	         * @return {?}
	         */
	        FormControl.prototype._applyFormState = function (formState) {
	            if (this._isBoxedValue(formState)) {
	                this._value = formState.value;
	                formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
	                    this.enable({ onlySelf: true, emitEvent: false });
	            }
	            else {
	                this._value = formState;
	            }
	        };
	        return FormControl;
	    }(AbstractControl));
	    /**
	     * \@whatItDoes Tracks the value and validity state of a group of {\@link FormControl}
	     * instances.
	     *
	     * A `FormGroup` aggregates the values of each child {\@link FormControl} into one object,
	     * with each control name as the key.  It calculates its status by reducing the statuses
	     * of its children. For example, if one of the controls in a group is invalid, the entire
	     * group becomes invalid.
	     *
	     * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {\@link FormControl} and {\@link FormArray}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormGroup}, pass in a collection of child controls as the first
	     * argument. The key for each child will be the name under which it is registered.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   first: new FormControl('Nancy', Validators.minLength(2)),
	     *   last: new FormControl('Drew'),
	     * });
	     *
	     * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
	     * console.log(form.status);  // 'VALID'
	     * ```
	     *
	     * You can also include group-level validators as the second arg, or group-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   password: new FormControl('', Validators.minLength(2)),
	     *   passwordConfirm: new FormControl('', Validators.minLength(2)),
	     * }, passwordMatchValidator);
	     *
	     *
	     * function passwordMatchValidator(g: FormGroup) {
	     *    return g.get('password').value === g.get('passwordConfirm').value
	     *       ? null : {'mismatch': true};
	     * }
	     * ```
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormGroup = (function (_super) {
	        __extends$6(FormGroup, _super);
	        /**
	         * @param {?} controls
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormGroup(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Registers a control with the group's list of controls.
	         *
	         * This method does not update value or validity of the control, so for
	         * most cases you'll want to use {\@link FormGroup.addControl} instead.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.registerControl = function (name, control) {
	            if (this.controls[name])
	                return this.controls[name];
	            this.controls[name] = control;
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	            return control;
	        };
	        /**
	         * Add a control to this group.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.addControl = function (name, control) {
	            this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove a control from this group.
	         * @param {?} name
	         * @return {?}
	         */
	        FormGroup.prototype.removeControl = function (name) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         * @param {?} name
	         * @param {?} control
	         * @return {?}
	         */
	        FormGroup.prototype.setControl = function (name, control) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            if (control)
	                this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Check whether there is an enabled control with the given name in the group.
	         *
	         * It will return false for disabled controls. If you'd like to check for
	         * existence in the group only, use {\@link AbstractControl.get} instead.
	         * @param {?} controlName
	         * @return {?}
	         */
	        FormGroup.prototype.contains = function (controlName) {
	            return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
	        };
	        /**
	         *  Sets the value of the {\@link FormGroup}. It accepts an object that matches
	         *  the structure of the group, with control names as keys.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.setValue({first: 'Nancy', last: 'Drew'});
	         *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
	         *
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._checkAllValuesPresent(value);
	            Object.keys(value).forEach(function (name) {
	                _this._throwIfControlMissing(name);
	                _this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         *  Patches the value of the {\@link FormGroup}. It accepts an object with control
	         *  names as keys, and will do its best to match the values to the correct controls
	         *  in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the group without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.patchValue({first: 'Nancy'});
	         *  console.log(form.value);   // {first: 'Nancy', last: null}
	         *
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            Object.keys(value).forEach(function (name) {
	                if (_this.controls[name]) {
	                    _this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: emitEvent });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Resets the {\@link FormGroup}. This means by default:
	         *
	         * * The group and all descendants are marked `pristine`
	         * * The group and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in a map of states
	         * that matches the structure of your form, with control names as keys. The state
	         * can be a standalone value or a form state object with both a value and a disabled
	         * status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.form.reset({first: 'name', last: 'last name'});
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.form.reset({
	         *   first: {value: 'name', disabled: true},
	         *   last: 'last'
	         * });
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * console.log(this.form.get('first').status);  // 'DISABLED'
	         * ```
	         * @param {?=} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormGroup.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = {}; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._forEachChild(function (control, name) {
	                control.reset(value[name], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the {\@link FormGroup}, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the group.
	         * @return {?}
	         */
	        FormGroup.prototype.getRawValue = function () {
	            return this._reduceChildren({}, function (acc, control, name) {
	                acc[name] = control instanceof FormControl ? control.value : ((control)).getRawValue();
	                return acc;
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} name
	         * @return {?}
	         */
	        FormGroup.prototype._throwIfControlMissing = function (name) {
	            if (!Object.keys(this.controls).length) {
	                throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.controls[name]) {
	                throw new Error("Cannot find form control with name: " + name + ".");
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormGroup.prototype._forEachChild = function (cb) {
	            var _this = this;
	            Object.keys(this.controls).forEach(function (k) { return cb(_this.controls[k], k); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) {
	                control.setParent(_this);
	                control._registerOnCollectionChange(_this._onCollectionChange);
	            });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormGroup.prototype._anyControls = function (condition) {
	            var _this = this;
	            var /** @type {?} */ res = false;
	            this._forEachChild(function (control, name) {
	                res = res || (_this.contains(name) && condition(control));
	            });
	            return res;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._reduceValue = function () {
	            var _this = this;
	            return this._reduceChildren({}, function (acc, control, name) {
	                if (control.enabled || _this.disabled) {
	                    acc[name] = control.value;
	                }
	                return acc;
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} initValue
	         * @param {?} fn
	         * @return {?}
	         */
	        FormGroup.prototype._reduceChildren = function (initValue, fn) {
	            var /** @type {?} */ res = initValue;
	            this._forEachChild(function (control, name) { res = fn(res, control, name); });
	            return res;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroup.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
	                var controlName = _a[_i];
	                if (this.controls[controlName].enabled) {
	                    return false;
	                }
	            }
	            return Object.keys(this.controls).length > 0 || this.disabled;
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        FormGroup.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, name) {
	                if (value[name] === undefined) {
	                    throw new Error("Must supply a value for form control with name: '" + name + "'.");
	                }
	            });
	        };
	        return FormGroup;
	    }(AbstractControl));
	    /**
	     * \@whatItDoes Tracks the value and validity state of an array of {\@link FormControl},
	     * {\@link FormGroup} or {\@link FormArray} instances.
	     *
	     * A `FormArray` aggregates the values of each child {\@link FormControl} into an array.
	     * It calculates its status by reducing the statuses of its children. For example, if one of
	     * the controls in a `FormArray` is invalid, the entire array becomes invalid.
	     *
	     * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {\@link FormControl} and {\@link FormGroup}.
	     *
	     * \@howToUse
	     *
	     * When instantiating a {\@link FormArray}, pass in an array of child controls as the first
	     * argument.
	     *
	     * ### Example
	     *
	     * ```
	     * const arr = new FormArray([
	     *   new FormControl('Nancy', Validators.minLength(2)),
	     *   new FormControl('Drew'),
	     * ]);
	     *
	     * console.log(arr.value);   // ['Nancy', 'Drew']
	     * console.log(arr.status);  // 'VALID'
	     * ```
	     *
	     * You can also include array-level validators as the second arg, or array-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Adding or removing controls
	     *
	     * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
	     * in `FormArray` itself. These methods ensure the controls are properly tracked in the
	     * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
	     * the `FormArray` directly, as that will result in strange and unexpected behavior such
	     * as broken change detection.
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * \@stable
	     */
	    var FormArray = (function (_super) {
	        __extends$6(FormArray, _super);
	        /**
	         * @param {?} controls
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         */
	        function FormArray(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Get the {\@link AbstractControl} at the given `index` in the array.
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype.at = function (index) { return this.controls[index]; };
	        /**
	         * Insert a new {\@link AbstractControl} at the end of the array.
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.push = function (control) {
	            this.controls.push(control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Insert a new {\@link AbstractControl} at the given `index` in the array.
	         * @param {?} index
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.insert = function (index, control) {
	            this.controls.splice(index, 0, control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove the control at the given `index` in the array.
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype.removeAt = function (index) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            this.controls.splice(index, 1);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         * @param {?} index
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype.setControl = function (index, control) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            this.controls.splice(index, 1);
	            if (control) {
	                this.controls.splice(index, 0, control);
	                this._registerControl(control);
	            }
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        Object.defineProperty(FormArray.prototype, "length", {
	            /**
	             * Length of the control array.
	             * @return {?}
	             */
	            get: function () { return this.controls.length; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         *  Sets the value of the {\@link FormArray}. It accepts an array that matches
	         *  the structure of the control.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.setValue(['Nancy', 'Drew']);
	         *  console.log(arr.value);   // ['Nancy', 'Drew']
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._checkAllValuesPresent(value);
	            value.forEach(function (newValue, index) {
	                _this._throwIfControlMissing(index);
	                _this.at(index).setValue(newValue, { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         *  Patches the value of the {\@link FormArray}. It accepts an array that matches the
	         *  structure of the control, and will do its best to match the values to the correct
	         *  controls in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the array without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.patchValue(['Nancy']);
	         *  console.log(arr.value);   // ['Nancy', null]
	         *  ```
	         * @param {?} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            value.forEach(function (newValue, index) {
	                if (_this.at(index)) {
	                    _this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: emitEvent });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Resets the {\@link FormArray}. This means by default:
	         *
	         * * The array and all descendants are marked `pristine`
	         * * The array and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in an array of states
	         * that matches the structure of the control. The state can be a standalone value
	         * or a form state object with both a value and a disabled status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.arr.reset(['name', 'last name']);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.arr.reset([
	         *   {value: 'name', disabled: true},
	         *   'last'
	         * ]);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * console.log(this.arr.get(0).status);  // 'DISABLED'
	         * ```
	         * @param {?=} value
	         * @param {?=} __1
	         * @return {?}
	         */
	        FormArray.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = []; }
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._forEachChild(function (control, index) {
	                control.reset(value[index], { onlySelf: true, emitEvent: emitEvent });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the array, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the array.
	         * @return {?}
	         */
	        FormArray.prototype.getRawValue = function () {
	            return this.controls.map(function (control) {
	                return control instanceof FormControl ? control.value : ((control)).getRawValue();
	            });
	        };
	        /**
	         * \@internal
	         * @param {?} index
	         * @return {?}
	         */
	        FormArray.prototype._throwIfControlMissing = function (index) {
	            if (!this.controls.length) {
	                throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.at(index)) {
	                throw new Error("Cannot find form control at index " + index);
	            }
	        };
	        /**
	         * \@internal
	         * @param {?} cb
	         * @return {?}
	         */
	        FormArray.prototype._forEachChild = function (cb) {
	            this.controls.forEach(function (control, index) { cb(control, index); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._updateValue = function () {
	            var _this = this;
	            this._value = this.controls.filter(function (control) { return control.enabled || _this.disabled; })
	                .map(function (control) { return control.value; });
	        };
	        /**
	         * \@internal
	         * @param {?} condition
	         * @return {?}
	         */
	        FormArray.prototype._anyControls = function (condition) {
	            return this.controls.some(function (control) { return control.enabled && condition(control); });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) { return _this._registerControl(control); });
	        };
	        /**
	         * \@internal
	         * @param {?} value
	         * @return {?}
	         */
	        FormArray.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, i) {
	                if (value[i] === undefined) {
	                    throw new Error("Must supply a value for form control at index: " + i + ".");
	                }
	            });
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormArray.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
	                var control = _a[_i];
	                if (control.enabled)
	                    return false;
	            }
	            return this.controls.length > 0 || this.disabled;
	        };
	        /**
	         * @param {?} control
	         * @return {?}
	         */
	        FormArray.prototype._registerControl = function (control) {
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	        };
	        return FormArray;
	    }(AbstractControl));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$4 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formDirectiveProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgForm; })
	    };
	    var /** @type {?} */ resolvedPromise = Promise.resolve(null);
	    /**
	     * \@whatItDoes Creates a top-level {\@link FormGroup} instance and binds it to a form
	     * to track aggregate form value and validation status.
	     *
	     * \@howToUse
	     *
	     * As soon as you import the `FormsModule`, this directive becomes active by default on
	     * all `<form>` tags.  You don't need to add a special selector.
	     *
	     * You can export the directive into a local template variable using `ngForm` as the key
	     * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
	     * {\@link FormGroup} instance are duplicated on the directive itself, so a reference to it
	     * will give you access to the aggregate value and validity status of the form, as well as
	     * user interaction properties like `dirty` and `touched`.
	     *
	     * To register child controls with the form, you'll want to use {\@link NgModel} with a
	     * `name` attribute.  You can also use {\@link NgModelGroup} if you'd like to create
	     * sub-groups within the form.
	     *
	     * You can listen to the directive's `ngSubmit` event to be notified when the user has
	     * triggered a form submission. The `ngSubmit` event will be emitted with the original form
	     * submission event.
	     *
	     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     *  \@stable
	     */
	    var NgForm = (function (_super) {
	        __extends$4(NgForm, _super);
	        /**
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function NgForm(validators, asyncValidators) {
	            _super.call(this);
	            this._submitted = false;
	            this.ngSubmit = new EventEmitter();
	            this.form =
	                new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
	        }
	        Object.defineProperty(NgForm.prototype, "submitted", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "controls", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form.controls; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.addControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                dir._control = (container.registerControl(dir.name, dir.control));
	                setUpControl(dir.control, dir);
	                dir.control.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.getControl = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.removeControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                if (container) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.addFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                var /** @type {?} */ group = new FormGroup({});
	                setUpFormContainer(group, dir);
	                container.registerControl(dir.name, group);
	                group.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.removeFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ container = _this._findContainer(dir.path);
	                if (container) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        NgForm.prototype.getFormGroup = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @param {?} value
	         * @return {?}
	         */
	        NgForm.prototype.updateModel = function (dir, value) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var /** @type {?} */ ctrl = (_this.form.get(dir.path));
	                ctrl.setValue(value);
	            });
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NgForm.prototype.setValue = function (value) { this.control.setValue(value); };
	        /**
	         * @param {?} $event
	         * @return {?}
	         */
	        NgForm.prototype.onSubmit = function ($event) {
	            this._submitted = true;
	            this.ngSubmit.emit($event);
	            return false;
	        };
	        /**
	         * @return {?}
	         */
	        NgForm.prototype.onReset = function () { this.resetForm(); };
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        NgForm.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /**
	         * \@internal
	         * @param {?} path
	         * @return {?}
	         */
	        NgForm.prototype._findContainer = function (path) {
	            path.pop();
	            return path.length ? (this.form.get(path)) : this.form;
	        };
	        NgForm.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
	                        providers: [formDirectiveProvider],
	                        host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
	                        outputs: ['ngSubmit'],
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgForm.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        return NgForm;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var /** @type {?} */ Examples = {
	        formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
	        formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
	        formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; let i=index\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
	        ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
	        ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
	    };

	    var TemplateDrivenErrors = (function () {
	        function TemplateDrivenErrors() {
	        }
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.modelParentException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + Examples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + Examples.ngModelWithFormGroup);
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.formGroupNameException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.missingNameException = function () {
	            throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
	        };
	        /**
	         * @return {?}
	         */
	        TemplateDrivenErrors.modelGroupParentException = function () {
	            throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        return TemplateDrivenErrors;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$8 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ modelGroupProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgModelGroup; })
	    };
	    /**
	     * \@whatItDoes Creates and binds a {\@link FormGroup} instance to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive can only be used as a child of {\@link NgForm} (or in other words,
	     * within `<form>` tags).
	     *
	     * Use this directive if you'd like to create a sub-group within a form. This can
	     * come in handy if you want to validate a sub-group of your form separately from
	     * the rest of your form, or if some values in your domain model make more sense to
	     * consume together in a nested object.
	     *
	     * Pass in the name you'd like this sub-group to have and it will become the key
	     * for the sub-group in the form's full value. You can also export the directive into
	     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
	     *
	     * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     * \@stable
	     */
	    var NgModelGroup = (function (_super) {
	        __extends$8(NgModelGroup, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function NgModelGroup(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * \@internal
	         * @return {?}
	         */
	        NgModelGroup.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelGroupParentException();
	            }
	        };
	        NgModelGroup.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
	        ];
	        /** @nocollapse */
	        NgModelGroup.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        NgModelGroup.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['ngModelGroup',] },],
	        };
	        return NgModelGroup;
	    }(AbstractFormGroupDirective));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$7 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formControlBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return NgModel; })
	    };
	    /**
	     * `ngModel` forces an additional change detection run when its inputs change:
	     * E.g.:
	     * ```
	     * <div>{{myModel.valid}}</div>
	     * <input [(ngModel)]="myValue" #myModel="ngModel">
	     * ```
	     * I.e. `ngModel` can export itself on the element and then be used in the template.
	     * Normally, this would result in expressions before the `input` that use the exported directive
	     * to have and old value as they have been
	     * dirty checked before. As this is a very common case for `ngModel`, we added this second change
	     * detection run.
	     *
	     * Notes:
	     * - this is just one extra run no matter how many `ngModel` have been changed.
	     * - this is a general problem when using `exportAs` for directives!
	     */
	    var /** @type {?} */ resolvedPromise$1 = Promise.resolve(null);
	    /**
	     * \@whatItDoes Creates a {\@link FormControl} instance from a domain model and binds it
	     * to a form control element.
	     *
	     * The {\@link FormControl} instance will track the value, user interaction, and
	     * validation status of the control and keep the view synced with the model. If used
	     * within a parent form, the directive will also register itself with the form as a child
	     * control.
	     *
	     * \@howToUse
	     *
	     * This directive can be used by itself or as part of a larger form. All you need is the
	     * `ngModel` selector to activate it.
	     *
	     * It accepts a domain model as an optional {\@link \@Input}. If you have a one-way binding
	     * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
	     * class will set the value in the view. If you have a two-way binding with `[()]` syntax
	     * (also known as 'banana-box syntax'), the value in the UI will always be synced back to
	     * the domain model in your class as well.
	     *
	     * If you wish to inspect the properties of the associated {\@link FormControl} (like
	     * validity state), you can also export the directive into a local template variable using
	     * `ngModel` as the key (ex: `#myVar="ngModel"`). You can then access the control using the
	     * directive's `control` property, but most properties you'll need (like `valid` and `dirty`)
	     * will fall through to the control anyway, so you can access them directly. You can see a
	     * full list of properties directly available in {\@link AbstractControlDirective}.
	     *
	     * The following is an example of a simple standalone control using `ngModel`:
	     *
	     * {\@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
	     *
	     * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
	     * so that the control can be registered with the parent form under that name.
	     *
	     * It's worth noting that in the context of a parent form, you often can skip one-way or
	     * two-way binding because the parent form will sync the value for you. You can access
	     * its properties by exporting it into a local template variable using `ngForm` (ex:
	     * `#f="ngForm"`). Then you can pass it where it needs to go on submit.
	     *
	     * If you do need to populate initial values into your form, using a one-way binding for
	     * `ngModel` tends to be sufficient as long as you use the exported form's value rather
	     * than the domain model's value on submit.
	     *
	     * Take a look at an example of using `ngModel` within a form:
	     *
	     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * To see `ngModel` examples with different form control types, see:
	     *
	     * * Radio buttons: {\@link RadioControlValueAccessor}
	     * * Selects: {\@link SelectControlValueAccessor}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: `FormsModule`
	     *
	     *  \@stable
	     */
	    var NgModel = (function (_super) {
	        __extends$7(NgModel, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function NgModel(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            /** @internal */
	            this._control = new FormControl();
	            /** @internal */
	            this._registered = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        NgModel.prototype.ngOnChanges = function (changes) {
	            this._checkForErrors();
	            if (!this._registered)
	                this._setUpControl();
	            if ('isDisabled' in changes) {
	                this._updateDisabled(changes);
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this._updateValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
	        Object.defineProperty(NgModel.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return this._parent ? controlPath(this.name, this._parent) : [this.name];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        NgModel.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._setUpControl = function () {
	            this._isStandalone() ? this._setUpStandalone() :
	                this.formDirective.addControl(this);
	            this._registered = true;
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._isStandalone = function () {
	            return !this._parent || (this.options && this.options.standalone);
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._setUpStandalone = function () {
	            setUpControl(this._control, this);
	            this._control.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkForErrors = function () {
	            if (!this._isStandalone()) {
	                this._checkParentType();
	            }
	            this._checkName();
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                TemplateDrivenErrors.formGroupNameException();
	            }
	            else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelParentException();
	            }
	        };
	        /**
	         * @return {?}
	         */
	        NgModel.prototype._checkName = function () {
	            if (this.options && this.options.name)
	                this.name = this.options.name;
	            if (!this._isStandalone() && !this.name) {
	                TemplateDrivenErrors.missingNameException();
	            }
	        };
	        /**
	         * @param {?} value
	         * @return {?}
	         */
	        NgModel.prototype._updateValue = function (value) {
	            var _this = this;
	            resolvedPromise$1.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
	        };
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        NgModel.prototype._updateDisabled = function (changes) {
	            var _this = this;
	            var /** @type {?} */ disabledValue = changes['isDisabled'].currentValue;
	            var /** @type {?} */ isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
	            resolvedPromise$1.then(function () {
	                if (isDisabled && !_this.control.disabled) {
	                    _this.control.disable();
	                }
	                else if (!isDisabled && _this.control.disabled) {
	                    _this.control.enable();
	                }
	            });
	        };
	        NgModel.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[ngModel]:not([formControlName]):not([formControl])',
	                        providers: [formControlBinding],
	                        exportAs: 'ngModel'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgModel.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        NgModel.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'options': [{ type: _angular_core.Input, args: ['ngModelOptions',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	        };
	        return NgModel;
	    }(NgControl));

	    var ReactiveErrors = (function () {
	        function ReactiveErrors() {
	        }
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.controlParentException = function () {
	            throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formControlName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.ngModelGroupException = function () {
	            throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + Examples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + Examples.ngModelGroup);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.missingFormException = function () {
	            throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + Examples.formControlName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.groupParentException = function () {
	            throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formGroupName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.arrayParentException = function () {
	            throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + Examples.formArrayName);
	        };
	        /**
	         * @return {?}
	         */
	        ReactiveErrors.disabledAttrWarning = function () {
	            console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
	        };
	        return ReactiveErrors;
	    }());

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$9 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formControlBinding$1 = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlDirective; })
	    };
	    /**
	     * \@whatItDoes Syncs a standalone {\@link FormControl} instance to a form control element.
	     *
	     * In other words, this directive ensures that any values written to the {\@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {\@link FormControl} instance (view -> model).
	     *
	     * \@howToUse
	     *
	     * Use this directive if you'd like to create and manage a {\@link FormControl} instance directly.
	     * Simply create a {\@link FormControl}, save it to your component class, and pass it into the
	     * {\@link FormControlDirective}.
	     *
	     * This directive is designed to be used as a standalone control.  Unlike {\@link FormControlName},
	     * it does not require that your {\@link FormControl} instance be part of any parent
	     * {\@link FormGroup}, and it won't be registered to any {\@link FormGroupDirective} that
	     * exists above it.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormControl} instance. See a full list of available properties in
	     * {\@link AbstractControl}.
	     *
	     * **Set the value**: You can pass in an initial value when instantiating the {\@link FormControl},
	     * or you can set it programmatically later using {\@link AbstractControl.setValue} or
	     * {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     *  \@stable
	     */
	    var FormControlDirective = (function (_super) {
	        __extends$9(FormControlDirective, _super);
	        /**
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function FormControlDirective(validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this.update = new EventEmitter();
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
	            /**
	             * @param {?} isDisabled
	             * @return {?}
	             */
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlDirective.prototype.ngOnChanges = function (changes) {
	            if (this._isControlChanged(changes)) {
	                setUpControl(this.form, this);
	                if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                    this.valueAccessor.setDisabledState(true);
	                }
	                this.form.updateValueAndValidity({ emitEvent: false });
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.form.setValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        Object.defineProperty(FormControlDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlDirective.prototype._isControlChanged = function (changes) {
	            return changes.hasOwnProperty('form');
	        };
	        FormControlDirective.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControl]', providers: [formControlBinding$1], exportAs: 'ngForm' },] },
	        ];
	        /** @nocollapse */
	        FormControlDirective.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        FormControlDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formControl',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlDirective;
	    }(NgControl));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$11 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formDirectiveProvider$1 = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupDirective; })
	    };
	    /**
	     * \@whatItDoes Binds an existing {\@link FormGroup} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive accepts an existing {\@link FormGroup} instance. It will then use this
	     * {\@link FormGroup} instance to match any child {\@link FormControl}, {\@link FormGroup},
	     * and {\@link FormArray} instances to child {\@link FormControlName}, {\@link FormGroupName},
	     * and {\@link FormArrayName} directives.
	     *
	     * **Set value**: You can set the form's initial value when instantiating the
	     * {\@link FormGroup}, or you can set it programmatically later using the {\@link FormGroup}'s
	     * {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue} methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the form, you can subscribe
	     * to the {\@link FormGroup}'s {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * its {\@link AbstractControl.statusChanges} event to be notified when the validation status is
	     * re-calculated.
	     *
	     * Furthermore, you can listen to the directive's `ngSubmit` event to be notified when the user has
	     * triggered a form submission. The `ngSubmit` event will be emitted with the original form
	     * submission event.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     *  \@stable
	     */
	    var FormGroupDirective = (function (_super) {
	        __extends$11(FormGroupDirective, _super);
	        /**
	         * @param {?} _validators
	         * @param {?} _asyncValidators
	         */
	        function FormGroupDirective(_validators, _asyncValidators) {
	            _super.call(this);
	            this._validators = _validators;
	            this._asyncValidators = _asyncValidators;
	            this._submitted = false;
	            this.directives = [];
	            this.form = null;
	            this.ngSubmit = new EventEmitter();
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormGroupDirective.prototype.ngOnChanges = function (changes) {
	            this._checkFormPresent();
	            if (changes.hasOwnProperty('form')) {
	                this._updateValidators();
	                this._updateDomValue();
	                this._updateRegistrations();
	            }
	        };
	        Object.defineProperty(FormGroupDirective.prototype, "submitted", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addControl = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpControl(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	            this.directives.push(dir);
	            return ctrl;
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getControl = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeControl = function (dir) { ListWrapper.remove(this.directives, dir); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addFormGroup = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeFormGroup = function (dir) { };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getFormGroup = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.addFormArray = function (dir) {
	            var /** @type {?} */ ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.removeFormArray = function (dir) { };
	        /**
	         * @param {?} dir
	         * @return {?}
	         */
	        FormGroupDirective.prototype.getFormArray = function (dir) { return (this.form.get(dir.path)); };
	        /**
	         * @param {?} dir
	         * @param {?} value
	         * @return {?}
	         */
	        FormGroupDirective.prototype.updateModel = function (dir, value) {
	            var /** @type {?} */ ctrl = (this.form.get(dir.path));
	            ctrl.setValue(value);
	        };
	        /**
	         * @param {?} $event
	         * @return {?}
	         */
	        FormGroupDirective.prototype.onSubmit = function ($event) {
	            this._submitted = true;
	            this.ngSubmit.emit($event);
	            return false;
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype.onReset = function () { this.resetForm(); };
	        /**
	         * @param {?=} value
	         * @return {?}
	         */
	        FormGroupDirective.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateDomValue = function () {
	            var _this = this;
	            this.directives.forEach(function (dir) {
	                var /** @type {?} */ newCtrl = _this.form.get(dir.path);
	                if (dir._control !== newCtrl) {
	                    cleanUpControl(dir._control, dir);
	                    if (newCtrl)
	                        setUpControl(newCtrl, dir);
	                    dir._control = newCtrl;
	                }
	            });
	            this.form._updateTreeValidity({ emitEvent: false });
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateRegistrations = function () {
	            var _this = this;
	            this.form._registerOnCollectionChange(function () { return _this._updateDomValue(); });
	            if (this._oldForm)
	                this._oldForm._registerOnCollectionChange(function () { });
	            this._oldForm = this.form;
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._updateValidators = function () {
	            var /** @type {?} */ sync = composeValidators(this._validators);
	            this.form.validator = Validators.compose([this.form.validator, sync]);
	            var /** @type {?} */ async = composeAsyncValidators(this._asyncValidators);
	            this.form.asyncValidator = Validators.composeAsync([this.form.asyncValidator, async]);
	        };
	        /**
	         * @return {?}
	         */
	        FormGroupDirective.prototype._checkFormPresent = function () {
	            if (!this.form) {
	                ReactiveErrors.missingFormException();
	            }
	        };
	        FormGroupDirective.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroup]',
	                        providers: [formDirectiveProvider$1],
	                        host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        FormGroupDirective.ctorParameters = function () { return [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormGroupDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formGroup',] },],
	            'ngSubmit': [{ type: _angular_core.Output },],
	        };
	        return FormGroupDirective;
	    }(ControlContainer));

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$12 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ formGroupNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupName; })
	    };
	    /**
	     * \@whatItDoes Syncs a nested {\@link FormGroup} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive can only be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {\@link FormGroup} you want to link, and
	     * will look for a {\@link FormGroup} registered with that name in the parent
	     * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
	     *
	     * Nested form groups can come in handy when you want to validate a sub-group of a
	     * form separately from the rest or when you'd like to group the values of certain
	     * controls into their own nested object.
	     *
	     * **Access the group**: You can access the associated {\@link FormGroup} using the
	     * {\@link AbstractControl.get} method. Ex: `this.form.get('name')`.
	     *
	     * You can also access individual controls within the group using dot syntax.
	     * Ex: `this.form.get('name.first')`
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormGroup}. See a full list of available properties in {\@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {\@link FormGroup}, or you can set it programmatically later using
	     * {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the group, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * \@stable
	     */
	    var FormGroupName = (function (_super) {
	        __extends$12(FormGroupName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function FormGroupName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * \@internal
	         * @return {?}
	         */
	        FormGroupName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.groupParentException();
	            }
	        };
	        FormGroupName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormGroupName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormGroupName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formGroupName',] },],
	        };
	        return FormGroupName;
	    }(AbstractFormGroupDirective));
	    var /** @type {?} */ formArrayNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormArrayName; })
	    };
	    /**
	     * \@whatItDoes Syncs a nested {\@link FormArray} to a DOM element.
	     *
	     * \@howToUse
	     *
	     * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {\@link FormArray} you want to link, and
	     * will look for a {\@link FormArray} registered with that name in the parent
	     * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
	     *
	     * Nested form arrays can come in handy when you have a group of form controls but
	     * you're not sure how many there will be. Form arrays allow you to create new
	     * form controls dynamically.
	     *
	     * **Access the array**: You can access the associated {\@link FormArray} using the
	     * {\@link AbstractControl.get} method on the parent {\@link FormGroup}.
	     * Ex: `this.form.get('cities')`.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {\@link FormArray}. See a full list of available properties in {\@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {\@link FormArray}, or you can set the value programmatically later using the
	     * {\@link FormArray}'s {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}
	     * methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the array, you can
	     * subscribe to the {\@link FormArray}'s {\@link AbstractControl.valueChanges} event.  You can also
	     * listen to its {\@link AbstractControl.statusChanges} event to be notified when the validation
	     * status is re-calculated.
	     *
	     * **Add new controls**: You can add new controls to the {\@link FormArray} dynamically by
	     * calling its {\@link FormArray.push} method.
	     *  Ex: `this.form.get('cities').push(new FormControl());`
	     *
	     * ### Example
	     *
	     * {\@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
	     *
	     * * **npm package**: `\@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * \@stable
	     */
	    var FormArrayName = (function (_super) {
	        __extends$12(FormArrayName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         */
	        function FormArrayName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormArray(this);
	        };
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormArray(this);
	            }
	        };
	        Object.defineProperty(FormArrayName.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this.formDirective.getFormArray(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return this._parent ? (this._parent.formDirective) : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @return {?}
	         */
	        FormArrayName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.arrayParentException();
	            }
	        };
	        FormArrayName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormArrayName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ]; };
	        FormArrayName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formArrayName',] },],
	        };
	        return FormArrayName;
	    }(ControlContainer));
	    /**
	     * @param {?} parent
	     * @return {?}
	     */
	    function _hasInvalidParent(parent) {
	        return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
	            !(parent instanceof FormArrayName);
	    }

	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$10 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ controlNameBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlName; })
	    };
	    /**
	     * \@whatItDoes Syncs a {\@link FormControl} in an existing {\@link FormGroup} to a form control
	     * element by name.
	     *
	     * In other words, this directive ensures that any values written to the {\@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {\@link FormControl} instance (view -> model).
	     *
	     * \@howToUse
	     *
	     * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the {\@link FormControl} instance you want to
	     * link, and will look for a {\@link FormControl} registered with that name in the
	     * closest {\@link FormGroup} or {\@link FormArray} above it.
	     *
	     * **Access the control**: You can access the {\@link FormControl} associated with
	     * this directive by using the {\@link AbstractControl.get} method.
	     * Ex: `this.form.get('first');`
	     *
	     * **Get value**: the `value` property is always synced and available on the {\@link FormControl}.
	     * See a full list of available properties in {\@link AbstractControl}.
	     *
	     *  **Set value**: You can set an initial value for the control when instantiating the
	     *  {\@link FormControl}, or you can set it programmatically later using
	     *  {\@link AbstractControl.setValue} or {\@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {\@link AbstractControl.valueChanges} event.  You can also listen to
	     * {\@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * To see `formControlName` examples with different form control types, see:
	     *
	     * * Radio buttons: {\@link RadioControlValueAccessor}
	     * * Selects: {\@link SelectControlValueAccessor}
	     *
	     * **npm package**: `\@angular/forms`
	     *
	     * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     *  \@stable
	     */
	    var FormControlName = (function (_super) {
	        __extends$10(FormControlName, _super);
	        /**
	         * @param {?} parent
	         * @param {?} validators
	         * @param {?} asyncValidators
	         * @param {?} valueAccessors
	         */
	        function FormControlName(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this._added = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlName.prototype, "isDisabled", {
	            /**
	             * @param {?} isDisabled
	             * @return {?}
	             */
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        FormControlName.prototype.ngOnChanges = function (changes) {
	            if (!this._added)
	                this._setUpControl();
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.viewModel = this.model;
	                this.formDirective.updateModel(this, this.model);
	            }
	        };
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeControl(this);
	            }
	        };
	        /**
	         * @param {?} newValue
	         * @return {?}
	         */
	        FormControlName.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        Object.defineProperty(FormControlName.prototype, "path", {
	            /**
	             * @return {?}
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "formDirective", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "validator", {
	            /**
	             * @return {?}
	             */
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "asyncValidator", {
	            /**
	             * @return {?}
	             */
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "control", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype._checkParentType = function () {
	            if (!(this._parent instanceof FormGroupName) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                ReactiveErrors.ngModelGroupException();
	            }
	            else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
	                !(this._parent instanceof FormArrayName)) {
	                ReactiveErrors.controlParentException();
	            }
	        };
	        /**
	         * @return {?}
	         */
	        FormControlName.prototype._setUpControl = function () {
	            this._checkParentType();
	            this._control = this.formDirective.addControl(this);
	            if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                this.valueAccessor.setDisabledState(true);
	            }
	            this._added = true;
	        };
	        FormControlName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
	        ];
	        /** @nocollapse */
	        FormControlName.ctorParameters = function () { return [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ]; };
	        FormControlName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formControlName',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlName;
	    }(NgControl));

	    var __extends$13 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ REQUIRED_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return RequiredValidator; }),
	        multi: true
	    };
	    var /** @type {?} */ CHECKBOX_REQUIRED_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return CheckboxRequiredValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `required` validator to any controls marked with the
	     * `required` attribute, via the {\@link NG_VALIDATORS} binding.
	     *
	     * ### Example
	     *
	     * ```
	     * <input name="fullName" ngModel required>
	     * ```
	     *
	     * \@stable
	     */
	    var RequiredValidator = (function () {
	        function RequiredValidator() {
	        }
	        Object.defineProperty(RequiredValidator.prototype, "required", {
	            /**
	             * @return {?}
	             */
	            get: function () { return this._required; },
	            /**
	             * @param {?} value
	             * @return {?}
	             */
	            set: function (value) {
	                this._required = value != null && value !== false && "" + value !== 'false';
	                if (this._onChange)
	                    this._onChange();
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        RequiredValidator.prototype.validate = function (c) {
	            return this.required ? Validators.required(c) : null;
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        RequiredValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        RequiredValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
	                        providers: [REQUIRED_VALIDATOR],
	                        host: { '[attr.required]': 'required ? "" : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        RequiredValidator.ctorParameters = function () { return []; };
	        RequiredValidator.propDecorators = {
	            'required': [{ type: _angular_core.Input },],
	        };
	        return RequiredValidator;
	    }());
	    /**
	     * A Directive that adds the `required` validator to checkbox controls marked with the
	     * `required` attribute, via the {\@link NG_VALIDATORS} binding.
	     *
	     * ### Example
	     *
	     * ```
	     * <input type="checkbox" name="active" ngModel required>
	     * ```
	     *
	     * \@experimental
	     */
	    var CheckboxRequiredValidator = (function (_super) {
	        __extends$13(CheckboxRequiredValidator, _super);
	        function CheckboxRequiredValidator() {
	            _super.apply(this, arguments);
	        }
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        CheckboxRequiredValidator.prototype.validate = function (c) {
	            return this.required ? Validators.requiredTrue(c) : null;
	        };
	        CheckboxRequiredValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
	                        providers: [CHECKBOX_REQUIRED_VALIDATOR],
	                        host: { '[attr.required]': 'required ? "" : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        CheckboxRequiredValidator.ctorParameters = function () { return []; };
	        return CheckboxRequiredValidator;
	    }(RequiredValidator));
	    /**
	     * Provider which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='min'}
	     */
	    var /** @type {?} */ MIN_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MinLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {\@link MinLengthValidator} for any `formControlName`,
	     * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
	     *
	     * \@stable
	     */
	    var MinLengthValidator = (function () {
	        function MinLengthValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        MinLengthValidator.prototype.ngOnChanges = function (changes) {
	            if ('minlength' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        MinLengthValidator.prototype.validate = function (c) {
	            return this.minlength == null ? null : this._validator(c);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        MinLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        MinLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.minLength(parseInt(this.minlength, 10));
	        };
	        MinLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
	                        providers: [MIN_LENGTH_VALIDATOR],
	                        host: { '[attr.minlength]': 'minlength ? minlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MinLengthValidator.ctorParameters = function () { return []; };
	        MinLengthValidator.propDecorators = {
	            'minlength': [{ type: _angular_core.Input },],
	        };
	        return MinLengthValidator;
	    }());
	    /**
	     * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='max'}
	     */
	    var /** @type {?} */ MAX_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MaxLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {\@link MaxLengthValidator} for any `formControlName,
	     * `formControl`,
	     * or control with `ngModel` that also has a `maxlength` attribute.
	     *
	     * \@stable
	     */
	    var MaxLengthValidator = (function () {
	        function MaxLengthValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.ngOnChanges = function (changes) {
	            if ('maxlength' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.validate = function (c) {
	            return this.maxlength != null ? this._validator(c) : null;
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        MaxLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        MaxLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
	        };
	        MaxLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
	                        providers: [MAX_LENGTH_VALIDATOR],
	                        host: { '[attr.maxlength]': 'maxlength ? maxlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MaxLengthValidator.ctorParameters = function () { return []; };
	        MaxLengthValidator.propDecorators = {
	            'maxlength': [{ type: _angular_core.Input },],
	        };
	        return MaxLengthValidator;
	    }());
	    var /** @type {?} */ PATTERN_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return PatternValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `pattern` validator to any controls marked with the
	     * `pattern` attribute, via the {\@link NG_VALIDATORS} binding. Uses attribute value
	     * as the regex to validate Control value against.  Follows pattern attribute
	     * semantics; i.e. regex must match entire Control value.
	     *
	     * ### Example
	     *
	     * ```
	     * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
	     * ```
	     * \@stable
	     */
	    var PatternValidator = (function () {
	        function PatternValidator() {
	        }
	        /**
	         * @param {?} changes
	         * @return {?}
	         */
	        PatternValidator.prototype.ngOnChanges = function (changes) {
	            if ('pattern' in changes) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        /**
	         * @param {?} c
	         * @return {?}
	         */
	        PatternValidator.prototype.validate = function (c) { return this._validator(c); };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        PatternValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        /**
	         * @return {?}
	         */
	        PatternValidator.prototype._createValidator = function () { this._validator = Validators.pattern(this.pattern); };
	        PatternValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
	                        providers: [PATTERN_VALIDATOR],
	                        host: { '[attr.pattern]': 'pattern ? pattern : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        PatternValidator.ctorParameters = function () { return []; };
	        PatternValidator.propDecorators = {
	            'pattern': [{ type: _angular_core.Input },],
	        };
	        return PatternValidator;
	    }());

	    /**
	     * \@whatItDoes Creates an {\@link AbstractControl} from a user-specified configuration.
	     *
	     * It is essentially syntactic sugar that shortens the `new FormGroup()`,
	     * `new FormControl()`, and `new FormArray()` boilerplate that can build up in larger
	     * forms.
	     *
	     * \@howToUse
	     *
	     * To use, inject `FormBuilder` into your component class. You can then call its methods
	     * directly.
	     *
	     * {\@example forms/ts/formBuilder/form_builder_example.ts region='Component'}
	     *
	     *  * **npm package**: `\@angular/forms`
	     *
	     *  * **NgModule**: {\@link ReactiveFormsModule}
	     *
	     * \@stable
	     */
	    var FormBuilder = (function () {
	        function FormBuilder() {
	        }
	        /**
	         * Construct a new {\@link FormGroup} with the given map of configuration.
	         * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
	         *
	         * See the {\@link FormGroup} constructor for more details.
	         * @param {?} controlsConfig
	         * @param {?=} extra
	         * @return {?}
	         */
	        FormBuilder.prototype.group = function (controlsConfig, extra) {
	            if (extra === void 0) { extra = null; }
	            var /** @type {?} */ controls = this._reduceControls(controlsConfig);
	            var /** @type {?} */ validator = isPresent(extra) ? extra['validator'] : null;
	            var /** @type {?} */ asyncValidator = isPresent(extra) ? extra['asyncValidator'] : null;
	            return new FormGroup(controls, validator, asyncValidator);
	        };
	        /**
	         * Construct a new {\@link FormControl} with the given `formState`,`validator`, and
	         * `asyncValidator`.
	         *
	         * `formState` can either be a standalone value for the form control or an object
	         * that contains both a value and a disabled status.
	         *
	         * @param {?} formState
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         * @return {?}
	         */
	        FormBuilder.prototype.control = function (formState, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            return new FormControl(formState, validator, asyncValidator);
	        };
	        /**
	         * Construct a {\@link FormArray} from the given `controlsConfig` array of
	         * configuration, with the given optional `validator` and `asyncValidator`.
	         * @param {?} controlsConfig
	         * @param {?=} validator
	         * @param {?=} asyncValidator
	         * @return {?}
	         */
	        FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
	            var _this = this;
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            var /** @type {?} */ controls = controlsConfig.map(function (c) { return _this._createControl(c); });
	            return new FormArray(controls, validator, asyncValidator);
	        };
	        /**
	         * \@internal
	         * @param {?} controlsConfig
	         * @return {?}
	         */
	        FormBuilder.prototype._reduceControls = function (controlsConfig) {
	            var _this = this;
	            var /** @type {?} */ controls = {};
	            Object.keys(controlsConfig).forEach(function (controlName) {
	                controls[controlName] = _this._createControl(controlsConfig[controlName]);
	            });
	            return controls;
	        };
	        /**
	         * \@internal
	         * @param {?} controlConfig
	         * @return {?}
	         */
	        FormBuilder.prototype._createControl = function (controlConfig) {
	            if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
	                controlConfig instanceof FormArray) {
	                return controlConfig;
	            }
	            else if (Array.isArray(controlConfig)) {
	                var /** @type {?} */ value = controlConfig[0];
	                var /** @type {?} */ validator = controlConfig.length > 1 ? controlConfig[1] : null;
	                var /** @type {?} */ asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
	                return this.control(value, validator, asyncValidator);
	            }
	            else {
	                return this.control(controlConfig);
	            }
	        };
	        FormBuilder.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        FormBuilder.ctorParameters = function () { return []; };
	        return FormBuilder;
	    }());

	    /**
	     * @stable
	     */
	    var /** @type {?} */ VERSION = new _angular_core.Version('2.4.10');

	    var /** @type {?} */ SHARED_FORM_DIRECTIVES = [
	        NgSelectOption,
	        NgSelectMultipleOption,
	        DefaultValueAccessor,
	        NumberValueAccessor,
	        RangeValueAccessor,
	        CheckboxControlValueAccessor,
	        SelectControlValueAccessor,
	        SelectMultipleControlValueAccessor,
	        RadioControlValueAccessor,
	        NgControlStatus,
	        NgControlStatusGroup,
	        RequiredValidator,
	        MinLengthValidator,
	        MaxLengthValidator,
	        PatternValidator,
	        CheckboxRequiredValidator,
	    ];
	    var /** @type {?} */ TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
	    var /** @type {?} */ REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
	    /**
	     * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
	     */
	    var InternalFormsSharedModule = (function () {
	        function InternalFormsSharedModule() {
	        }
	        InternalFormsSharedModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: SHARED_FORM_DIRECTIVES,
	                        exports: SHARED_FORM_DIRECTIVES,
	                    },] },
	        ];
	        /** @nocollapse */
	        InternalFormsSharedModule.ctorParameters = function () { return []; };
	        return InternalFormsSharedModule;
	    }());

	    /**
	     * The ng module for forms.
	     * \@stable
	     */
	    var FormsModule = (function () {
	        function FormsModule() {
	        }
	        FormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: TEMPLATE_DRIVEN_DIRECTIVES,
	                        providers: [RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        FormsModule.ctorParameters = function () { return []; };
	        return FormsModule;
	    }());
	    /**
	     * The ng module for reactive forms.
	     * \@stable
	     */
	    var ReactiveFormsModule = (function () {
	        function ReactiveFormsModule() {
	        }
	        ReactiveFormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: [REACTIVE_DRIVEN_DIRECTIVES],
	                        providers: [FormBuilder, RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        ReactiveFormsModule.ctorParameters = function () { return []; };
	        return ReactiveFormsModule;
	    }());

	    exports.AbstractControlDirective = AbstractControlDirective;
	    exports.AbstractFormGroupDirective = AbstractFormGroupDirective;
	    exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
	    exports.ControlContainer = ControlContainer;
	    exports.NG_VALUE_ACCESSOR = NG_VALUE_ACCESSOR;
	    exports.DefaultValueAccessor = DefaultValueAccessor;
	    exports.NgControl = NgControl;
	    exports.NgControlStatus = NgControlStatus;
	    exports.NgControlStatusGroup = NgControlStatusGroup;
	    exports.NgForm = NgForm;
	    exports.NgModel = NgModel;
	    exports.NgModelGroup = NgModelGroup;
	    exports.RadioControlValueAccessor = RadioControlValueAccessor;
	    exports.FormControlDirective = FormControlDirective;
	    exports.FormControlName = FormControlName;
	    exports.FormGroupDirective = FormGroupDirective;
	    exports.FormArrayName = FormArrayName;
	    exports.FormGroupName = FormGroupName;
	    exports.NgSelectOption = NgSelectOption;
	    exports.SelectControlValueAccessor = SelectControlValueAccessor;
	    exports.SelectMultipleControlValueAccessor = SelectMultipleControlValueAccessor;
	    exports.CheckboxRequiredValidator = CheckboxRequiredValidator;
	    exports.MaxLengthValidator = MaxLengthValidator;
	    exports.MinLengthValidator = MinLengthValidator;
	    exports.PatternValidator = PatternValidator;
	    exports.RequiredValidator = RequiredValidator;
	    exports.FormBuilder = FormBuilder;
	    exports.AbstractControl = AbstractControl;
	    exports.FormArray = FormArray;
	    exports.FormControl = FormControl;
	    exports.FormGroup = FormGroup;
	    exports.NG_ASYNC_VALIDATORS = NG_ASYNC_VALIDATORS;
	    exports.NG_VALIDATORS = NG_VALIDATORS;
	    exports.Validators = Validators;
	    exports.VERSION = VERSION;
	    exports.FormsModule = FormsModule;
	    exports.ReactiveFormsModule = ReactiveFormsModule;

	}));

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const http_1 = __webpack_require__(65);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const underscore_1 = __webpack_require__(67);
	__webpack_require__(68);
	const base_model_1 = __webpack_require__(70);
	const base_collection_1 = __webpack_require__(76);
	const collection_range_input_search_component_1 = __webpack_require__(77);
	const collection_sort_component_1 = __webpack_require__(82);
	let BackboneModule = class BackboneModule {
	    constructor(http) {
	        this.http = http;
	        Backbone.ajax = (options) => {
	            let searchParams = options.search || new http_1.URLSearchParams();
	            let requestOption = new http_1.RequestOptions({
	                method: options.type,
	                body: options.data,
	                headers: new http_1.Headers(options.headers),
	                search: searchParams,
	                url: options.url
	            });
	            requestOption.headers.append('content-type', 'application/json');
	            return http.request(options.url, requestOption)
	                .toPromise()
	                .then(function (resp) {
	                if (options.success && typeof options.success === 'function') {
	                    options.success(resp.json(), resp.statusText, this);
	                }
	                return resp;
	            }, function (resp) {
	                if (options.error && typeof options.error === 'function') {
	                    options.error(this, resp.statusText, resp.toString());
	                }
	                return new Promise((resolve, reject) => {
	                    reject(resp);
	                });
	            });
	        };
	        const superSync = Backbone.sync;
	        Backbone.sync = (method, model, options) => {
	            // we have to set the flag to wait true otherwise all cases were you want to delete mutliple entries will break
	            // https://github.com/jashkenas/backbone/issues/3534
	            // This flag means that the server has to confirm the creation/deletion before the model will be added/removed to the
	            // collection
	            options = options || {};
	            if (underscore_1.isUndefined(options.wait)) {
	                options.wait = true;
	            }
	            // Instead of the response object we are returning the backbone model in the promise
	            return superSync.call(Backbone, method, model, options).then(function () {
	                return model;
	            });
	        };
	    }
	};
	BackboneModule = __decorate([
	    core_1.NgModule({
	        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
	        exports: [
	            collection_range_input_search_component_1.CollectionRangeInputSearchComponent,
	            collection_sort_component_1.CollectionSortComponent
	        ],
	        providers: [
	            base_collection_1.BaseCollection,
	            base_model_1.BaseModel
	        ],
	        declarations: [
	            collection_range_input_search_component_1.CollectionRangeInputSearchComponent,
	            collection_sort_component_1.CollectionSortComponent
	        ],
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
	], BackboneModule);
	exports.BackboneModule = BackboneModule;
	var _a;


/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const nested_model_1 = __webpack_require__(71);
	const core_1 = __webpack_require__(3);
	const get_url_util_1 = __webpack_require__(72);
	const request_util_1 = __webpack_require__(74);
	const underscore_1 = __webpack_require__(67);
	const prepare_search_params_1 = __webpack_require__(75);
	let BaseModel = class BaseModel extends nested_model_1.NestedModel {
	    constructor() {
	        super(...arguments);
	        this.queryParams = {};
	        this.endpoint = null;
	        this.urlRoot = () => {
	            return get_url_util_1.getUrl(this);
	        };
	    }
	    hostName() {
	        return '';
	    }
	    ;
	    basePath() {
	        return '';
	    }
	    ;
	    request(url, method, options) {
	        return request_util_1.request(url, method, options, this);
	    }
	    sync(method, model, options = {}) {
	        let queryParams = this.queryParams;
	        if (options.queryParams) {
	            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
	        }
	        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
	        return super.sync(method, model, options);
	    }
	};
	BaseModel = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], BaseModel);
	exports.BaseModel = BaseModel;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const backbone_1 = __webpack_require__(68);
	const underscore_1 = __webpack_require__(67);
	class NestedModel extends backbone_1.Model {
	    constructor(attributes, options = {}) {
	        options._prepareNesting = true;
	        super(attributes, options);
	    }
	    nested() {
	        return {};
	    }
	    ;
	    _prepare() {
	        let nestedAttributes = this.nested(), instanceObject = {};
	        for (let key in nestedAttributes) {
	            if (typeof nestedAttributes[key] === 'function') {
	                let instance = new nestedAttributes[key]();
	                instance.parent = this;
	                instanceObject[key] = instance;
	            }
	            else {
	                throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
	            }
	        }
	        return instanceObject;
	    }
	    ;
	    _setNestedModel(key, value) {
	        if (underscore_1.isObject(value)) {
	            this.get(key).set(value);
	        }
	        else {
	            let id = this.get(key).idAttribute;
	            this.get(key).set(id, value);
	        }
	    }
	    ;
	    _setNestedCollection(key, value) {
	        if (underscore_1.isObject(value) && !underscore_1.isArray(value)) {
	            this.get(key).add(value);
	        }
	        else if (underscore_1.isArray(value)) {
	            value.forEach(function (val) {
	                this._setNestedCollection(key, val);
	            }.bind(this));
	        }
	        else {
	            let id = this.get(key).model.prototype.idAttribute, obj = {};
	            obj[id] = value;
	            this.get(key).add(obj);
	        }
	    }
	    ;
	    _setNestedAttributes(obj) {
	        for (let key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                let nestedAttrs = this.nested(), value = obj[key], nestedValue = nestedAttrs[key];
	                if (nestedValue && !(value instanceof nestedValue) && this.get(key)) {
	                    if (this.get(key) instanceof backbone_1.Model) {
	                        this._setNestedModel(key, value);
	                    }
	                    else if (this.get(key) instanceof backbone_1.Collection) {
	                        this._setNestedCollection(key, value);
	                    }
	                    delete obj[key];
	                }
	            }
	        }
	        return obj;
	    }
	    ;
	    _nestedModelToJson(model) {
	        let result;
	        if (model instanceof NestedModel) {
	            result = model._prepareDataForServer();
	        }
	        else {
	            result = model.toJSON();
	        }
	        return result;
	    }
	    ;
	    _prepareDataForServer() {
	        let attrs = underscore_1.extend({}, this.attributes), nestedAttrs = this.nested();
	        for (let key in nestedAttrs) {
	            if (nestedAttrs.hasOwnProperty(key)) {
	                let nestedAttr = this.get(key);
	                if (nestedAttr instanceof backbone_1.Model) {
	                    attrs[key] = this._nestedModelToJson(nestedAttr);
	                }
	                else if (nestedAttr instanceof backbone_1.Collection) {
	                    let result = [];
	                    nestedAttr.each(function (model) {
	                        result.push(this._nestedModelToJson(model));
	                    }.bind(this));
	                    attrs[key] = result;
	                }
	            }
	        }
	        return this.compose(attrs);
	    }
	    ;
	    set(attributes, options = {}) {
	        let obj = {};
	        if (options && options._prepareNesting) {
	            underscore_1.extend(this.attributes, this._prepare());
	        }
	        if (underscore_1.isString(attributes)) {
	            obj[attributes] = options;
	        }
	        else if (underscore_1.isObject(attributes)) {
	            obj = attributes;
	        }
	        if (!underscore_1.isObject(options)) {
	            options = null;
	        }
	        obj = this._setNestedAttributes(obj);
	        return super.set.call(this, obj, options);
	    }
	    ;
	    compose(attrs) {
	        return attrs;
	    }
	    ;
	    toJSON(options) {
	        // When options are set toJSON is called from the sync method so it is called before the object is send to the server
	        // We use this to transform our data before we are sending it to the server
	        // It is the counterpart of parse for the server
	        if (options) {
	            return this._prepareDataForServer();
	        }
	        else {
	            return super.toJSON.apply(this, arguments);
	        }
	    }
	    ;
	    clear(options) {
	        let attrs = {};
	        for (let key in this.attributes) {
	            if (this.get(key) instanceof backbone_1.Model) {
	                this.get(key).clear();
	            }
	            else if (this.get(key) instanceof backbone_1.Collection) {
	                this.get(key).reset();
	            }
	            else {
	                attrs[key] = void 0;
	            }
	        }
	        return super.set(attrs, underscore_1.extend({}, options, { unset: true }));
	    }
	    ;
	}
	exports.NestedModel = NestedModel;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const backbone_1 = __webpack_require__(68);
	const underscore_1 = __webpack_require__(67);
	const concat_url_parts_util_1 = __webpack_require__(73);
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


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const underscore_1 = __webpack_require__(67);
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


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const backbone_1 = __webpack_require__(68);
	const underscore_1 = __webpack_require__(67);
	const concat_url_parts_util_1 = __webpack_require__(73);
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


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const http_1 = __webpack_require__(65);
	const underscore_1 = __webpack_require__(67);
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


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const backbone_1 = __webpack_require__(68);
	const base_model_1 = __webpack_require__(70);
	const core_1 = __webpack_require__(3);
	const get_url_util_1 = __webpack_require__(72);
	const underscore_1 = __webpack_require__(67);
	const prepare_search_params_1 = __webpack_require__(75);
	let BaseCollection = class BaseCollection extends backbone_1.Collection {
	    constructor() {
	        super();
	        this.model = base_model_1.BaseModel;
	        this.queryParams = {};
	        this.endpoint = null;
	        this.sortOrder = null;
	        this.url = () => {
	            return get_url_util_1.getUrl(this);
	        };
	        this.on('sync', () => {
	            this.sortOrder = null;
	        });
	    }
	    hostName() {
	        return '';
	    }
	    ;
	    basePath() {
	        return '';
	    }
	    ;
	    sync(method, model, options = {}) {
	        let queryParams = this.queryParams;
	        if (options.queryParams) {
	            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
	        }
	        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
	        return super.sync(method, model, options);
	    }
	    sortAscending() {
	        this.sort();
	        this.sortOrder = 'ASC';
	    }
	    sortDescending() {
	        if (this.sortOrder !== 'ASC') {
	            this.sortAscending();
	        }
	        this.models = this.models.reverse();
	        this.trigger('sort', this);
	        this.sortOrder = 'DESC';
	    }
	};
	BaseCollection = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], BaseCollection);
	exports.BaseCollection = BaseCollection;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const Observable_1 = __webpack_require__(7);
	const Subject_1 = __webpack_require__(6);
	const base_collection_1 = __webpack_require__(76);
	let CollectionRangeInputSearchComponent = class CollectionRangeInputSearchComponent {
	    constructor() {
	        this.searchTerms = new Subject_1.Subject();
	    }
	    // Push a search term into the observable stream.
	    search() {
	        this.searchTerms.next(this.query);
	    }
	    ngOnInit() {
	        this.searchTerms
	            .debounceTime(300) // wait for 300ms pause in events
	            .distinctUntilChanged() // ignore if next search term is same as previous
	            .switchMap(term => {
	            if (term) {
	                this.collection.queryParams[this.queryParam] = term;
	                this.collection.fetch({ reset: true });
	                return Observable_1.Observable.of(this.collection);
	            }
	        }).toPromise();
	        this.query = this.collection.queryParams[this.queryParam];
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof base_collection_1.BaseCollection !== 'undefined' && base_collection_1.BaseCollection) === 'function' && _a) || Object)
	], CollectionRangeInputSearchComponent.prototype, "collection", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], CollectionRangeInputSearchComponent.prototype, "queryParam", void 0);
	CollectionRangeInputSearchComponent = __decorate([
	    core_1.Component({
	        selector: 'collection-range-input-search',
	        styles: [__webpack_require__(78)],
	        template: __webpack_require__(81)
	    }), 
	    __metadata('design:paramtypes', [])
	], CollectionRangeInputSearchComponent);
	exports.CollectionRangeInputSearchComponent = CollectionRangeInputSearchComponent;
	var _a;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(79);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".search {\n  margin: 10px auto; }\n\n.search-result {\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  width: 200px;\n  height: 50px;\n  background-color: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center; }\n  .search-result .cover {\n    min-width: 50px;\n    min-height: 50px;\n    max-width: 50px;\n    max-height: 50px;\n    flex-grow: 1; }\n  .search-result .info {\n    max-height: 50px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 11px;\n    padding: 2px 5px; }\n", ""]);

	// exports


/***/ }),
/* 80 */,
/* 81 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"collection-search\">\n  <input type=\"range\"\n         class=\"form-control\"\n         aria-describedby=\"basic-addon3\"\n         name=\"search\"\n         min=\"1000\"\n         max=\"3600000\"\n         [(ngModel)]=\"query\"\n         (ngModelChange)=\"search()\">\n</div>\n";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const base_collection_1 = __webpack_require__(76);
	const user_analytics_service_1 = __webpack_require__(83);
	let CollectionSortComponent = class CollectionSortComponent {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.sortDesc = true;
	    }
	    isSorted() {
	        return this.collection &&
	            ((this.collection.comparator === this.comparator) ||
	                (!this.comparator && !this.collection.comparator));
	    }
	    sort() {
	        if (this.comparator) {
	            if (this.collection.length < 2) {
	                return;
	            }
	            if (this.collection.comparator !== this.comparator) {
	                this.collection.sortOrder = null;
	                this.collection.comparator = this.comparator;
	            }
	            if (!this.collection.sortOrder || this.collection.sortOrder === 'ASC') {
	                this.collection.sortDescending();
	                this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_desc`, 'click', 'collection-sort-cmp');
	            }
	            else {
	                this.collection.sortAscending();
	                this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_asc`, 'click', 'collection-sort-cmp');
	            }
	        }
	        else if (this.collection.comparator) {
	            this.collection.comparator = null;
	            this.collection.fetch();
	            this.userAnalyticsService.trackEvent('sort_reset', 'click', 'collection-sort-cmp');
	        }
	    }
	    ngOnInit() {
	        this.collection.on('sync', () => {
	            if (this.isSorted() && this.comparator) {
	                this.collection.sortDescending();
	            }
	        });
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof base_collection_1.BaseCollection !== 'undefined' && base_collection_1.BaseCollection) === 'function' && _a) || Object)
	], CollectionSortComponent.prototype, "collection", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], CollectionSortComponent.prototype, "comparator", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], CollectionSortComponent.prototype, "label", void 0);
	CollectionSortComponent = __decorate([
	    core_1.Component({
	        selector: 'collection-sort',
	        styles: [__webpack_require__(86)],
	        template: __webpack_require__(88)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _b) || Object])
	], CollectionSortComponent);
	exports.CollectionSortComponent = CollectionSortComponent;
	var _a, _b;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracking_providers_collection_1 = __webpack_require__(84);
	let UserAnalyticsService = class UserAnalyticsService {
	    constructor() {
	        this.trackingProviders = new tracking_providers_collection_1.TrackingProviders();
	    }
	    addProvider(provider) {
	        this.trackingProviders.add(provider);
	    }
	    trackEvent(eventName, eventAction, msg) {
	        this.trackingProviders.trackEvent(eventName, eventAction, msg);
	    }
	    trackPage(page) {
	        this.trackingProviders.trackPage(page);
	    }
	    setUserId(userId) {
	        this.trackingProviders.setUserId(userId);
	    }
	    setProperty(property, value) {
	        this.trackingProviders.setProperty(property, value);
	    }
	};
	UserAnalyticsService = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], UserAnalyticsService);
	exports.UserAnalyticsService = UserAnalyticsService;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const base_collection_1 = __webpack_require__(76);
	const tracking_provider_model_1 = __webpack_require__(85);
	class TrackingProviders extends base_collection_1.BaseCollection {
	    constructor() {
	        super(...arguments);
	        this.model = tracking_provider_model_1.TrackingProviderModel;
	    }
	    trackEvent(eventName, eventAction, msg) {
	        let args = arguments;
	        this.each(function (trackingProvider) {
	            trackingProvider.trackEvent.apply(this, args);
	        });
	    }
	    trackPage(page) {
	        let args = arguments;
	        this.each(function (trackingProvider) {
	            trackingProvider.trackPage.apply(this, args);
	        });
	    }
	    setUserId(userId) {
	        this._userId = userId;
	        this.each(function (trackingProvider) {
	            trackingProvider.setUserId.call(this, this._userId);
	        }, this);
	    }
	    setProperty(property, value) {
	        if (property && value) {
	            this.each(function (trackingProvider) {
	                trackingProvider.setProperty.call(this, property, value);
	            }, this);
	        }
	    }
	    initialize() {
	        this.on('add', function () {
	            if (this._userId) {
	                this.setUserId(this._userId);
	            }
	        }, this);
	    }
	}
	exports.TrackingProviders = TrackingProviders;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const base_model_1 = __webpack_require__(70);
	const core_1 = __webpack_require__(3);
	let TrackingProviderModel = class TrackingProviderModel extends base_model_1.BaseModel {
	    trackEvent(eventName, eventAction, msg) {
	    }
	    trackPage(page) {
	    }
	    setUserId(userId) {
	    }
	    setProperty(property, value) {
	    }
	};
	TrackingProviderModel = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], TrackingProviderModel);
	exports.TrackingProviderModel = TrackingProviderModel;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(87);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 87 */
79,
/* 88 */
/***/ (function(module, exports) {

	module.exports = "<span (click)=\"sort()\" [style.font-weight]=\"isSorted()?'bold':'normal'\">\n  <i *ngIf=\"isSorted()\"\n     class=\"fa fa-angle-up\"\n     [class.fa-angle-up]=\"collection.sortOrder === 'ASC' && comparator\"\n     [class.fa-angle-down]=\"collection.sortOrder === 'DESC' && comparator\"\n     aria-hidden=\"true\"></i>\n  {{label}}\n</span>\n";

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const detail_component_1 = __webpack_require__(90);
	const tracks_routes_1 = __webpack_require__(120);
	const shared_module_1 = __webpack_require__(121);
	const tracks_collection_1 = __webpack_require__(124);
	let TracksModule = class TracksModule {
	};
	TracksModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            tracks_routes_1.TracksRoutingModule,
	            shared_module_1.SharedModule
	        ],
	        declarations: [
	            detail_component_1.TracksDetailComponent
	        ],
	        providers: [
	            tracks_collection_1.Tracks
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], TracksModule);
	exports.TracksModule = TracksModule;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const common_1 = __webpack_require__(22);
	const track_model_1 = __webpack_require__(108);
	let TracksDetailComponent = class TracksDetailComponent {
	    constructor(track, route, location) {
	        this.track = track;
	        this.route = route;
	        this.location = location;
	    }
	    ngOnInit() {
	        this.route.params.forEach((params) => {
	            let id = +params['id'];
	            this.track.set('id', id);
	            this.track.fetch();
	        });
	    }
	    goBack() {
	        this.location.back();
	    }
	    save() {
	        this.track.save(null, { wait: true })
	            .then(() => this.goBack());
	    }
	};
	TracksDetailComponent = __decorate([
	    core_1.Component({
	        selector: 'my-track-detail',
	        styles: [__webpack_require__(117)],
	        template: __webpack_require__(119),
	        providers: [track_model_1.Track]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _c) || Object])
	], TracksDetailComponent);
	exports.TracksDetailComponent = TracksDetailComponent;
	var _a, _b, _c;


/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_model_1 = __webpack_require__(109);
	const soundcloud_model_1 = __webpack_require__(110);
	const soundcloud_image_model_1 = __webpack_require__(113);
	const comments_collection_1 = __webpack_require__(114);
	let Track = class Track extends soundcloud_model_1.SoundcloudModel {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/tracks';
	    }
	    nested() {
	        return {
	            user: user_model_1.User,
	            artwork_url: soundcloud_image_model_1.SoundcloudImageModel,
	            comments: comments_collection_1.Comments
	        };
	    }
	    getResourceUrl() {
	        return `${this.get('stream_url')}?client_id=${this.clientId}`;
	    }
	    parse(attrs) {
	        attrs = super.parse(attrs);
	        attrs.likes = attrs.likes_count || attrs.favoritings_count;
	        return attrs;
	    }
	    initialize() {
	        if (this.get('id')) {
	            this.get('comments').setTrackId(this.get('id'));
	        }
	        this.on('change:id', () => {
	            this.get('comments').setTrackId(this.get('id'));
	        });
	    }
	};
	Track = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Track);
	exports.Track = Track;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const soundcloud_model_1 = __webpack_require__(110);
	const soundcloud_image_model_1 = __webpack_require__(113);
	let User = class User extends soundcloud_model_1.SoundcloudModel {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/users';
	    }
	    defaults() {
	        return {
	            name: ''
	        };
	    }
	    nested() {
	        return {
	            avatar_url: soundcloud_image_model_1.SoundcloudImageModel
	        };
	    }
	};
	User = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], User);
	exports.User = User;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const config_1 = __webpack_require__(111);
	const base_model_1 = __webpack_require__(70);
	const session_manager_fn_1 = __webpack_require__(112);
	let SoundcloudModel = class SoundcloudModel extends base_model_1.BaseModel {
	    constructor() {
	        super(...arguments);
	        this.clientId = config_1.Config.soundcloudClientId;
	    }
	    hostName() {
	        return '//api.soundcloud.com';
	    }
	    ;
	    sync(method, model, options = {}) {
	        this.queryParams['client_id'] = this.clientId;
	        let session = session_manager_fn_1.getSession();
	        if (session && session.isValid()) {
	            this.queryParams['oauth_token'] = session.get('access_token');
	        }
	        return super.sync(method, model, options);
	    }
	    ;
	    parse(rsp) {
	        return rsp.data || rsp;
	    }
	    ;
	};
	SoundcloudModel = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], SoundcloudModel);
	exports.SoundcloudModel = SoundcloudModel;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

	"use strict";
	const soundCloudredirectDomain = 'https://sc.menu-flow.com';
	exports.Config = {
	    soundcloudClientId: 'mqCVRxAeYDUjlPhqj27Hb1H9kydm9fMm',
	    soundcloudRedirectDomain: soundCloudredirectDomain,
	    soundcloudRedirectUrl: soundCloudredirectDomain + '/connect'
	};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

	"use strict";
	let _session = null;
	function setSession(session) {
	    _session = session;
	}
	exports.setSession = setSession;
	function getSession() {
	    return _session;
	}
	exports.getSession = getSession;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const base_model_1 = __webpack_require__(70);
	let SoundcloudImageModel = class SoundcloudImageModel extends base_model_1.BaseModel {
	    getImageByFormat(format) {
	        if (this.get('id')) {
	            return this.get('id').replace('-large', `-${format}`);
	        }
	    }
	    ;
	    getLargeSize() {
	        return this.getImageByFormat('t500x500');
	    }
	    ;
	    getMediumSize() {
	        return this.getImageByFormat('badge');
	    }
	    ;
	    getSmallSize() {
	        return this.getImageByFormat('small');
	    }
	    ;
	    getDefaultSize() {
	        return this.get('id');
	    }
	    ;
	};
	SoundcloudImageModel = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], SoundcloudImageModel);
	exports.SoundcloudImageModel = SoundcloudImageModel;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const soundcloud_collection_1 = __webpack_require__(115);
	const comment_model_1 = __webpack_require__(116);
	let Comments = class Comments extends soundcloud_collection_1.SoundcloudCollection {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/comments';
	        this.model = comment_model_1.Comment;
	        this.comparator = 'timestamp';
	    }
	    setTrackId(trackId) {
	        this.endpoint = `/tracks/${trackId}/comments`;
	    }
	};
	Comments = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Comments);
	exports.Comments = Comments;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const config_1 = __webpack_require__(111);
	const base_collection_1 = __webpack_require__(76);
	const soundcloud_model_1 = __webpack_require__(110);
	const session_manager_fn_1 = __webpack_require__(112);
	let SoundcloudCollection = class SoundcloudCollection extends base_collection_1.BaseCollection {
	    constructor() {
	        super(...arguments);
	        this.clientId = config_1.Config.soundcloudClientId;
	        this.model = soundcloud_model_1.SoundcloudModel;
	    }
	    hostName() {
	        return '//api.soundcloud.com';
	    }
	    ;
	    sync(method, model, options = {}) {
	        this.queryParams['client_id'] = this.clientId;
	        let session = session_manager_fn_1.getSession();
	        if (session && session.isValid()) {
	            this.queryParams['oauth_token'] = session.get('access_token');
	        }
	        return super.sync(method, model, options);
	    }
	    parse(rsp) {
	        return rsp.data || rsp;
	    }
	    ;
	};
	SoundcloudCollection = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], SoundcloudCollection);
	exports.SoundcloudCollection = SoundcloudCollection;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_model_1 = __webpack_require__(109);
	const soundcloud_model_1 = __webpack_require__(110);
	let Comment = class Comment extends soundcloud_model_1.SoundcloudModel {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/comments';
	    }
	    nested() {
	        return {
	            user: user_model_1.User
	        };
	    }
	};
	Comment = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Comment);
	exports.Comment = Comment;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(118);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "div.cover {\n  width: 100%;\n  max-width: 450px;\n  margin: 0 auto; }\n  div.cover img {\n    width: 100%;\n    height: auto; }\n\ndiv.details {\n  float: left;\n  padding: 15px;\n  text-align: center; }\n  div.details b, div.details p {\n    margin: 5px; }\n", ""]);

	// exports


/***/ }),
/* 119 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n\n  <span (click)=\"goBack()\"><i class=\"fa fa-chevron-left\"></i> Back</span>\n  <h2>Details</h2>\n\n  <hr>\n\n  <div class=\"cover\">\n    <img [src]=\"track.get('artwork_url').getLargeSize()\">\n  </div>\n  <div class=\"details\">\n    <b>{{track.get('title')}}</b>\n    <p>{{track.get('user').get('username')}}</p>\n    <play-button [track]=\"track\"></play-button>\n    <a href=\"{{track.attributes.purchase_url}}\" target=\"_blank\" *ngIf=\"track.attributes.purchase_url\">\n      <button class=\"btn btn-warning\" [class.btn-round]=\"!track.attributes.purchase_title\">\n        <i class=\"fa fa-download\"></i>\n        {{track.attributes.purchase_title}}\n      </button>\n    </a>\n    <a href=\"{{track.attributes.permalink_url}}\" target=\"_blank\" *ngIf=\"track.attributes.permalink_url\">\n      <button class=\"btn btn-success btn-round\">\n        <i class=\"fa fa-share\"></i>\n      </button>\n    </a>\n  </div>\n\n</section>\n\n";

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const detail_component_1 = __webpack_require__(90);
	const routes = [
	    { path: 'tracks/:id', component: detail_component_1.TracksDetailComponent }
	];
	let TracksRoutingModule = class TracksRoutingModule {
	};
	TracksRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], TracksRoutingModule);
	exports.TracksRoutingModule = TracksRoutingModule;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const h_readable_seconds_pipe_1 = __webpack_require__(122);
	const track_list_component_1 = __webpack_require__(123);
	const toggle_liked_track_component_1 = __webpack_require__(135);
	const play_button_component_1 = __webpack_require__(151);
	const platform_browser_1 = __webpack_require__(21);
	const queue_button_component_1 = __webpack_require__(155);
	const sort_tracks_component_1 = __webpack_require__(159);
	const backbone_module_1 = __webpack_require__(66);
	const range_slider_component_1 = __webpack_require__(163);
	const forms_1 = __webpack_require__(62);
	const draggable_directive_1 = __webpack_require__(167);
	const dropzone_directive_1 = __webpack_require__(168);
	const two_range_slider_component_1 = __webpack_require__(169);
	const view_header_component_1 = __webpack_require__(173);
	const scroll_view_component_1 = __webpack_require__(177);
	const cloud_player_logo_service_1 = __webpack_require__(181);
	const cloud_player_logo_component_1 = __webpack_require__(182);
	const toggle_switch_component_1 = __webpack_require__(187);
	const loading_spinner_component_1 = __webpack_require__(191);
	const collection_text_input_search_component_1 = __webpack_require__(195);
	const focus_input_directive_1 = __webpack_require__(199);
	const view_change_loader_component_1 = __webpack_require__(200);
	const track_cover_component_1 = __webpack_require__(127);
	const time_ago_directive_1 = __webpack_require__(204);
	const play_track_on_event_directive_1 = __webpack_require__(326);
	const options_btn_component_1 = __webpack_require__(327);
	const k_mil_shortener_pipe_1 = __webpack_require__(331);
	const fill_height_directive_1 = __webpack_require__(332);
	const multi_line_component_1 = __webpack_require__(333);
	const limit_collection_results_pipe_1 = __webpack_require__(337);
	const facebook_share_button_component_1 = __webpack_require__(338);
	const twitter_share_button_component_1 = __webpack_require__(342);
	let SharedModule = class SharedModule {
	};
	SharedModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            backbone_module_1.BackboneModule
	        ],
	        declarations: [
	            cloud_player_logo_component_1.CloudPlayerLogoComponent,
	            collection_text_input_search_component_1.CollectionTextInputSearchComponent,
	            facebook_share_button_component_1.FacebookShareButtonComponent,
	            twitter_share_button_component_1.TwitterShareButtonComponent,
	            track_list_component_1.TrackListComponent,
	            toggle_liked_track_component_1.ToggleLikedTrackComponent,
	            play_button_component_1.PlayButtonComponent,
	            queue_button_component_1.QueueButtonComponent,
	            sort_tracks_component_1.SortTracksComponent,
	            range_slider_component_1.RangeSliderComponent,
	            two_range_slider_component_1.TwoRangeSliderComponent,
	            view_header_component_1.ViewHeaderComponent,
	            view_change_loader_component_1.ViewChangeLoaderComponent,
	            scroll_view_component_1.ScrollViewComponent,
	            toggle_switch_component_1.ToggleSwitchComponent,
	            loading_spinner_component_1.LoadingSpinnerComponent,
	            multi_line_component_1.MultiLineComponent,
	            options_btn_component_1.OptionsBtnComponent,
	            options_btn_component_1.OptionsBtnOptionComponent,
	            track_cover_component_1.TrackCoverComponent,
	            draggable_directive_1.DraggableDirective,
	            dropzone_directive_1.DropZoneDirective,
	            focus_input_directive_1.FocusInputDirective,
	            time_ago_directive_1.TimeAgoDirective,
	            play_track_on_event_directive_1.PlayTrackOnEventDirective,
	            fill_height_directive_1.FillHeightDirective,
	            h_readable_seconds_pipe_1.HumanReadableSecondsPipe,
	            k_mil_shortener_pipe_1.KMilShortenerPipe,
	            limit_collection_results_pipe_1.LimitCollectionresultsPipe
	        ],
	        exports: [
	            cloud_player_logo_component_1.CloudPlayerLogoComponent,
	            collection_text_input_search_component_1.CollectionTextInputSearchComponent,
	            facebook_share_button_component_1.FacebookShareButtonComponent,
	            twitter_share_button_component_1.TwitterShareButtonComponent,
	            track_list_component_1.TrackListComponent,
	            toggle_liked_track_component_1.ToggleLikedTrackComponent,
	            play_button_component_1.PlayButtonComponent,
	            queue_button_component_1.QueueButtonComponent,
	            sort_tracks_component_1.SortTracksComponent,
	            range_slider_component_1.RangeSliderComponent,
	            two_range_slider_component_1.TwoRangeSliderComponent,
	            view_header_component_1.ViewHeaderComponent,
	            view_change_loader_component_1.ViewChangeLoaderComponent,
	            scroll_view_component_1.ScrollViewComponent,
	            toggle_switch_component_1.ToggleSwitchComponent,
	            loading_spinner_component_1.LoadingSpinnerComponent,
	            multi_line_component_1.MultiLineComponent,
	            options_btn_component_1.OptionsBtnComponent,
	            options_btn_component_1.OptionsBtnOptionComponent,
	            track_cover_component_1.TrackCoverComponent,
	            draggable_directive_1.DraggableDirective,
	            dropzone_directive_1.DropZoneDirective,
	            focus_input_directive_1.FocusInputDirective,
	            time_ago_directive_1.TimeAgoDirective,
	            play_track_on_event_directive_1.PlayTrackOnEventDirective,
	            fill_height_directive_1.FillHeightDirective,
	            h_readable_seconds_pipe_1.HumanReadableSecondsPipe,
	            k_mil_shortener_pipe_1.KMilShortenerPipe,
	            limit_collection_results_pipe_1.LimitCollectionresultsPipe
	        ],
	        providers: [cloud_player_logo_service_1.CloudPlayerLogoService]
	    }), 
	    __metadata('design:paramtypes', [])
	], SharedModule);
	exports.SharedModule = SharedModule;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let HumanReadableSecondsPipe = class HumanReadableSecondsPipe {
	    formatToHHMMSS(input) {
	        let time = new Date(null);
	        time.setSeconds(input);
	        // format time from hh:mm:ss to mm:ss when hh is 0
	        if (time.getHours() === 1) {
	            return time.toISOString().substr(14, 5);
	        }
	        else {
	            return time.toISOString().substr(12, 7);
	        }
	    }
	    transform(value, args) {
	        if (!value) {
	            return value;
	        }
	        else {
	            return this.formatToHHMMSS(parseInt(value, 10));
	        }
	    }
	};
	HumanReadableSecondsPipe = __decorate([
	    core_1.Pipe({ name: 'hReadableSeconds' }), 
	    __metadata('design:paramtypes', [])
	], HumanReadableSecondsPipe);
	exports.HumanReadableSecondsPipe = HumanReadableSecondsPipe;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const tracks_collection_1 = __webpack_require__(124);
	const play_queue_collection_1 = __webpack_require__(125);
	const track_cover_component_1 = __webpack_require__(127);
	const client_detector_service_1 = __webpack_require__(131);
	let TrackListComponent = class TrackListComponent {
	    constructor(router) {
	        this.router = router;
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	    }
	    gotoDetail(track) {
	        let link = ['/tracks', track.id];
	        this.router.navigate(link);
	    }
	    addToQueue(track) {
	        this.playQueue.queue({ track: track });
	    }
	    getSize() {
	        if (client_detector_service_1.ClientDetector.isMobileDevice()) {
	            return track_cover_component_1.CoverSizes.Small;
	        }
	        else {
	            return track_cover_component_1.CoverSizes.Regular;
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _a) || Object)
	], TrackListComponent.prototype, "tracks", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TrackListComponent.prototype, "canBeDeleted", void 0);
	TrackListComponent = __decorate([
	    core_1.Component({
	        selector: 'track-list',
	        styles: [__webpack_require__(132)],
	        template: __webpack_require__(134),
	        providers: [tracks_collection_1.Tracks]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	], TrackListComponent);
	exports.TrackListComponent = TrackListComponent;
	var _a, _b;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const track_model_1 = __webpack_require__(108);
	const core_1 = __webpack_require__(3);
	const soundcloud_collection_1 = __webpack_require__(115);
	let Tracks = class Tracks extends soundcloud_collection_1.SoundcloudCollection {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/tracks';
	        this.model = track_model_1.Track;
	        this.queryParams = {
	            q: null,
	            limit: 200,
	            'duration[from]': 1
	        };
	    }
	    refresh() {
	        return this.fetch({
	            search: {
	                ids: this.pluck('id'),
	                q: null,
	                limit: 100
	            }
	        });
	    }
	};
	Tracks = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Tracks);
	exports.Tracks = Tracks;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const play_queue_item_model_1 = __webpack_require__(126);
	const underscore_1 = __webpack_require__(67);
	const soundcloud_collection_1 = __webpack_require__(115);
	class PlayQueue extends soundcloud_collection_1.SoundcloudCollection {
	    constructor() {
	        super(...arguments);
	        this.playIndex = 0;
	        this.model = play_queue_item_model_1.PlayQueueItem;
	    }
	    static getInstance() {
	        if (PlayQueue.instance) {
	            return PlayQueue.instance;
	        }
	        else {
	            PlayQueue.instance = new PlayQueue();
	            return PlayQueue.instance;
	        }
	    }
	    getMiniItem(playQueueItem) {
	        let mini = playQueueItem.toJSON(true);
	        mini.track = {
	            id: mini.track.id
	        };
	        if (mini.status === 'PLAYING') {
	            mini.status = 'PAUSED';
	        }
	        return mini;
	    }
	    pushMiniItems(items, allItems, maxItems) {
	        items.forEach((item) => {
	            if (maxItems && allItems.length > maxItems) {
	                return;
	            }
	            allItems.push(this.getMiniItem(item));
	        });
	        return allItems;
	    }
	    getScheduledItemsJSON(maxItems) {
	        let allItems = [], queuedItems = this.getQueuedItems(), scheduledItems = this.getScheduledItems();
	        this.pushMiniItems(queuedItems, allItems, maxItems);
	        this.pushMiniItems(scheduledItems, allItems, maxItems);
	        return allItems;
	    }
	    getQueuedItems() {
	        return this.where({ status: 'QUEUED' });
	    }
	    getScheduledItems() {
	        return this.filter((item) => {
	            return item.isScheduled();
	        });
	    }
	    getPlayingItem() {
	        return this.findWhere({ status: 'PLAYING' });
	    }
	    getPausedItem() {
	        return this.findWhere({ status: 'PAUSED' });
	    }
	    getCurrentItem() {
	        return this.findWhere({ status: 'PLAYING' }) || this.findWhere({ status: 'PAUSED' });
	    }
	    getItem() {
	        let pausedItem = this.getPausedItem();
	        if (pausedItem) {
	            return pausedItem;
	        }
	        let queuedItems = this.getQueuedItems();
	        if (queuedItems.length > 0) {
	            return queuedItems[0];
	        }
	        else {
	            return this.find((playQueueItem) => {
	                return playQueueItem.isScheduled();
	            });
	        }
	    }
	    hasNextItem() {
	        return this.playIndex < this.length - 1;
	    }
	    hasPreviousItem() {
	        return this.playIndex > 0;
	    }
	    hasCurrentItem() {
	        return !!this.getCurrentItem();
	    }
	    getNextItem() {
	        if (this.hasNextItem()) {
	            return this.at(this.playIndex + 1);
	        }
	    }
	    getPreviousItem() {
	        if (this.hasPreviousItem()) {
	            return this.at(this.playIndex - 1);
	        }
	    }
	    addAndPlay(item) {
	        let addItem = this.add(item, { merge: true });
	        addItem.play();
	        return addItem;
	    }
	    queue(item) {
	        if (!(item instanceof play_queue_item_model_1.PlayQueueItem)) {
	            item = new play_queue_item_model_1.PlayQueueItem(item);
	        }
	        if (this.get(item)) {
	            this.remove(item, { silent: true });
	        }
	        item.queue();
	        return this.add(item, { merge: true });
	    }
	    getPlayIndex() {
	        return this.playIndex;
	    }
	    setPlayIndex() {
	        let currentPlaylingItem = this.getCurrentItem();
	        if (currentPlaylingItem) {
	            this.playIndex = this.indexOf(currentPlaylingItem);
	        }
	        return this.playIndex;
	    }
	    ensureQueuingOrder() {
	        let queuedItems = this.getQueuedItems();
	        let incr = this.getCurrentItem() ? 1 : 0;
	        queuedItems.forEach((item, index) => {
	            this.remove(item, { silent: true });
	            this.setPlayIndex();
	            this.add(item, { at: this.getPlayIndex() + index + incr, silent: true, doNothing: true });
	        });
	    }
	    stopScheduledItemsBeforeCurrentItem() {
	        let scheduledItem = this.find((item) => {
	            return item.isScheduled();
	        });
	        if (scheduledItem && this.indexOf(scheduledItem) < this.playIndex) {
	            scheduledItem.stop();
	            this.stopScheduledItemsBeforeCurrentItem();
	        }
	    }
	    scheduleStoppedItemsAfterCurrentItem(scheduledItem) {
	        if (scheduledItem && scheduledItem.isStopped()) {
	            let index = this.indexOf(scheduledItem);
	            if (index > this.playIndex) {
	                scheduledItem.set('status', 'NULL');
	                this.scheduleStoppedItemsAfterCurrentItem(this.at(index - 1));
	            }
	        }
	    }
	    prepareItem(item) {
	        if (!item.id && item instanceof play_queue_item_model_1.PlayQueueItem) {
	            item.set('id', item.get('track').get('id'));
	        }
	        else if (!item.id) {
	            item.id = item.track.id;
	        }
	        return item;
	    }
	    add(item, options = {}) {
	        if (options.doNothing || !item) {
	            return super.add(item, options);
	        }
	        if (underscore_1.isArray(item)) {
	            let addedItems = [];
	            item.forEach((obj) => {
	                addedItems.push(this.prepareItem(obj));
	            });
	            item = addedItems;
	        }
	        else {
	            item = this.prepareItem(item);
	        }
	        item = super.add(item, options);
	        this.ensureQueuingOrder();
	        this.setPlayIndex();
	        return item;
	    }
	    initialize() {
	        this.on('change:status', (queueItem) => {
	            this.setPlayIndex();
	            if (queueItem.isPlaying()) {
	                this.filter((item) => {
	                    return item.isPlaying() || item.isPaused();
	                }).forEach((playingQueueItem) => {
	                    if (playingQueueItem.id !== queueItem.id) {
	                        playingQueueItem.stop();
	                    }
	                });
	                if (this.hasPreviousItem() && this.getPreviousItem().isScheduled()) {
	                    this.stopScheduledItemsBeforeCurrentItem();
	                }
	                this.ensureQueuingOrder();
	            }
	            if (queueItem.isStopped()) {
	                this.scheduleStoppedItemsAfterCurrentItem(queueItem);
	            }
	        });
	        this.on('remove', () => {
	            this.setPlayIndex();
	        });
	    }
	}
	exports.PlayQueue = PlayQueue;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const track_model_1 = __webpack_require__(108);
	const soundcloud_model_1 = __webpack_require__(110);
	class PlayQueueItem extends soundcloud_model_1.SoundcloudModel {
	    defaults() {
	        return {
	            status: 'NULL'
	        };
	    }
	    nested() {
	        return {
	            track: track_model_1.Track
	        };
	    }
	    ;
	    queue() {
	        this.set({
	            status: 'QUEUED'
	        });
	    }
	    unQueue() {
	        this.set({
	            status: 'NULL'
	        });
	        if (this.collection) {
	            let collection = this.collection;
	            collection.remove(this);
	            collection.add(this);
	        }
	    }
	    play() {
	        this.set('status', 'PLAYING');
	    }
	    pause() {
	        this.set('status', 'PAUSED');
	    }
	    stop() {
	        this.set('status', 'STOPPED');
	    }
	    isQueued() {
	        return this.get('status') === 'QUEUED';
	    }
	    isPlaying() {
	        return this.get('status') === 'PLAYING';
	    }
	    isPaused() {
	        return this.get('status') === 'PAUSED';
	    }
	    isStopped() {
	        return this.get('status') === 'STOPPED';
	    }
	    isScheduled() {
	        return this.get('status') === 'NULL';
	    }
	}
	exports.PlayQueueItem = PlayQueueItem;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	(function (CoverSizes) {
	    CoverSizes[CoverSizes["Small"] = 0] = "Small";
	    CoverSizes[CoverSizes["Medium"] = 1] = "Medium";
	    CoverSizes[CoverSizes["Regular"] = 2] = "Regular";
	    CoverSizes[CoverSizes["Large"] = 3] = "Large";
	})(exports.CoverSizes || (exports.CoverSizes = {}));
	var CoverSizes = exports.CoverSizes;
	let TrackCoverComponent = class TrackCoverComponent {
	    constructor() {
	        this.animate = false;
	    }
	    getArtworkUrl() {
	        if (this.track) {
	            let artwork = this.track.get('artwork_url');
	            let artworkUrl;
	            switch (this.size) {
	                case CoverSizes.Small:
	                    artworkUrl = artwork.getSmallSize();
	                    break;
	                case CoverSizes.Medium:
	                    artworkUrl = artwork.getMediumSize();
	                    break;
	                case CoverSizes.Large:
	                    artworkUrl = artwork.getLargeSize();
	                    break;
	                case CoverSizes.Regular:
	                    artworkUrl = artwork.getDefaultSize();
	                    break;
	            }
	            return artworkUrl;
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object)
	], TrackCoverComponent.prototype, "track", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TrackCoverComponent.prototype, "size", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TrackCoverComponent.prototype, "animate", void 0);
	TrackCoverComponent = __decorate([
	    core_1.Component({
	        selector: 'track-cover',
	        styles: [__webpack_require__(128)],
	        template: __webpack_require__(130)
	    }), 
	    __metadata('design:paramtypes', [])
	], TrackCoverComponent);
	exports.TrackCoverComponent = TrackCoverComponent;
	var _a;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(129);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 320px;\n  height: 320px; }\n  :host .track-cover {\n    width: 100%;\n    height: 100%;\n    background: #ddd; }\n    :host .track-cover.hasNoTrack {\n      padding: 10px; }\n    :host .track-cover .cover img {\n      width: 100%;\n      height: 100%; }\n    :host .track-cover .no-track {\n      background: #efefef;\n      padding: 20%;\n      border-radius: 50%;\n      width: 100%;\n      height: 100%; }\n      :host .track-cover .no-track /deep/ cloud-player-logo object {\n        width: 100%; }\n", ""]);

	// exports


/***/ }),
/* 130 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"track-cover\" [class.hasNoTrack]=\"!track || !getArtworkUrl()\">\n  <div *ngIf=\"track && getArtworkUrl()\"\n       class=\"cover\">\n    <img [src]=\"getArtworkUrl()\">\n  </div>\n\n  <div *ngIf=\"!track || !getArtworkUrl()\"\n       class=\"no-track\">\n    <cloud-player-logo [animate]=\"animate\"></cloud-player-logo>\n  </div>\n</div>\n";

/***/ }),
/* 131 */
/***/ (function(module, exports) {

	"use strict";
	(function (OsNames) {
	    OsNames[OsNames["Windows"] = 0] = "Windows";
	    OsNames[OsNames["WindowsMobile"] = 1] = "WindowsMobile";
	    OsNames[OsNames["Android"] = 2] = "Android";
	    OsNames[OsNames["OpenBSD"] = 3] = "OpenBSD";
	    OsNames[OsNames["SunOs"] = 4] = "SunOs";
	    OsNames[OsNames["Linux"] = 5] = "Linux";
	    OsNames[OsNames["iOS"] = 6] = "iOS";
	    OsNames[OsNames["MacOs"] = 7] = "MacOs";
	    OsNames[OsNames["QNX"] = 8] = "QNX";
	    OsNames[OsNames["UNIX"] = 9] = "UNIX";
	    OsNames[OsNames["BeOS"] = 10] = "BeOS";
	    OsNames[OsNames["OS2"] = 11] = "OS2";
	    OsNames[OsNames["SearchBot"] = 12] = "SearchBot";
	    OsNames[OsNames["Electron"] = 13] = "Electron";
	})(exports.OsNames || (exports.OsNames = {}));
	var OsNames = exports.OsNames;
	(function (ClientNames) {
	    ClientNames[ClientNames["Chrome"] = 0] = "Chrome";
	    ClientNames[ClientNames["Safari"] = 1] = "Safari";
	    ClientNames[ClientNames["Firefox"] = 2] = "Firefox";
	    ClientNames[ClientNames["IE"] = 3] = "IE";
	    ClientNames[ClientNames["Edge"] = 4] = "Edge";
	    ClientNames[ClientNames["Opera"] = 5] = "Opera";
	    ClientNames[ClientNames["Electron"] = 6] = "Electron";
	})(exports.ClientNames || (exports.ClientNames = {}));
	var ClientNames = exports.ClientNames;
	class ClientDetector {
	    static test(array) {
	        let result = {};
	        array.forEach((osItem) => {
	            if (osItem.r.test(navigator.userAgent) && !result.name) {
	                result.name = osItem.s;
	                result.version = osItem.v;
	            }
	        });
	        return result;
	    }
	    static getOs() {
	        return ClientDetector.test(ClientDetector.osStrings);
	    }
	    static getClient() {
	        return ClientDetector.test(ClientDetector.clientStrings);
	    }
	    static isMobileDevice() {
	        return ClientDetector.getOs().name === OsNames.Android ||
	            ClientDetector.getOs().name === OsNames.iOS ||
	            ClientDetector.getOs().name === OsNames.WindowsMobile;
	    }
	    static isPhone() {
	        return ClientDetector.isMobileDevice() && window.screen.width < 770;
	    }
	}
	ClientDetector.osStrings = [
	    { s: OsNames.Windows, v: 10, r: /(Windows 10.0|Windows NT 10.0)/ },
	    { s: OsNames.Windows, v: 8.1, r: /(Windows 8.1|Windows NT 6.3)/ },
	    { s: OsNames.Windows, v: 8, r: /(Windows 8|Windows NT 6.2)/ },
	    { s: OsNames.Windows, v: 7, r: /(Windows 7|Windows NT 6.1)/ },
	    { s: OsNames.Windows, v: 6, r: /Windows NT 6.0/ },
	    { s: OsNames.Windows, v: 0, r: /Windows NT 5.2/ },
	    { s: OsNames.Windows, v: 0, r: /(Windows NT 5.1|Windows XP)/ },
	    { s: OsNames.Windows, v: 0, r: /(Windows NT 5.0|Windows 2000)/ },
	    { s: OsNames.Windows, v: 0, r: /(Win 9x 4.90|Windows ME)/ },
	    { s: OsNames.Windows, v: 0, r: /(Windows 98|Win98)/ },
	    { s: OsNames.Windows, v: 0, r: /(Windows 95|Win95|Windows_95)/ },
	    { s: OsNames.Windows, v: 0, r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
	    { s: OsNames.Windows, v: 0, r: /Windows CE/ },
	    { s: OsNames.Windows, v: 0, r: /Win16/ },
	    { s: OsNames.WindowsMobile, v: 0, r: /Windows Phone|iemobile/ },
	    { s: OsNames.Android, v: 0, r: /Android/ },
	    { s: OsNames.OpenBSD, v: 0, r: /OpenBSD/ },
	    { s: OsNames.SunOs, v: 0, r: /SunOS/ },
	    { s: OsNames.Linux, v: 0, r: /(Linux|X11)/ },
	    { s: OsNames.iOS, v: 0, r: /(iPhone|iPad|iPod)/ },
	    { s: OsNames.MacOs, v: 10, r: /Mac OS X/ },
	    { s: OsNames.MacOs, v: 0, r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
	    { s: OsNames.QNX, v: 0, r: /QNX/ },
	    { s: OsNames.UNIX, v: 0, r: /UNIX/ },
	    { s: OsNames.BeOS, v: 0, r: /BeOS/ },
	    { s: OsNames.OS2, v: 0, r: /OS\/2/ },
	    { s: OsNames.SearchBot, v: 0, r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
	    { s: OsNames.Electron, v: 0, r: /Electron/ }
	];
	ClientDetector.clientStrings = [
	    { s: ClientNames.Electron, r: /Electron/ },
	    { s: ClientNames.Chrome, r: /Chrome/ },
	    { s: ClientNames.Safari, r: /Safari/ },
	    { s: ClientNames.Firefox, r: /Firefox/ },
	    { s: ClientNames.IE, r: /(MSIE|Trident)/ },
	    { s: ClientNames.Edge, r: /Edge/ },
	    { s: ClientNames.Opera, r: /OPR/ }
	];
	exports.ClientDetector = ClientDetector;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(133);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n.tracks-list {\n  background: #fcfcfc;\n  padding: 10px 15px;\n  border-radius: 4px;\n  box-shadow: 0 0 8px 0 #c8c8c8; }\n  .tracks-list .track {\n    display: flex;\n    margin: 0 -15px;\n    padding: 20px 15px; }\n    .tracks-list .track:hover {\n      background: #eeeeee; }\n      .tracks-list .track:hover .cover /deep/ play-button .play-button {\n        opacity: 1; }\n    .tracks-list .track:not(:last-child) {\n      border-bottom: 1px solid #eeeeee; }\n    .tracks-list .track .cover {\n      position: relative; }\n      .tracks-list .track .cover track-cover {\n        width: 80px;\n        height: 80px;\n        flex-shrink: 0; }\n      .tracks-list .track .cover play-button {\n        width: 100%;\n        height: 100%; }\n      .tracks-list .track .cover /deep/ play-button .play-button {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: inherit;\n        height: inherit;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(255, 255, 255, 0.5);\n        opacity: 0;\n        transition: opacity 0.5s ease; }\n        .tracks-list .track .cover /deep/ play-button .play-button.isPlaying {\n          opacity: 1; }\n          .tracks-list .track .cover /deep/ play-button .play-button.isPlaying .btn {\n            background: rgba(255, 255, 255, 0.6);\n            color: #ff3600;\n            border-color: #ff3600; }\n        .tracks-list .track .cover /deep/ play-button .play-button .btn {\n          background: rgba(0, 0, 0, 0.2); }\n          .tracks-list .track .cover /deep/ play-button .play-button .btn:hover {\n            background: rgba(255, 255, 255, 0.6);\n            color: #ff3600;\n            border-color: #ff3600; }\n    .tracks-list .track .details {\n      order: 2;\n      flex: auto;\n      margin-left: 15px;\n      overflow: hidden; }\n      .tracks-list .track .details .track-info {\n        display: flex;\n        align-items: center;\n        margin-bottom: 18px; }\n        .tracks-list .track .details .track-info toggle-liked-track {\n          padding-right: 10px; }\n        .tracks-list .track .details .track-info .meta {\n          text-overflow: ellipsis;\n          overflow: hidden;\n          white-space: nowrap;\n          flex-grow: 1; }\n          .tracks-list .track .details .track-info .meta .created {\n            color: #aaa; }\n            .tracks-list .track .details .track-info .meta .created:before {\n              content: '\\2014';\n              margin-left: -2px;\n              margin-right: 2px; }\n        .tracks-list .track .details .track-info .btn-holder {\n          display: flex;\n          align-self: flex-start; }\n          .tracks-list .track .details .track-info .btn-holder .btn {\n            margin: 0;\n            position: relative;\n            display: flex;\n            align-items: center;\n            justify-content: center; }\n            .tracks-list .track .details .track-info .btn-holder .btn .next-icon {\n              font-size: 14px;\n              margin-right: -2px; }\n          .tracks-list .track .details .track-info .btn-holder options-btn {\n            margin: 0 0 0 3px; }\n      .tracks-list .track .details .stats .label-light {\n        border: none; }\n  .tracks-list::-webkit-scrollbar {\n    display: none; }\n\n@media (max-width: 992px) {\n  .tracks-list {\n    box-shadow: none;\n    border-radius: 0; } }\n\n@media (max-width: 768px) {\n  .tracks-list .track {\n    position: relative; }\n    .tracks-list .track .cover track-cover {\n      width: 40px;\n      height: 40px; }\n      .tracks-list .track .cover track-cover.hasNoTrack {\n        padding: 2px; }\n    .tracks-list .track .cover /deep/ track-cover .hasNoTrack {\n      padding: 2px; }\n    .tracks-list .track .cover play-button {\n      width: 40px;\n      height: 40px; }\n    .tracks-list .track .cover /deep/ play-button .btn-round {\n      width: 30px;\n      height: 30px;\n      font-size: 12px;\n      padding: 0 0 0 1px; }\n    .tracks-list .track .details .stats {\n      position: absolute;\n      left: 15px;\n      white-space: nowrap;\n      bottom: 10px; }\n      .tracks-list .track .details .stats .label-light:first-child {\n        padding-left: 0; } }\n", ""]);

	// exports


/***/ }),
/* 134 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"tracks-list\">\n  <sort-tracks [tracks]=\"tracks\"></sort-tracks>\n  <div *ngFor=\"let track of tracks.models | limitCollectionresults: {limit: 10}\" class=\"track\"\n       draggable=\"true\"\n       [dragData]=\"track.toJSON()\"\n       [dragImageUrl]=\"track.get('artwork_url').getSmallSize()\"\n       dragEffect=\"copy\">\n    <div class=\"cover\">\n      <track-cover [track]=\"track\" [size]=\"getSize()\"></track-cover>\n      <play-button [track]=\"track\" [tracks]=\"tracks\"></play-button>\n    </div>\n    <div class=\"details\">\n      <div class=\"track-info\">\n        <toggle-liked-track [track]=\"track\"></toggle-liked-track>\n        <div class=\"meta\"\n             playTrackOn\n             [events]=\"['click']\"\n             [track]=\"track\"\n             [tracks]=\"tracks\">\n          <b class=\"track-title\">{{track.get('title')}}</b>\n          <div class=\"artist\">\n            <span>{{track.get('user').get('username')}}</span>\n            <span class=\"created\">created\n              <span [timeAgo]=\"track.get('created_at')\">{{track.get('created_at')}}</span>\n            </span>\n          </div>\n        </div>\n        <div class=\"btn-holder\">\n          <div class=\"btn btn-xs btn-default\"\n               (click)=\"addToQueue(track)\">\n            <span class=\"fa fa-arrow-circle-o-right next-icon\"></span>\n            <span class=\"fa fa-play\" ></span>\n          </div>\n          <options-btn>\n            <options-btn-option (click)=\"addToQueue(track)\">\n              Add to queue\n            </options-btn-option>\n            <options-btn-option playTrackOn=\"click\" [track]=\"track\" [tracks]=\"tracks\">\n              Play this track and the following ones\n            </options-btn-option>\n            <options-btn-option playTrackOn=\"click\" [track]=\"track\">\n              Play only this track\n            </options-btn-option>\n            <options-btn-option *ngIf=\"canBeDeleted\" (click)=\"track.destroy()\">\n              Remove track\n            </options-btn-option>\n          </options-btn>\n        </div>\n      </div>\n      <div class=\"stats\">\n        <div class=\"duration label label-default label-light\">\n          <i class=\"fa fa-clock-o\" aria-hidden=\"true\" alt=\"play count\"></i>\n          {{track.get('duration')/1000 | hReadableSeconds}}\n        </div>\n        <div class=\"favs label label-default label-light\">\n          <i class=\"fa fa-heart\" aria-hidden=\"true\" alt=\"favouites count\"></i> {{track.get('likes') | kMilShortener}}\n        </div>\n        <div class=\"plays label label-default label-light\">\n          <i class=\"fa fa-play-circle\" aria-hidden=\"true\" alt=\"play count\"></i> {{track.get('playback_count') | kMilShortener}}\n        </div>\n        <div *ngIf=\"track.get('genre')\"\n             class=\"genre label label-default label-light\">\n          #{{track.get('genre')}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	const session_model_1 = __webpack_require__(136);
	const auth_service_1 = __webpack_require__(147);
	const user_analytics_service_1 = __webpack_require__(83);
	let ToggleLikedTrackComponent = class ToggleLikedTrackComponent {
	    constructor(authService, userAnalyticsService) {
	        this.authService = authService;
	        this.userAnalyticsService = userAnalyticsService;
	        this.session = session_model_1.Session.getInstance();
	        this.showAuthenticateTooltip = false;
	    }
	    showConnectTooltip() {
	        this.showAuthenticateTooltip = true;
	        setTimeout(() => {
	            this.showAuthenticateTooltip = false;
	        }, 2000);
	    }
	    hasLikedTrack() {
	        if (this.track && this.track.get('id') && session_model_1.Session.getInstance().get('user').get('likes').length > 0) {
	            return !!session_model_1.Session.getInstance().get('user').get('likes').findWhere({ id: this.track.id });
	        }
	    }
	    connect() {
	        this.authService.connect();
	    }
	    like() {
	        if (this.session.isValid()) {
	            session_model_1.Session.getInstance().get('user').get('likes').create(this.track.toJSON());
	            this.userAnalyticsService.trackEvent('like_track', 'click', 'toggle-like-cmp');
	        }
	        else {
	            this.showConnectTooltip();
	        }
	    }
	    dislike() {
	        let likedTrack = session_model_1.Session.getInstance().get('user').get('likes').get(this.track.toJSON());
	        if (likedTrack) {
	            this.userAnalyticsService.trackEvent('dislike_track', 'click', 'toggle-like-cmp');
	            likedTrack.destroy();
	        }
	    }
	    toggleLike() {
	        if (!this.hasLikedTrack()) {
	            this.like();
	        }
	        else {
	            this.dislike();
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object)
	], ToggleLikedTrackComponent.prototype, "track", void 0);
	ToggleLikedTrackComponent = __decorate([
	    core_1.Component({
	        selector: 'toggle-liked-track',
	        styles: [__webpack_require__(148)],
	        template: __webpack_require__(150),
	        animations: [
	            core_1.trigger('visibilityChanged', [
	                core_1.state('true', core_1.style({ width: '*', opacity: 1 })),
	                core_1.state('false', core_1.style({ width: 0, display: 'none', opacity: 0 })),
	                core_1.state('void', core_1.style({ width: 0, display: 'none', opacity: 0 })),
	                core_1.transition('* => *', core_1.animate('300ms ease-in-out'))
	            ])
	        ]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _b) || Object, (typeof (_c = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _c) || Object])
	], ToggleLikedTrackComponent);
	exports.ToggleLikedTrackComponent = ToggleLikedTrackComponent;
	var _a, _b, _c;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const authenticated_user_model_1 = __webpack_require__(137);
	const session_manager_fn_1 = __webpack_require__(112);
	const soundcloud_model_1 = __webpack_require__(110);
	const localforage = __webpack_require__(146);
	const config_1 = __webpack_require__(111);
	let Session_1 = class Session extends soundcloud_model_1.SoundcloudModel {
	    constructor() {
	        super(...arguments);
	        this.idAttribute = 'access_token';
	    }
	    static getInstance() {
	        if (!Session_1.instance) {
	            Session_1.instance = new Session_1();
	        }
	        return Session_1.instance;
	    }
	    defaults() {
	        return {
	            expires_on: null,
	            refresh_token: null
	        };
	    }
	    ;
	    nested() {
	        return {
	            user: authenticated_user_model_1.AuthenticatedUser
	        };
	    }
	    ;
	    parse(attrs = {}) {
	        if (attrs.expires_on) {
	            attrs.expires_on = parseInt(attrs.expires_on, 10);
	        }
	        return attrs;
	    }
	    compose(attrs = {}) {
	        delete attrs.user;
	        return attrs;
	    }
	    ;
	    saveLocal(options) {
	        localforage.setItem('sc_session', this.toJSON({}));
	    }
	    ;
	    fetchLocal(options) {
	        localforage.getItem('sc_session').then((session) => {
	            if (session) {
	                this.set(session);
	            }
	        });
	        return this;
	    }
	    ;
	    refresh() {
	        if (this.get('refresh_token')) {
	            return this.request(config_1.Config.soundcloudRedirectUrl + '/', 'PUT', {
	                data: {
	                    refresh_token: this.get('refresh_token'),
	                    version: 2
	                }
	            }).then((rsp) => {
	                let data = rsp.json();
	                this.set(data);
	                return this;
	            });
	        }
	        else {
	            return false;
	        }
	    }
	    ;
	    getExpiresIn() {
	        return this.get('expires_on') - (+new Date());
	    }
	    ;
	    isNotExpired() {
	        return this.getExpiresIn() > 0;
	    }
	    ;
	    initialize() {
	        this.on('change:access_token', () => {
	            if (this.get('access_token')) {
	                if (this.isNotExpired()) {
	                    this.get('user').set('authenticated', true);
	                }
	                else {
	                    this.refresh();
	                }
	            }
	            else {
	                this.get('user').set('authenticated', false);
	            }
	            this.saveLocal();
	        });
	        this.on('change:expires_on', () => {
	            if (this.refreshTimer) {
	                clearTimeout(this.refreshTimer);
	            }
	            this.refreshTimer = setTimeout(() => {
	                this.refresh();
	            }, this.getExpiresIn() - 1000);
	        });
	        this.fetchLocal();
	    }
	    ;
	    isValid() {
	        return this.get('access_token') && this.isNotExpired();
	    }
	};
	let Session = Session_1;
	Session = Session_1 = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Session);
	exports.Session = Session;
	session_manager_fn_1.setSession(Session.getInstance());


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_model_1 = __webpack_require__(109);
	const underscore_1 = __webpack_require__(67);
	const authenticated_user_liked_tracks_collection_1 = __webpack_require__(138);
	const authenticated_user_playlists_collection_1 = __webpack_require__(140);
	let AuthenticatedUser = class AuthenticatedUser extends user_model_1.User {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me';
	    }
	    nested() {
	        return underscore_1.extend(super.nested(), {
	            playlists: authenticated_user_playlists_collection_1.AuthenticatedUserPlaylists,
	            likes: authenticated_user_liked_tracks_collection_1.AuthenticatedUserLikedTracks
	        });
	    }
	    defaults() {
	        return underscore_1.extend(super.defaults(), {
	            authenticated: false
	        });
	    }
	};
	AuthenticatedUser = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUser);
	exports.AuthenticatedUser = AuthenticatedUser;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const authenticated_user_liked_track_model_1 = __webpack_require__(139);
	const soundcloud_collection_1 = __webpack_require__(115);
	let AuthenticatedUserLikedTracks = class AuthenticatedUserLikedTracks extends soundcloud_collection_1.SoundcloudCollection {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me/favorites';
	        this.model = authenticated_user_liked_track_model_1.AuthenticatedUserLikedTrack;
	    }
	};
	AuthenticatedUserLikedTracks = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserLikedTracks);
	exports.AuthenticatedUserLikedTracks = AuthenticatedUserLikedTracks;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	let AuthenticatedUserLikedTrack = class AuthenticatedUserLikedTrack extends track_model_1.Track {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me/favorites';
	    }
	};
	AuthenticatedUserLikedTrack = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserLikedTrack);
	exports.AuthenticatedUserLikedTrack = AuthenticatedUserLikedTrack;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const playlists_collection_1 = __webpack_require__(141);
	const authenticated_user_playlist_model_1 = __webpack_require__(143);
	let AuthenticatedUserPlaylists = class AuthenticatedUserPlaylists extends playlists_collection_1.Playlists {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me/playlists';
	        this.model = authenticated_user_playlist_model_1.AuthenticatedUserPlaylist;
	    }
	};
	AuthenticatedUserPlaylists = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserPlaylists);
	exports.AuthenticatedUserPlaylists = AuthenticatedUserPlaylists;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const playlist_model_1 = __webpack_require__(142);
	const core_1 = __webpack_require__(3);
	const soundcloud_collection_1 = __webpack_require__(115);
	let Playlists = class Playlists extends soundcloud_collection_1.SoundcloudCollection {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/playlists';
	        this.model = playlist_model_1.Playlist;
	    }
	};
	Playlists = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Playlists);
	exports.Playlists = Playlists;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_model_1 = __webpack_require__(109);
	const tracks_collection_1 = __webpack_require__(124);
	const underscore_1 = __webpack_require__(67);
	const soundcloud_model_1 = __webpack_require__(110);
	const soundcloud_image_model_1 = __webpack_require__(113);
	let Playlist = class Playlist extends soundcloud_model_1.SoundcloudModel {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/playlists';
	    }
	    defaults() {
	        return {
	            title: '',
	            isPublic: false
	        };
	    }
	    ;
	    nested() {
	        return {
	            user: user_model_1.User,
	            tracks: tracks_collection_1.Tracks,
	            artwork_url: soundcloud_image_model_1.SoundcloudImageModel
	        };
	    }
	    ;
	    parse(attrs) {
	        if (attrs.sharing === 'public') {
	            attrs.isPublic = true;
	        }
	        else {
	            attrs.isPublic = false;
	        }
	        delete attrs.sharing;
	        if (!attrs.artwork_url && attrs.tracks.length > 0) {
	            attrs.artwork_url = attrs.tracks[0].artwork_url;
	        }
	        return attrs;
	    }
	    compose(attrs) {
	        return {
	            playlist: {
	                title: attrs.title,
	                sharing: attrs.isPublic ? 'public' : 'private',
	                tracks: underscore_1.map(this.get('tracks').toJSON(), (obj) => {
	                    return { id: obj.id };
	                })
	            }
	        };
	    }
	};
	Playlist = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], Playlist);
	exports.Playlist = Playlist;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const playlist_model_1 = __webpack_require__(142);
	const underscore_1 = __webpack_require__(67);
	const authenticated_user_playlist_tracks_collection_1 = __webpack_require__(144);
	let AuthenticatedUserPlaylist = class AuthenticatedUserPlaylist extends playlist_model_1.Playlist {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me/playlists';
	    }
	    nested() {
	        return underscore_1.extend(super.nested(), {
	            tracks: authenticated_user_playlist_tracks_collection_1.AuthenticatedUserPlaylistTracks
	        });
	    }
	    setTracksEndpoint() {
	        if (this.id) {
	            this.get('tracks').setEndpoint(this.id);
	        }
	    }
	    initialize() {
	        this.get('tracks').on('save', () => {
	            this.save();
	        });
	        this.setTracksEndpoint();
	        this.on('change:id', this.setTracksEndpoint, this);
	    }
	    ;
	};
	AuthenticatedUserPlaylist = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserPlaylist);
	exports.AuthenticatedUserPlaylist = AuthenticatedUserPlaylist;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracks_collection_1 = __webpack_require__(124);
	const authenticated_user_playlist_track_model_1 = __webpack_require__(145);
	let AuthenticatedUserPlaylistTracks = class AuthenticatedUserPlaylistTracks extends tracks_collection_1.Tracks {
	    constructor() {
	        super(...arguments);
	        this.model = authenticated_user_playlist_track_model_1.AuthenticatedUserPlaylistTrack;
	        this.queryParams = {};
	    }
	    parse(attrs) {
	        return attrs.tracks;
	    }
	    create(track) {
	        this.add(track);
	        this.triggerSave(track);
	        return track;
	    }
	    triggerSave(track) {
	        this.trigger('save', track, this);
	    }
	    setEndpoint(playlistId) {
	        this.endpoint = `/me/playlists/${playlistId}`;
	    }
	};
	AuthenticatedUserPlaylistTracks = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserPlaylistTracks);
	exports.AuthenticatedUserPlaylistTracks = AuthenticatedUserPlaylistTracks;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	let AuthenticatedUserPlaylistTrack = class AuthenticatedUserPlaylistTrack extends track_model_1.Track {
	    constructor() {
	        super(...arguments);
	        this.endpoint = '/me/playlists';
	    }
	    destroy() {
	        if (this.collection) {
	            let collection = this.collection;
	            collection.remove(this);
	            collection.triggerSave(this);
	        }
	    }
	    ;
	    save() {
	        if (this.collection) {
	            this.collection.add(this.toJSON(), { merge: true });
	            this.collection.triggerSave(this);
	        }
	    }
	};
	AuthenticatedUserPlaylistTrack = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserPlaylistTrack);
	exports.AuthenticatedUserPlaylistTrack = AuthenticatedUserPlaylistTrack;


/***/ }),
/* 146 */,
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const session_model_1 = __webpack_require__(136);
	const localforage = __webpack_require__(146);
	const user_analytics_service_1 = __webpack_require__(83);
	const config_1 = __webpack_require__(111);
	let AuthService = class AuthService {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.session = session_model_1.Session.getInstance();
	        window.addEventListener('message', this.receiveConnectMessage.bind(this), false);
	        window.addEventListener('connectionSuccessFul', (ev) => {
	            let creds = ev.detail;
	            if (creds) {
	                try {
	                    creds = JSON.parse(creds);
	                }
	                catch (err) {
	                }
	                this.connectionSuccessFul(creds);
	            }
	        });
	    }
	    receiveConnectMessage(event) {
	        let origin = event.origin || event.originalEvent.origin;
	        if (origin !== config_1.Config.soundcloudRedirectDomain) {
	            return;
	        }
	        this.connectionSuccessFul(event.data);
	    }
	    getConnectionUrl() {
	        return '//soundcloud.com/connect?' +
	            'client_id=' + config_1.Config.soundcloudClientId + '&' +
	            'redirect_uri=' + config_1.Config.soundcloudRedirectUrl + '&' +
	            'response_type=code&' +
	            'state=v2';
	    }
	    connect() {
	        this.userAnalyticsService.trackEvent('sc_auth_start', 'click', 'auth-service');
	        let popup = window.open(this.getConnectionUrl());
	        this.checkInterval = setInterval(() => {
	            popup.postMessage(null, config_1.Config.soundcloudRedirectDomain);
	        }, 100);
	    }
	    disconnect() {
	        this.userAnalyticsService.trackEvent('sc_auth_disconnect', 'click', 'auth-service');
	        this.session.clear();
	        localforage.removeItem('sc_session');
	    }
	    connectionSuccessFul(params) {
	        this.userAnalyticsService.trackEvent('sc_auth_success', 'click', 'auth-service');
	        this.session.set({
	            access_token: params.access_token,
	            expires_on: params.expires_on,
	            refresh_token: params.refresh_token
	        });
	    }
	};
	AuthService = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _a) || Object])
	], AuthService);
	exports.AuthService = AuthService;
	var _a;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(149);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  cursor: pointer; }\n  :host .toggle-liked-track {\n    position: relative; }\n    :host .toggle-liked-track .not-authenticated {\n      position: absolute;\n      left: 20px;\n      top: -7px;\n      width: 263px;\n      background: #ff3600;\n      color: #222222;\n      padding: 5px;\n      border-radius: 4px;\n      white-space: nowrap; }\n      :host .toggle-liked-track .not-authenticated a {\n        color: white; }\n", ""]);

	// exports


/***/ }),
/* 150 */
/***/ (function(module, exports) {

	module.exports = "<span class=\"toggle-liked-track\">\n  <i class=\"fa\"\n     [class.fa-heart]=\"hasLikedTrack()\"\n     [class.fa-heart-o]=\"!hasLikedTrack()\"\n     aria-hidden=\"true\"\n     (click)=\"toggleLike()\"></i>\n\n  <div class=\"not-authenticated\" [@visibilityChanged]=\"showAuthenticateTooltip\">\n    <a (click)=\"connect()\">Connect with SoundCloud</a> to like tracks\n  </div>\n</span>\n";

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	const tracks_collection_1 = __webpack_require__(124);
	const play_queue_collection_1 = __webpack_require__(125);
	let PlayButtonComponent = class PlayButtonComponent {
	    constructor() {
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	    }
	    isPlaying() {
	        let playingItem = this.playQueue.getPlayingItem();
	        return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object)
	], PlayButtonComponent.prototype, "track", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_b = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _b) || Object)
	], PlayButtonComponent.prototype, "tracks", void 0);
	PlayButtonComponent = __decorate([
	    core_1.Component({
	        selector: 'play-button',
	        styles: [__webpack_require__(152)],
	        template: __webpack_require__(154)
	    }), 
	    __metadata('design:paramtypes', [])
	], PlayButtonComponent);
	exports.PlayButtonComponent = PlayButtonComponent;
	var _a, _b;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(153);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ }),
/* 154 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"play-button\"\n     [class.isPlaying]=\"isPlaying()\"\n     playTrackOn=\"click\"\n     [track]=\"track\"\n     [tracks]=\"tracks\">\n  <button class=\"btn btn-round btn-brand\" *ngIf=\"!isPlaying()\">\n    <i class=\"fa fa-play play\"></i>\n  </button>\n  <button class=\"btn btn-round btn-brand\" *ngIf=\"isPlaying()\">\n    <i class=\"fa fa-pause\"></i>\n  </button>\n</div>\n";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	const tracks_collection_1 = __webpack_require__(124);
	const play_queue_collection_1 = __webpack_require__(125);
	let QueueButtonComponent = class QueueButtonComponent {
	    constructor() {
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	    }
	    isQueued() {
	        let queuedItems = this.playQueue.getQueuedItems();
	        if (queuedItems && queuedItems.find((item) => {
	            return item.get('track').get('id') === this.track.id;
	        })) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    queue() {
	        this.playQueue.queue({ track: this.track });
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object)
	], QueueButtonComponent.prototype, "track", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_b = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _b) || Object)
	], QueueButtonComponent.prototype, "tracks", void 0);
	QueueButtonComponent = __decorate([
	    core_1.Component({
	        selector: 'queue-button',
	        styles: [__webpack_require__(156)],
	        template: __webpack_require__(158)
	    }), 
	    __metadata('design:paramtypes', [])
	], QueueButtonComponent);
	exports.QueueButtonComponent = QueueButtonComponent;
	var _a, _b;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(157);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 157 */
153,
/* 158 */
/***/ (function(module, exports) {

	module.exports = "<button class=\"btn btn-round btn-primary\" *ngIf=\"!isQueued()\" (click)=\"queue()\" title=\"Add to Queue\">\n  <i class=\"fa fa-history\"></i>\n</button>\n";

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracks_collection_1 = __webpack_require__(124);
	let SortTracksComponent = class SortTracksComponent {
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _a) || Object)
	], SortTracksComponent.prototype, "tracks", void 0);
	SortTracksComponent = __decorate([
	    core_1.Component({
	        selector: 'sort-tracks',
	        styles: [__webpack_require__(160)],
	        template: __webpack_require__(162)
	    }), 
	    __metadata('design:paramtypes', [])
	], SortTracksComponent);
	exports.SortTracksComponent = SortTracksComponent;
	var _a;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(161);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "div.sort-tracks {\n  display: flex; }\n  div.sort-tracks collection-sort {\n    flex: auto 0 0;\n    display: inline-flex; }\n    div.sort-tracks collection-sort:before, div.sort-tracks collection-sort:after {\n      content: '';\n      margin: 0 2px; }\n", ""]);

	// exports


/***/ }),
/* 162 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"sort-tracks\">\n  <span class=\"sort-by visible-xs\">\n    <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n  </span>\n  <span class=\"sort-by sort-by-tracks hidden-xs\">\n    Sort tracks by:\n  </span>\n  <collection-sort [collection]=\"tracks\" [label]=\"'None'\"></collection-sort>\n  |\n  <collection-sort [collection]=\"tracks\" [comparator]=\"'duration'\" [label]=\"'Duration'\"></collection-sort>\n  |\n  <collection-sort [collection]=\"tracks\" [comparator]=\"'likes'\" [label]=\"'Likes'\"></collection-sort>\n  |\n  <collection-sort [collection]=\"tracks\" [comparator]=\"'playback_count'\" [label]=\"'Plays'\"></collection-sort>\n  |\n  <collection-sort [collection]=\"tracks\" [comparator]=\"'created_at'\" [label]=\"'Created'\"></collection-sort>\n</div>\n";

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let RangeSliderComponent = class RangeSliderComponent {
	    constructor(el) {
	        this.el = el;
	        this.tmpVal = 0;
	        this.val = 0;
	        this.minVal = 0;
	        this.maxVal = 0;
	        this.stepVal = 0.1;
	        this.showLoadingSpinner = false;
	        this.dragInProgress = false;
	        this.dragDisplayValue = 0;
	        this.draggerWidth = 0;
	        this.valueChange = new core_1.EventEmitter();
	        this.valueChanged = new core_1.EventEmitter();
	    }
	    get tmpValue() {
	        return this.tmpVal;
	    }
	    set tmpValue(val) {
	        this.tmpVal = val;
	        this.setDragPosFromVal();
	        this.dragDisplayValue = this.getDisplayValue(val);
	        this.valueChange.emit(val);
	    }
	    get value() {
	        return this.val;
	    }
	    set value(val) {
	        if (!this.dragInProgress) {
	            this.val = val;
	            this.tmpValue = val;
	        }
	    }
	    get max() {
	        return this.maxVal;
	    }
	    set max(val) {
	        if (val) {
	            this.maxVal = val;
	            this.setDragPosFromVal();
	        }
	    }
	    get min() {
	        return this.minVal;
	    }
	    set min(val) {
	        if (val) {
	            this.minVal = val;
	            this.setDragPosFromVal();
	        }
	    }
	    get step() {
	        return this.stepVal;
	    }
	    set step(val) {
	        if (val) {
	            this.stepVal = val;
	        }
	    }
	    get isLoading() {
	        return this.showLoadingSpinner;
	    }
	    set isLoading(val) {
	        this.showLoadingSpinner = val;
	    }
	    getDisplayValue(value) {
	        if (value && typeof this.transformDisplayValue === "function") {
	            return this.transformDisplayValue(value);
	        }
	        else {
	            return value;
	        }
	    }
	    setDragPosFromVal() {
	        let pos = (((this.tmpVal - this.min) / (this.max - this.min)) * 100);
	        this.handle.nativeElement.style.left = pos + '%';
	        this.handle.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * pos) + 'px)';
	        this.progressBarLine.nativeElement.style.width = pos + '%';
	    }
	    ngAfterContentInit() {
	        this.el.nativeElement.addEventListener('mousedown', () => {
	            this.draggerWidth = this.handle.nativeElement.offsetWidth;
	            this.dragInProgress = true;
	        });
	        this.el.nativeElement.addEventListener('mouseup', () => {
	            this.dragInProgress = false;
	            this.value = this.tmpValue;
	            this.valueChanged.emit(this.value);
	        });
	        this.setDragPosFromVal();
	    }
	    ;
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], RangeSliderComponent.prototype, "valueChange", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], RangeSliderComponent.prototype, "valueChanged", void 0);
	__decorate([
	    core_1.ViewChild('progressLine'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], RangeSliderComponent.prototype, "progressBarLine", void 0);
	__decorate([
	    core_1.ViewChild('progressBar'), 
	    __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
	], RangeSliderComponent.prototype, "progressBarBg", void 0);
	__decorate([
	    core_1.ViewChild('handle'), 
	    __metadata('design:type', (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object)
	], RangeSliderComponent.prototype, "handle", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Object)
	], RangeSliderComponent.prototype, "transformDisplayValue", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], RangeSliderComponent.prototype, "hideSliderValue", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], RangeSliderComponent.prototype, "showCurrentValue", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], RangeSliderComponent.prototype, "value", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], RangeSliderComponent.prototype, "max", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], RangeSliderComponent.prototype, "min", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], RangeSliderComponent.prototype, "step", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], RangeSliderComponent.prototype, "isLoading", null);
	RangeSliderComponent = __decorate([
	    core_1.Component({
	        selector: 'range-slider',
	        styles: [__webpack_require__(164)],
	        template: __webpack_require__(166)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object])
	], RangeSliderComponent);
	exports.RangeSliderComponent = RangeSliderComponent;
	var _a, _b, _c, _d;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(165);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".range-slider-component {\n  position: relative;\n  margin: 10px 0;\n  display: flex;\n  align-items: center; }\n  .range-slider-component .min-value {\n    margin-right: 5px; }\n  .range-slider-component .progress-bar {\n    width: 100%;\n    background: #ccc;\n    position: relative;\n    height: 5px;\n    border-radius: 5px;\n    flex-grow: 1;\n    box-shadow: none; }\n    .range-slider-component .progress-bar .progress-line {\n      width: 0;\n      background: #ff3600;\n      position: absolute;\n      left: 0;\n      top: 0;\n      height: 100%;\n      border-radius: 5px; }\n    .range-slider-component .progress-bar .visible-dragger {\n      width: 14px;\n      height: 14px;\n      border-radius: 50%;\n      background: white;\n      position: absolute;\n      top: -5px;\n      opacity: 0;\n      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.46);\n      transition: border-radius 0.5s ease;\n      cursor: pointer;\n      cursor: -webkit-grab;\n      pointer-events: none;\n      z-index: 99999; }\n    .range-slider-component .progress-bar input[type=\"range\"] {\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-webkit-slider-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -webkit-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-moz-range-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -moz-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-ms-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: pointer; }\n  .range-slider-component .max-value {\n    margin-left: 5px; }\n  .range-slider-component:hover .progress-bar .visible-dragger, .range-slider-component.is-loading .progress-bar .visible-dragger, .range-slider-component.is-dragging .progress-bar .visible-dragger {\n    opacity: 1; }\n  .range-slider-component.is-loading .progress-bar .visible-dragger .loading-spinner {\n    display: block; }\n  .range-slider-component.is-dragging .progress-bar .visible-dragger.display-value {\n    width: initial;\n    height: initial;\n    font-size: 10px;\n    border-radius: 5px;\n    top: -8px;\n    padding: 0 4px;\n    color: black; }\n  .range-slider-component.is-dragging .progress-bar .visible-dragger .loading-spinner {\n    display: none; }\n\n.loading-spinner {\n  border: 0 solid #f70;\n  border-radius: 50%;\n  position: relative;\n  animation: loader-figure 1.15s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;\n  transform: translate(3px, 3px);\n  display: none; }\n\n@keyframes loader-figure {\n  0% {\n    width: 0;\n    height: 0;\n    left: 4px;\n    top: 4px;\n    background-color: #f70; }\n  29% {\n    background-color: #f70; }\n  30% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n    border-width: 4px;\n    opacity: 1; }\n  100% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    border-width: 0;\n    opacity: 0;\n    background-color: transparent; } }\n", ""]);

	// exports


/***/ }),
/* 166 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"range-slider-component\" [class.is-loading]=\"showLoadingSpinner\" [class.is-dragging]=\"dragInProgress\">\n  <div *ngIf=\"!hideSliderValue && min !== null\"\n       class=\"min-value\">\n    <span *ngIf=\"showCurrentValue\">\n      {{getDisplayValue(value)}}\n    </span>\n    <span *ngIf=\"!showCurrentValue\">\n      {{getDisplayValue(min)}}\n    </span>\n  </div>\n\n  <div #progressBar class=\"progress-bar\">\n    <div #progressLine class=\"progress-line\"></div>\n    <div #handle class=\"visible-dragger\" [class.display-value]=\"!hideSliderValue\">\n      <span *ngIf=\"dragInProgress && !hideSliderValue\">{{dragDisplayValue}}</span>\n      <div class=\"loading-spinner\"></div>\n    </div>\n    <input type=\"range\" [min]=\"min\" [max]=\"max\" [(ngModel)]=\"tmpValue\" [step]=\"step\">\n  </div>\n\n  <div *ngIf=\"!hideSliderValue && max !== null\"\n       class=\"max-value\">\n    {{getDisplayValue(max)}}\n  </div>\n</div>\n";

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let DraggableDirective = class DraggableDirective {
	    constructor(el, renderer) {
	        this.el = el;
	        this.renderer = renderer;
	    }
	    onDragStart(event) {
	        let transfer = event.dataTransfer;
	        if (this.dragData) {
	            try {
	                transfer.setData('text', JSON.stringify(this.dragData));
	            }
	            catch (err) {
	                throw new Error('DragData has to be a JSON object!');
	            }
	        }
	        if (this.image && this.imageIsLoaded) {
	            transfer.setDragImage(this.image, 10, 10);
	        }
	        if (this.dragEffect) {
	            transfer.effectAllowed = this.dragEffect;
	        }
	        this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', true);
	    }
	    onDragEnd() {
	        this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', false);
	    }
	    onMouseOver() {
	        if (this.dragImageUrl && (!this.image || this.image.src !== this.dragImageUrl)) {
	            this.image = new Image();
	            this.image.src = this.dragImageUrl;
	            this.imageIsLoaded = false;
	            this.image.onload = () => {
	                this.imageIsLoaded = true;
	            };
	        }
	    }
	};
	__decorate([
	    core_1.Input('dragData'), 
	    __metadata('design:type', Object)
	], DraggableDirective.prototype, "dragData", void 0);
	__decorate([
	    core_1.Input('dragImageUrl'), 
	    __metadata('design:type', String)
	], DraggableDirective.prototype, "dragImageUrl", void 0);
	__decorate([
	    core_1.Input('dragEffect'), 
	    __metadata('design:type', String)
	], DraggableDirective.prototype, "dragEffect", void 0);
	__decorate([
	    core_1.HostListener('dragstart', ['$event']), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', void 0)
	], DraggableDirective.prototype, "onDragStart", null);
	__decorate([
	    core_1.HostListener('dragend'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', []), 
	    __metadata('design:returntype', void 0)
	], DraggableDirective.prototype, "onDragEnd", null);
	__decorate([
	    core_1.HostListener('mouseover'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', []), 
	    __metadata('design:returntype', void 0)
	], DraggableDirective.prototype, "onMouseOver", null);
	DraggableDirective = __decorate([
	    core_1.Directive({
	        selector: '[draggable]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	], DraggableDirective);
	exports.DraggableDirective = DraggableDirective;
	var _a, _b;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let DropZoneDirective = class DropZoneDirective {
	    constructor(el, renderer) {
	        this.el = el;
	        this.renderer = renderer;
	    }
	    onDragEnter() {
	        this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
	        clearTimeout(this.leaveTimeout);
	    }
	    onDragOver(event) {
	        event.preventDefault();
	        this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
	        clearTimeout(this.leaveTimeout);
	    }
	    onDragLeave() {
	        this.leaveTimeout = setTimeout(() => {
	            this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
	        }, 100);
	    }
	    onMouseOver(event) {
	        if (this.dropCallback) {
	            let args = [this.getDragData(event)];
	            if (this.dropItemRef) {
	                args.push(this.dropItemRef);
	            }
	            args.push(event);
	            this.dropCallback.apply(this, args);
	        }
	        this.leaveTimeout = setTimeout(() => {
	            this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
	        }, 100);
	    }
	    getDragData(event) {
	        let text = event.dataTransfer.getData('text');
	        if (text) {
	            return JSON.parse(text);
	        }
	    }
	    ;
	};
	__decorate([
	    core_1.Input('dropCallback'), 
	    __metadata('design:type', Object)
	], DropZoneDirective.prototype, "dropCallback", void 0);
	__decorate([
	    core_1.Input('dropItemRef'), 
	    __metadata('design:type', Object)
	], DropZoneDirective.prototype, "dropItemRef", void 0);
	__decorate([
	    core_1.HostListener('dragenter', ['$event']), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', []), 
	    __metadata('design:returntype', void 0)
	], DropZoneDirective.prototype, "onDragEnter", null);
	__decorate([
	    core_1.HostListener('dragover', ['$event']), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', void 0)
	], DropZoneDirective.prototype, "onDragOver", null);
	__decorate([
	    core_1.HostListener('dragleave'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', []), 
	    __metadata('design:returntype', void 0)
	], DropZoneDirective.prototype, "onDragLeave", null);
	__decorate([
	    core_1.HostListener('drop', ['$event']), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object]), 
	    __metadata('design:returntype', void 0)
	], DropZoneDirective.prototype, "onMouseOver", null);
	DropZoneDirective = __decorate([
	    core_1.Directive({
	        selector: '[dropzone]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	], DropZoneDirective);
	exports.DropZoneDirective = DropZoneDirective;
	var _a, _b;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const underscore_1 = __webpack_require__(67);
	let TwoRangeSliderComponent = class TwoRangeSliderComponent {
	    constructor(el) {
	        this.el = el;
	        this._tmpMinValue = 0;
	        this._tmpMaxValue = 0;
	        this._minValue = 0;
	        this._maxValue = 0;
	        this._min = 0;
	        this._max = 0;
	        this._step = 0.1;
	        this.showLoadingSpinner = false;
	        this.dragInProgress = false;
	        this.dragHandleMinDisplayValue = 0;
	        this.dragHandleMaxDisplayValue = 0;
	        this.draggerWidth = 0;
	        this.minValueChange = new core_1.EventEmitter();
	        this.minValueChanged = new core_1.EventEmitter();
	        this.maxValueChange = new core_1.EventEmitter();
	        this.maxValueChanged = new core_1.EventEmitter();
	    }
	    get tmpMinValue() {
	        return this._tmpMinValue;
	    }
	    set tmpMinValue(val) {
	        let maxVal = underscore_1.isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
	        if (val >= maxVal) {
	            return;
	        }
	        if (this.allowInfinityMin && val === this.min) {
	            val = null;
	        }
	        this._tmpMinValue = val;
	        this.setDragPosFromVal();
	        this.dragHandleMinDisplayValue = this.getDisplayValue(val);
	        this.minValueChange.emit(val);
	    }
	    get tmpMaxValue() {
	        return this._tmpMaxValue;
	    }
	    set tmpMaxValue(val) {
	        let minVal = underscore_1.isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
	        if (val <= minVal) {
	            return;
	        }
	        if (this.allowInfinityMax && val === this.max) {
	            val = null;
	        }
	        this._tmpMaxValue = val;
	        this.setDragPosFromVal();
	        this.dragHandleMaxDisplayValue = this.getDisplayValue(val);
	        this.maxValueChange.emit(val);
	    }
	    get minValue() {
	        return this._minValue;
	    }
	    set minValue(val) {
	        if (!this.dragInProgress) {
	            this._minValue = val;
	            this.tmpMinValue = val;
	        }
	    }
	    get maxValue() {
	        return this._maxValue;
	    }
	    set maxValue(val) {
	        if (!this.dragInProgress) {
	            this._maxValue = val;
	            this.tmpMaxValue = val;
	        }
	    }
	    get max() {
	        return this._max;
	    }
	    set max(val) {
	        if (val) {
	            this._max = val;
	            this.setDragPosFromVal();
	        }
	    }
	    get min() {
	        return this._min;
	    }
	    set min(val) {
	        if (val) {
	            this._min = val;
	            this.setDragPosFromVal();
	        }
	    }
	    get step() {
	        return this._step;
	    }
	    set step(val) {
	        if (val) {
	            this._step = val;
	        }
	    }
	    get isLoading() {
	        return this.showLoadingSpinner;
	    }
	    set isLoading(val) {
	        this.showLoadingSpinner = val;
	    }
	    getDisplayValue(value) {
	        if (value && typeof this.transformDisplayValue === "function") {
	            return this.transformDisplayValue(value);
	        }
	        else {
	            return value;
	        }
	    }
	    setDragPosFromVal() {
	        let minVal = underscore_1.isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
	        let posMin = (((minVal - this.min) / (this.max - this.min)) * 100);
	        let maxVal = underscore_1.isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
	        let posMax = (((maxVal - this.min) / (this.max - this.min)) * 100);
	        this.handleOne.nativeElement.style.left = posMin + '%';
	        this.handleOne.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMin) + 'px)';
	        this.handleTwo.nativeElement.style.left = posMax + '%';
	        this.handleTwo.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMax) + 'px)';
	        this.progressLine.nativeElement.style.left = posMin + '%';
	        this.progressLine.nativeElement.style.width = (posMax - posMin) + '%';
	    }
	    ngAfterContentInit() {
	        this.el.nativeElement.addEventListener('mousedown', () => {
	            this.draggerWidth = this.handleOne.nativeElement.offsetWidth;
	            this.dragInProgress = true;
	        });
	        this.el.nativeElement.addEventListener('mouseup', () => {
	            this.dragInProgress = false;
	            if (this.minValue !== this.tmpMinValue) {
	                this.minValue = this.tmpMinValue;
	                this.minValueChanged.emit(this.minValue);
	            }
	            if (this.maxValue !== this.tmpMaxValue) {
	                this.maxValue = this.tmpMaxValue;
	                this.maxValueChanged.emit(this.maxValue);
	            }
	            this.sliderOne.nativeElement.value = underscore_1.isNumber(this._tmpMinValue) ? this._tmpMinValue : this.min;
	            this.sliderTwo.nativeElement.value = underscore_1.isNumber(this._tmpMaxValue) ? this._tmpMaxValue : this.max;
	        });
	        this.setDragPosFromVal();
	    }
	    ;
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], TwoRangeSliderComponent.prototype, "minValueChange", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], TwoRangeSliderComponent.prototype, "minValueChanged", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], TwoRangeSliderComponent.prototype, "maxValueChange", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], TwoRangeSliderComponent.prototype, "maxValueChanged", void 0);
	__decorate([
	    core_1.ViewChild('progressBar'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], TwoRangeSliderComponent.prototype, "progressBar", void 0);
	__decorate([
	    core_1.ViewChild('progressLine'), 
	    __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
	], TwoRangeSliderComponent.prototype, "progressLine", void 0);
	__decorate([
	    core_1.ViewChild('handleOne'), 
	    __metadata('design:type', (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object)
	], TwoRangeSliderComponent.prototype, "handleOne", void 0);
	__decorate([
	    core_1.ViewChild('handleTwo'), 
	    __metadata('design:type', (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object)
	], TwoRangeSliderComponent.prototype, "handleTwo", void 0);
	__decorate([
	    core_1.ViewChild('sliderOne'), 
	    __metadata('design:type', (typeof (_e = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _e) || Object)
	], TwoRangeSliderComponent.prototype, "sliderOne", void 0);
	__decorate([
	    core_1.ViewChild('sliderTwo'), 
	    __metadata('design:type', (typeof (_f = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _f) || Object)
	], TwoRangeSliderComponent.prototype, "sliderTwo", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Object)
	], TwoRangeSliderComponent.prototype, "transformDisplayValue", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TwoRangeSliderComponent.prototype, "hideSliderValue", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TwoRangeSliderComponent.prototype, "allowInfinityMin", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TwoRangeSliderComponent.prototype, "allowInfinityMax", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TwoRangeSliderComponent.prototype, "minValue", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TwoRangeSliderComponent.prototype, "maxValue", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TwoRangeSliderComponent.prototype, "max", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TwoRangeSliderComponent.prototype, "min", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], TwoRangeSliderComponent.prototype, "step", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], TwoRangeSliderComponent.prototype, "isLoading", null);
	TwoRangeSliderComponent = __decorate([
	    core_1.Component({
	        selector: 'two-range-slider',
	        styles: [__webpack_require__(170)],
	        template: __webpack_require__(172)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_g = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _g) || Object])
	], TwoRangeSliderComponent);
	exports.TwoRangeSliderComponent = TwoRangeSliderComponent;
	var _a, _b, _c, _d, _e, _f, _g;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(171);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".range-slider-component, .two-range-slider-component {\n  position: relative;\n  margin: 10px 0;\n  display: flex;\n  align-items: center; }\n  .range-slider-component .min-value, .two-range-slider-component .min-value {\n    margin-right: 5px; }\n  .range-slider-component .progress-bar, .two-range-slider-component .progress-bar {\n    width: 100%;\n    background: #ccc;\n    position: relative;\n    height: 5px;\n    border-radius: 5px;\n    flex-grow: 1;\n    box-shadow: none; }\n    .range-slider-component .progress-bar .progress-line, .two-range-slider-component .progress-bar .progress-line {\n      width: 0;\n      background: #ff3600;\n      position: absolute;\n      left: 0;\n      top: 0;\n      height: 100%;\n      border-radius: 5px; }\n    .range-slider-component .progress-bar .visible-dragger, .two-range-slider-component .progress-bar .visible-dragger {\n      width: 14px;\n      height: 14px;\n      border-radius: 50%;\n      background: white;\n      position: absolute;\n      top: -5px;\n      opacity: 0;\n      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.46);\n      transition: border-radius 0.5s ease;\n      cursor: pointer;\n      cursor: -webkit-grab;\n      pointer-events: none;\n      z-index: 99999; }\n    .range-slider-component .progress-bar input[type=\"range\"], .two-range-slider-component .progress-bar input[type=\"range\"] {\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-webkit-slider-thumb, .two-range-slider-component .progress-bar input[type=\"range\"]::-webkit-slider-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -webkit-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-moz-range-thumb, .two-range-slider-component .progress-bar input[type=\"range\"]::-moz-range-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: -moz-grab; }\n      .range-slider-component .progress-bar input[type=\"range\"]::-ms-thumb, .two-range-slider-component .progress-bar input[type=\"range\"]::-ms-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 9999999;\n        outline: 0;\n        cursor: pointer; }\n  .range-slider-component .max-value, .two-range-slider-component .max-value {\n    margin-left: 5px; }\n  .range-slider-component:hover .progress-bar .visible-dragger, .two-range-slider-component:hover .progress-bar .visible-dragger, .range-slider-component.is-loading .progress-bar .visible-dragger, .is-loading.two-range-slider-component .progress-bar .visible-dragger, .range-slider-component.is-dragging .progress-bar .visible-dragger, .is-dragging.two-range-slider-component .progress-bar .visible-dragger {\n    opacity: 1; }\n  .range-slider-component.is-loading .progress-bar .visible-dragger .loading-spinner, .is-loading.two-range-slider-component .progress-bar .visible-dragger .loading-spinner {\n    display: block; }\n  .range-slider-component.is-dragging .progress-bar .visible-dragger.display-value, .is-dragging.two-range-slider-component .progress-bar .visible-dragger.display-value {\n    width: initial;\n    height: initial;\n    font-size: 10px;\n    border-radius: 5px;\n    top: -8px;\n    padding: 0 4px;\n    color: black; }\n  .range-slider-component.is-dragging .progress-bar .visible-dragger .loading-spinner, .is-dragging.two-range-slider-component .progress-bar .visible-dragger .loading-spinner {\n    display: none; }\n\n.loading-spinner {\n  border: 0 solid #f70;\n  border-radius: 50%;\n  position: relative;\n  animation: loader-figure 1.15s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;\n  transform: translate(3px, 3px);\n  display: none; }\n\n@keyframes loader-figure {\n  0% {\n    width: 0;\n    height: 0;\n    left: 4px;\n    top: 4px;\n    background-color: #f70; }\n  29% {\n    background-color: #f70; }\n  30% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n    border-width: 4px;\n    opacity: 1; }\n  100% {\n    top: 0;\n    left: 0;\n    width: 8px;\n    height: 8px;\n    border-width: 0;\n    opacity: 0;\n    background-color: transparent; } }\n\n.two-range-slider-component {\n  position: relative; }\n  .two-range-slider-component .progress-bar input[type=\"range\"] {\n    pointer-events: none; }\n  .two-range-slider-component.is-loading .progress-bar .progress-line {\n    background: -moz-linear-gradient(left, #ff3600 0%, #ff3600 10%, rgba(255, 54, 0, 0) 10%);\n    /* FF3.6-15 */\n    background: -webkit-linear-gradient(left, #ff3600 0%, #ff3600 10%, rgba(255, 54, 0, 0) 10%);\n    /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to right, #ff3600 0%, #ff3600 10%, rgba(255, 54, 0, 0) 10%);\n    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    background-size: 200% 100%;\n    animation: move 1.15s cubic-bezier(0.53, -0.46, 0.49, 0.99) infinite reverse; }\n  .two-range-slider-component.is-loading .progress-bar .handle-one .loading-spinner {\n    animation-delay: 1.5s; }\n  .two-range-slider-component.is-loading .progress-bar .handle-two .loading-spinner {\n    animation-delay: -0.2s; }\n\n@keyframes move {\n  0% {\n    background-position: 90% 100%; }\n  50% {\n    background-position: 200% 100%; }\n  100% {\n    background-position: 90% 100%; } }\n", ""]);

	// exports


/***/ }),
/* 172 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"two-range-slider-component\" [class.is-loading]=\"showLoadingSpinner\" [class.is-dragging]=\"dragInProgress\">\n  <div *ngIf=\"!hideSliderValue && min !== null\"\n       class=\"min-value\">\n    {{getDisplayValue(min)}}\n  </div>\n\n  <div #progressBar class=\"progress-bar\">\n    <div #progressLine class=\"progress-line\"></div>\n\n    <div #handleOne class=\"visible-dragger handle-one\" [class.display-value]=\"!hideSliderValue\">\n      <span *ngIf=\"dragInProgress && !hideSliderValue\">\n        <span *ngIf=\"allowInfinityMin && dragHandleMinDisplayValue === null\">None</span>\n        <span *ngIf=\"!allowInfinityMin || dragHandleMinDisplayValue !== null\">{{dragHandleMinDisplayValue}}</span>\n      </span>\n      <div class=\"loading-spinner\"></div>\n    </div>\n\n    <div #handleTwo class=\"visible-dragger handle-two\" [class.display-value]=\"!hideSliderValue\">\n      <span *ngIf=\"dragInProgress && !hideSliderValue\">\n        <span *ngIf=\"allowInfinityMax && dragHandleMaxDisplayValue === null\">None</span>\n        <span *ngIf=\"!allowInfinityMax || dragHandleMaxDisplayValue !== null\">{{dragHandleMaxDisplayValue}}</span>\n      </span>\n      <div class=\"loading-spinner\"></div>\n    </div>\n\n    <input type=\"range\" #sliderOne [min]=\"min\" [max]=\"max\" [(ngModel)]=\"tmpMinValue\" [step]=\"step\">\n    <input type=\"range\" #sliderTwo [min]=\"min\" [max]=\"max\" [(ngModel)]=\"tmpMaxValue\" [step]=\"step\">\n  </div>\n\n  <div *ngIf=\"!hideSliderValue && max !== null\"\n       class=\"max-value\">\n    {{getDisplayValue(max)}}\n  </div>\n</div>\n";

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let ViewHeaderComponent = class ViewHeaderComponent {
	};
	ViewHeaderComponent = __decorate([
	    core_1.Component({
	        selector: 'view-header',
	        styles: [__webpack_require__(174)],
	        template: __webpack_require__(176)
	    }), 
	    __metadata('design:paramtypes', [])
	], ViewHeaderComponent);
	exports.ViewHeaderComponent = ViewHeaderComponent;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(175);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  display: block;\n  position: relative;\n  z-index: 9;\n  height: 60px;\n  font-size: 35px; }\n  :host .view-header {\n    width: inherit;\n    border-radius: 4px 4px 0 0;\n    padding: 6px 15px;\n    display: flex;\n    align-items: center;\n    color: #555;\n    height: 100%; }\n    :host .view-header /deep/ > i {\n      font-size: 20px;\n      margin-right: 15px;\n      color: #555; }\n    :host .view-header /deep/ > img {\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      margin-right: 15px; }\n  :host :after {\n    content: \"\";\n    position: absolute;\n    width: 102%;\n    height: 25px;\n    background: #efefef;\n    top: -25px;\n    left: -1%; }\n  :host /deep/ collection-text-input-search {\n    width: 100%; }\n    :host /deep/ collection-text-input-search .input-group {\n      padding: 4px 15px;\n      background: #fcfcfc;\n      margin-left: -15px;\n      box-sizing: initial;\n      width: 100%;\n      border-radius: 4px; }\n      :host /deep/ collection-text-input-search .input-group .input-group-addon {\n        background: transparent;\n        border: none;\n        font-size: 20px;\n        padding: 0; }\n      :host /deep/ collection-text-input-search .input-group input {\n        border: none;\n        font-size: 35px;\n        width: 100%;\n        font-weight: lighter;\n        height: initial;\n        background: transparent;\n        padding: 0 16px;\n        box-shadow: none; }\n  @media (max-width: 991px) {\n    :host .view-header {\n      padding-top: 0;\n      border-bottom: 2px solid #ff3600; }\n      :host .view-header /deep/ collection-text-input-search .input-group {\n        border-radius: 0; } }\n", ""]);

	// exports


/***/ }),
/* 176 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"view-header\">\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let ScrollViewComponent = class ScrollViewComponent {
	};
	ScrollViewComponent = __decorate([
	    core_1.Component({
	        selector: 'scroll-view',
	        styles: [__webpack_require__(178)],
	        template: __webpack_require__(180)
	    }), 
	    __metadata('design:paramtypes', [])
	], ScrollViewComponent);
	exports.ScrollViewComponent = ScrollViewComponent;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(179);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  height: calc(100vh - 80px);\n  overflow: scroll;\n  display: block;\n  border-radius: 4px; }\n  :host::-webkit-scrollbar {\n    display: none; }\n  :host .scroll-view {\n    padding: 10px 0; }\n    :host .scroll-view /deep/ > .card {\n      background: #fcfcfc;\n      padding: 10px 15px;\n      border-radius: 4px;\n      box-shadow: 0 0 8px 0 #c8c8c8;\n      margin-bottom: 20px; }\n  @media (max-width: 992px) {\n    :host .scroll-view {\n      padding: 0 0; } }\n", ""]);

	// exports


/***/ }),
/* 180 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"scroll-view\">\n  <ng-content></ng-content>\n</div>\n";

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const Subject_1 = __webpack_require__(6);
	let CloudPlayerLogoService = class CloudPlayerLogoService {
	    constructor() {
	        // Observable string sources
	        this.logoStateSource = new Subject_1.Subject();
	        // Observable string streams
	        this.logoState$ = this.logoStateSource.asObservable();
	    }
	    // Service message commands
	    play() {
	        this.logoStateSource.next('PLAY');
	    }
	    pause() {
	        this.logoStateSource.next('PAUSE');
	    }
	};
	CloudPlayerLogoService = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], CloudPlayerLogoService);
	exports.CloudPlayerLogoService = CloudPlayerLogoService;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const cloud_player_logo_service_1 = __webpack_require__(181);
	let CloudPlayerLogoComponent = class CloudPlayerLogoComponent {
	    constructor(cloudPlayerLogoService) {
	        this.cloudPlayerLogoService = cloudPlayerLogoService;
	        this.animate = false;
	        cloudPlayerLogoService.logoState$.subscribe((status) => {
	            if (status === 'PAUSE') {
	                this.pause();
	            }
	            else if (status === 'PLAY') {
	                this.play();
	            }
	        });
	    }
	    ngOnInit() {
	        this.svgObject.nativeElement.addEventListener('load', () => {
	            let svgObj = this.svgObject.nativeElement;
	            let content = svgObj.contentDocument;
	            this.mainAnimation = content.querySelectorAll('.main-animation');
	            this.iconAnimationToPlay = content.querySelectorAll('.icon-animation-to-play');
	            this.iconAnimationToPause = content.querySelectorAll('.icon-animation-to-pause');
	        }, false);
	    }
	    play() {
	        if (this.mainAnimation && this.animate) {
	            this.mainAnimation.forEach((el) => {
	                el.beginElement(el.getCurrentTime());
	            });
	            this.iconAnimationToPause.forEach((el) => {
	                el.beginElement();
	            });
	        }
	    }
	    pause() {
	        if (this.mainAnimation && this.animate) {
	            this.mainAnimation.forEach((el) => {
	                el.endElement();
	            });
	            this.iconAnimationToPlay.forEach((el) => {
	                el.beginElement();
	            });
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], CloudPlayerLogoComponent.prototype, "animate", void 0);
	__decorate([
	    core_1.ViewChild('svgObject'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], CloudPlayerLogoComponent.prototype, "svgObject", void 0);
	CloudPlayerLogoComponent = __decorate([
	    core_1.Component({
	        selector: 'cloud-player-logo',
	        styles: [__webpack_require__(183)],
	        template: __webpack_require__(185),
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof cloud_player_logo_service_1.CloudPlayerLogoService !== 'undefined' && cloud_player_logo_service_1.CloudPlayerLogoService) === 'function' && _b) || Object])
	], CloudPlayerLogoComponent);
	exports.CloudPlayerLogoComponent = CloudPlayerLogoComponent;
	var _a, _b;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(184);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host object {\n  width: 58px;\n  position: relative;\n  top: 2px; }\n", ""]);

	// exports


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"cloud-player-logo\">\n  <object type=\"image/svg+xml\" data=\"" + __webpack_require__(186) + "\" #svgObject>\n    <img src=\"" + __webpack_require__(186) + "\" alt=\"Cloud Player\">\n  </object>\n</div>\n";

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ebd7bf47dcdbd9ebebea93f422e84dd1.svg";

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let ToggleSwitchComponent = class ToggleSwitchComponent {
	    constructor() {
	        this.valueChange = new core_1.EventEmitter();
	    }
	    get value() {
	        return this._value;
	    }
	    set value(val) {
	        this._value = val;
	        this.valueChange.emit(val);
	    }
	    isOn() {
	        return this.value;
	    }
	    toggle() {
	        if (this.isOn()) {
	            this.turnOff();
	        }
	        else {
	            this.turnOn();
	        }
	    }
	    turnOn() {
	        this.value = true;
	    }
	    turnOff() {
	        this.value = false;
	    }
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], ToggleSwitchComponent.prototype, "valueChange", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], ToggleSwitchComponent.prototype, "value", null);
	ToggleSwitchComponent = __decorate([
	    core_1.Component({
	        selector: 'toggle-switch',
	        styles: [__webpack_require__(188)],
	        template: __webpack_require__(190),
	    }), 
	    __metadata('design:paramtypes', [])
	], ToggleSwitchComponent);
	exports.ToggleSwitchComponent = ToggleSwitchComponent;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(189);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host .toggle-switch {\n  display: flex;\n  position: relative;\n  border: 1px solid #aaa;\n  border-radius: 20px;\n  margin-right: 10px;\n  background: white; }\n  :host .toggle-switch .left,\n  :host .toggle-switch .right {\n    height: 26px;\n    width: 26px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 15px;\n    text-align: center;\n    color: #aaa;\n    z-index: 1;\n    transition: color 0.5s ease;\n    cursor: pointer; }\n    :host .toggle-switch .left.active,\n    :host .toggle-switch .right.active {\n      color: white; }\n  :host .toggle-switch .right {\n    margin-left: -4px; }\n  :host .toggle-switch .indicator {\n    position: absolute;\n    height: 26px;\n    width: 26px;\n    border-radius: 50%;\n    top: 0;\n    left: 0;\n    background: #ff3600;\n    border: 1px solid #ff3600;\n    transition: transform 0.5s ease; }\n  :host .toggle-switch.on .indicator {\n    transform: translateX(22px); }\n", ""]);

	// exports


/***/ }),
/* 190 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"toggle-switch\" [class.on]=\"isOn()\" [class.off]=\"!isOn()\">\n  <div class=\"left\" [class.active]=\"!isOn()\" (click)=\"turnOff()\">\n    <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n  </div>\n\n  <div class=\"right\" [class.active]=\"isOn()\" (click)=\"turnOn()\">\n    <i class=\"fa fa-globe\" aria-hidden=\"true\"></i>\n  </div>\n\n  <div class=\"indicator\" (click)=\"toggle()\"></div>\n</div>\n";

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let LoadingSpinnerComponent = class LoadingSpinnerComponent {
	    constructor() {
	        this.isLoading = true;
	        this.isIdle = true;
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], LoadingSpinnerComponent.prototype, "isLoading", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Boolean)
	], LoadingSpinnerComponent.prototype, "isIdle", void 0);
	LoadingSpinnerComponent = __decorate([
	    core_1.Component({
	        selector: 'loading-spinner',
	        styles: [__webpack_require__(192)],
	        template: __webpack_require__(194)
	    }), 
	    __metadata('design:paramtypes', [])
	], LoadingSpinnerComponent);
	exports.LoadingSpinnerComponent = LoadingSpinnerComponent;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(193);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  width: 100px;\n  height: 100px; }\n\n.idle-dots {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n  .idle-dots .dot {\n    width: 5px;\n    height: 5px;\n    background: #777777;\n    border-radius: 50%;\n    margin-left: 3px;\n    animation: bounce 1.2s infinite cubic-bezier(0.69, 0.1, 0.64, 0.95); }\n    .idle-dots .dot.two {\n      animation-delay: 0.4s; }\n    .idle-dots .dot.three {\n      animation-delay: 0.8s; }\n\n.loading-spinner {\n  width: inherit;\n  height: inherit;\n  position: relative;\n  animation: rotate 1.4s infinite cubic-bezier(0.69, 0.1, 0.64, 0.95); }\n  .loading-spinner .load-circle {\n    margin: auto;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5); }\n  .loading-spinner .load-circle-line-mask {\n    width: 100%;\n    height: 50%;\n    position: initial;\n    overflow: hidden;\n    -webkit-transform-origin: 50% 50%;\n    transform-origin: 50% 50%;\n    -webkit-mask-image: -webkit-linear-gradient(top, #000000, transparent);\n    mask-image: linear-gradient(#000 0%, transparent 100%); }\n    .loading-spinner .load-circle-line-mask .load-line {\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      box-shadow: inset 0 0 0 3px #ff3600;\n      position: absolute; }\n\n@keyframes rotate {\n  0% {\n    transform: rotate(-90deg); }\n  100% {\n    transform: rotate(270deg); } }\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0); }\n  50% {\n    transform: translateY(3px); }\n  100% {\n    transform: translateY(0); } }\n", ""]);

	// exports


/***/ }),
/* 194 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"idle-dots\" *ngIf=\"isIdle && !isLoading\">\n  <div class=\"dot one\"></div>\n  <div class=\"dot two\"></div>\n  <div class=\"dot three\"></div>\n</div>\n\n<div class=\"loading-spinner\" *ngIf=\"isLoading\">\n  <div class=\"load-circle-line-mask\">\n    <div class=\"load-line\"></div>\n  </div>\n</div>\n";

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const Observable_1 = __webpack_require__(7);
	const Subject_1 = __webpack_require__(6);
	const base_collection_1 = __webpack_require__(76);
	const client_detector_service_1 = __webpack_require__(131);
	let CollectionTextInputSearchComponent = class CollectionTextInputSearchComponent {
	    constructor() {
	        this.searchTerms = new Subject_1.Subject();
	        this.isLoading = false;
	        this.isIdle = false;
	        this.valueChange = new core_1.EventEmitter();
	    }
	    isMobileDevice() {
	        return client_detector_service_1.ClientDetector.isMobileDevice();
	    }
	    searchOnInput() {
	        if (!this.isMobileDevice()) {
	            this.search();
	        }
	    }
	    // Push a search term into the observable stream.
	    search(query) {
	        if (query) {
	            this.query = query;
	        }
	        this.isIdle = true;
	        this.searchTerms.next(this.query);
	    }
	    focus() {
	        this.searchBar.nativeElement.focus();
	    }
	    ngOnInit() {
	        this.collection.on('request', () => {
	            this.isLoading = true;
	            this.isIdle = false;
	        });
	        this.collection.on('sync error', () => {
	            this.isLoading = false;
	        });
	        this.searchTerms
	            .debounceTime(600) // wait for 300ms pause in events
	            .distinctUntilChanged() // ignore if next search term is same as previous
	            .switchMap(term => {
	            if (term) {
	                this.collection.queryParams[this.queryParam] = term;
	            }
	            else {
	                this.collection.queryParams[this.queryParam] = null;
	            }
	            this.collection.fetch({ reset: true });
	            this.valueChange.emit(term);
	            return Observable_1.Observable.of(this.collection);
	        }).toPromise();
	        this.query = this.collection.queryParams[this.queryParam];
	    }
	};
	__decorate([
	    core_1.ViewChild('searchInput'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], CollectionTextInputSearchComponent.prototype, "searchBar", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_b = typeof base_collection_1.BaseCollection !== 'undefined' && base_collection_1.BaseCollection) === 'function' && _b) || Object)
	], CollectionTextInputSearchComponent.prototype, "collection", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], CollectionTextInputSearchComponent.prototype, "queryParam", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], CollectionTextInputSearchComponent.prototype, "valueChange", void 0);
	CollectionTextInputSearchComponent = __decorate([
	    core_1.Component({
	        selector: 'collection-text-input-search',
	        styles: [__webpack_require__(196)],
	        template: __webpack_require__(198)
	    }), 
	    __metadata('design:paramtypes', [])
	], CollectionTextInputSearchComponent);
	exports.CollectionTextInputSearchComponent = CollectionTextInputSearchComponent;
	var _a, _b;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(197);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".collection-search /deep/ loading-spinner {\n  position: absolute;\n  right: 10px;\n  top: 14px;\n  height: 30px;\n  width: 30px; }\n", ""]);

	// exports


/***/ }),
/* 198 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"collection-search\">\n  <form class=\"input-group\"\n        autocomplete=\"off\"\n        (submit)=\"search(); searchInput.blur()\">\n    <span class=\"input-group-addon\" id=\"basic-addon3\"><i class=\"fa fa-search\"></i></span>\n    <input type=\"text\"\n           class=\"form-control\"\n           aria-describedby=\"basic-addon3\"\n           name=\"search\"\n           placeholder=\"Search\"\n           [(ngModel)]=\"query\"\n           (ngModelChange)=\"searchOnInput()\"\n           #searchInput>\n    <loading-spinner [isIdle]=\"isIdle\" [isLoading]=\"isLoading\"></loading-spinner>\n  </form>\n</div>\n";

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let FocusInputDirective = class FocusInputDirective {
	    constructor(el) {
	        this.el = el;
	    }
	    ngOnInit() {
	        this.el.nativeElement.focus();
	    }
	};
	FocusInputDirective = __decorate([
	    core_1.Directive({
	        selector: '[focusInput]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	], FocusInputDirective);
	exports.FocusInputDirective = FocusInputDirective;
	var _a;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	let ViewChangeLoaderComponent = class ViewChangeLoaderComponent {
	    constructor(el, router, ngZone, renderer) {
	        this.el = el;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.renderer = renderer;
	        router.events.subscribe((event) => {
	            this.navigationInterceptor(event);
	        });
	    }
	    navigationInterceptor(event) {
	        if (event instanceof router_1.NavigationStart) {
	            this.showSpinner();
	        }
	        if (event instanceof router_1.NavigationEnd
	            || event instanceof router_1.NavigationCancel
	            || event instanceof router_1.NavigationError) {
	            this.hideSpinner();
	        }
	    }
	    showSpinner() {
	        // We wanna run this function outside of Angular's zone to
	        // bypass change detection
	        this.ngZone.runOutsideAngular(() => {
	            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
	        });
	    }
	    hideSpinner() {
	        // We wanna run this function outside of Angular's zone to
	        // bypass change detection,
	        this.ngZone.runOutsideAngular(() => {
	            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
	        });
	    }
	};
	ViewChangeLoaderComponent = __decorate([
	    core_1.Component({
	        selector: 'view-change-loader',
	        styles: [__webpack_require__(201)],
	        template: __webpack_require__(203),
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
	], ViewChangeLoaderComponent);
	exports.ViewChangeLoaderComponent = ViewChangeLoaderComponent;
	var _a, _b, _c, _d;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(202);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  width: 100vw;\n  position: fixed;\n  z-index: 9999;\n  left: 0;\n  top: 0;\n  display: none; }\n  :host .view-change-loader {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 100;\n    background: rgba(255, 255, 255, 0.8); }\n", ""]);

	// exports


/***/ }),
/* 203 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"view-change-loader\">\n  <loading-spinner></loading-spinner>\n</div>\n";

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const moment = __webpack_require__(205);
	let TimeAgoDirective = class TimeAgoDirective {
	    constructor(el) {
	        this.el = el;
	    }
	    setTime(dateVal) {
	        let date = new Date(dateVal);
	        this.el.nativeElement.textContent = (moment(date).fromNow());
	    }
	    ngOnInit() {
	        this.setTime(this.timeAgo);
	        // this.interval = setInterval(()=>{
	        //   this.setTime(this.timeAgo);
	        // }, 1000 * 60 * 2);
	    }
	    ngOnDestroy() {
	        // if(this.interval){
	        //   clearInterval(this.interval);
	        // }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Object)
	], TimeAgoDirective.prototype, "timeAgo", void 0);
	TimeAgoDirective = __decorate([
	    core_1.Directive({
	        selector: '[timeAgo]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	], TimeAgoDirective);
	exports.TimeAgoDirective = TimeAgoDirective;
	var _a;


/***/ }),
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const track_model_1 = __webpack_require__(108);
	const tracks_collection_1 = __webpack_require__(124);
	const play_queue_collection_1 = __webpack_require__(125);
	let PlayTrackOnEventDirective = class PlayTrackOnEventDirective {
	    constructor(el) {
	        this.el = el;
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	    }
	    registerListener(event) {
	        this.el.nativeElement.addEventListener(event, () => {
	            if (this.isPlaying()) {
	                this.pause();
	            }
	            else {
	                this.play();
	            }
	        });
	    }
	    isPlaying() {
	        let playingItem = this.playQueue.getPlayingItem();
	        return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
	    }
	    play() {
	        this.playQueue.filter((model) => {
	            return !model.isQueued();
	        }).forEach((model) => {
	            this.playQueue.remove(model);
	        });
	        if (this.tracks) {
	            this.tracks.forEach((track) => {
	                if (!this.playQueue.get(track)) {
	                    this.playQueue.add({ track: track });
	                }
	            });
	        }
	        let playQueueItem = this.playQueue.add({ track: this.track });
	        playQueueItem.play();
	    }
	    pause() {
	        if (this.isPlaying()) {
	            play_queue_collection_1.PlayQueue.getInstance().getPlayingItem().pause();
	        }
	    }
	    ngOnInit() {
	        this.el.nativeElement.style.cursor = 'pointer';
	        if (this.playTrackOn) {
	            this.registerListener(this.playTrackOn);
	        }
	        else if (this.events) {
	            this.events.forEach((ev) => {
	                this.registerListener(ev);
	            });
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Object)
	], PlayTrackOnEventDirective.prototype, "playTrackOn", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof track_model_1.Track !== 'undefined' && track_model_1.Track) === 'function' && _a) || Object)
	], PlayTrackOnEventDirective.prototype, "track", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Object)
	], PlayTrackOnEventDirective.prototype, "events", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_b = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _b) || Object)
	], PlayTrackOnEventDirective.prototype, "tracks", void 0);
	PlayTrackOnEventDirective = __decorate([
	    core_1.Directive({
	        selector: '[playTrackOn]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object])
	], PlayTrackOnEventDirective);
	exports.PlayTrackOnEventDirective = PlayTrackOnEventDirective;
	var _a, _b, _c;


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let OptionsBtnComponent = class OptionsBtnComponent {
	    constructor(el) {
	        this.el = el;
	        this.options = [];
	        this.optionsAreVisible = false;
	        this.openState = new core_1.EventEmitter();
	    }
	    getScrollOffset() {
	        let scrollViewContainer = document.querySelector('scroll-view');
	        if (scrollViewContainer) {
	            return scrollViewContainer.scrollTop;
	        }
	        else {
	            return document.scrollingElement.scrollTop;
	        }
	    }
	    registerCloseListeners() {
	        let close = (ev) => {
	            if (!this.toggler.nativeElement.contains(ev.target)) {
	                this.close();
	            }
	            document.removeEventListener('scroll', close, true);
	            document.removeEventListener('click', close, true);
	        };
	        document.addEventListener('scroll', close, true);
	        document.addEventListener('click', close, true);
	    }
	    addOption(option) {
	        this.options.push(option);
	    }
	    open() {
	        this.registerCloseListeners();
	        this.optionsHolder.nativeElement.style.left = `${this.el.nativeElement.offsetLeft}px`;
	        this.optionsHolder.nativeElement.style.top = `${this.el.nativeElement.getBoundingClientRect().top}px`;
	        this.optionsAreVisible = true;
	        this.openState.emit(true);
	    }
	    close() {
	        this.optionsAreVisible = false;
	        this.openState.emit(false);
	    }
	    toggleOpen() {
	        if (this.optionsAreVisible) {
	            this.close();
	        }
	        else {
	            this.open();
	        }
	    }
	    ngOnInit() {
	    }
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], OptionsBtnComponent.prototype, "openState", void 0);
	__decorate([
	    core_1.ViewChild('optionsHolder'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], OptionsBtnComponent.prototype, "optionsHolder", void 0);
	__decorate([
	    core_1.ViewChild('toggler'), 
	    __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
	], OptionsBtnComponent.prototype, "toggler", void 0);
	OptionsBtnComponent = __decorate([
	    core_1.Component({
	        selector: 'options-btn',
	        styles: [__webpack_require__(328)],
	        template: __webpack_require__(330)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object])
	], OptionsBtnComponent);
	exports.OptionsBtnComponent = OptionsBtnComponent;
	let OptionsBtnOptionComponent = class OptionsBtnOptionComponent {
	    constructor(el, optionsHolder) {
	        this.el = el;
	        optionsHolder.addOption(this);
	    }
	};
	OptionsBtnOptionComponent = __decorate([
	    core_1.Component({
	        selector: 'options-btn-option',
	        template: '<li class="option-btn-option"><ng-content></ng-content></li>'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object, OptionsBtnComponent])
	], OptionsBtnOptionComponent);
	exports.OptionsBtnOptionComponent = OptionsBtnOptionComponent;
	var _a, _b, _c, _d;


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(329);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  position: relative; }\n  :host .btn {\n    margin: 0; }\n  :host .options-list {\n    position: fixed;\n    width: 150px;\n    border: 1px solid #ccc;\n    border-radius: 4px 0 4px 4px;\n    list-style: none;\n    padding: 0;\n    background: white;\n    flex-direction: column;\n    flex-grow: 1;\n    margin-top: 20px;\n    margin-left: -135px;\n    z-index: 999; }\n    :host .options-list /deep/ options-btn-option {\n      padding: 10px 5px;\n      display: block;\n      border-bottom: 1px solid #eeeeee; }\n      :host .options-list /deep/ options-btn-option:hover {\n        background: #eeeeee; }\n", ""]);

	// exports


/***/ }),
/* 330 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"options-btn\">\n  <div class=\"btn btn-xs btn-default\" (click)=\"toggleOpen()\" #toggler>\n    <i class=\"fa fa-ellipsis-v\" aria-hidden=\"true\" alt=\"Options\"></i>\n  </div>\n  <ul [hidden]=\"!optionsAreVisible\"\n      class=\"options-list\"\n      #optionsHolder>\n    <ng-content></ng-content>\n  </ul>\n</div>\n";

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let KMilShortenerPipe = class KMilShortenerPipe {
	    constructor() {
	        this.units = ['', 'K', 'Mil', 'Bil'];
	    }
	    formatToKMil(input, amount = 0) {
	        if (input < 1000) {
	            return `${input}${this.units[amount]}`;
	        }
	        else {
	            return this.formatToKMil(Math.round((input / 1000) * 10) / 10, amount + 1);
	        }
	    }
	    transform(value, args) {
	        if (!value) {
	            return value;
	        }
	        else {
	            return this.formatToKMil(parseInt(value, 10));
	        }
	    }
	};
	KMilShortenerPipe = __decorate([
	    core_1.Pipe({ name: 'kMilShortener' }), 
	    __metadata('design:paramtypes', [])
	], KMilShortenerPipe);
	exports.KMilShortenerPipe = KMilShortenerPipe;


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let FillHeightDirective = class FillHeightDirective {
	    constructor(el) {
	        this.el = el;
	    }
	    ngOnInit() {
	        let offsetTop = this.el.nativeElement.offsetTop;
	        this.el.nativeElement.style.height = `calc(100vh - ${offsetTop}px)`;
	        this.el.nativeElement.classList.add('scrollable');
	    }
	};
	FillHeightDirective = __decorate([
	    core_1.Directive({
	        selector: '[fillHeight]'
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	], FillHeightDirective);
	exports.FillHeightDirective = FillHeightDirective;
	var _a;


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let MultiLineComponent = class MultiLineComponent {
	    constructor() {
	        this.lines = [];
	        this.lineAmountChanged = new core_1.EventEmitter();
	    }
	    calculateLines(text, maxWidth) {
	        let words = text.split(' ');
	        words.forEach(function (word) {
	            var wordWidth = this._ctx.measureText(word + ' ').width, line = this.lines[this.lines.length - 1];
	            if (line && line.width + wordWidth <= maxWidth) {
	                line.text += ' ' + word;
	                line.width += wordWidth;
	            }
	            else if (!this.maxLines || this.lines.length <= this.maxLines) {
	                this.lines.push({ width: wordWidth + (this.paddingLeft + this.paddingRight), text: word });
	            }
	        }.bind(this));
	        this.lineAmountChanged.emit(this.lines.length);
	    }
	    ngOnInit() {
	        this._ctx = this.canvas.nativeElement.getContext('2d');
	        this._ctx.font = this.font || '300 12.5px Raleway';
	        this.calculateLines(this.text, this.maxWidth);
	    }
	    ngOnDestroy() {
	        this.lineAmountChanged.emit(this.lines.length * -1);
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], MultiLineComponent.prototype, "text", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', String)
	], MultiLineComponent.prototype, "font", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], MultiLineComponent.prototype, "paddingLeft", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], MultiLineComponent.prototype, "paddingRight", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], MultiLineComponent.prototype, "maxWidth", void 0);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], MultiLineComponent.prototype, "maxLines", void 0);
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], MultiLineComponent.prototype, "lineAmountChanged", void 0);
	__decorate([
	    core_1.ViewChild('canvas'), 
	    __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	], MultiLineComponent.prototype, "canvas", void 0);
	MultiLineComponent = __decorate([
	    core_1.Component({
	        selector: 'multi-line',
	        styles: [__webpack_require__(334)],
	        template: __webpack_require__(336)
	    }), 
	    __metadata('design:paramtypes', [])
	], MultiLineComponent);
	exports.MultiLineComponent = MultiLineComponent;
	var _a;


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(335);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host canvas {\n  display: none; }\n", ""]);

	// exports


/***/ }),
/* 336 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"multi-line\">\n  <canvas #canvas width=\"0\" height=\"0\"></canvas>\n  <div class=\"lines\" [class.multiLines]=\"lines.length>1\">\n    <div class=\"line\" *ngFor=\"let line of lines\" [style.width]=\"line.width+'px'\" [style.font]=\"font\">\n      {{line.text}}\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const underscore_1 = __webpack_require__(67);
	let LimitCollectionresultsPipe = class LimitCollectionresultsPipe {
	    constructor() {
	        this.valueChange = new core_1.EventEmitter();
	        this._throttledScrollHandler = underscore_1.throttle(this._increaseLimitOnBottomReached.bind(this), 500);
	        document.addEventListener('scroll', this._throttledScrollHandler, true);
	    }
	    _increaseLimitOnBottomReached(ev) {
	        let srcEl = ev.srcElement;
	        if (srcEl.scrollTop / (srcEl.scrollHeight - srcEl.offsetHeight) > 0.8) {
	            if (this._limit) {
	                this._limit += this._orgLimit;
	            }
	            else {
	                this._limit = this._orgLimit * 2;
	            }
	            this.valueChange.emit(this._limit);
	        }
	    }
	    transform(items, args = { limit: null }) {
	        if (this._limit && this._limit > items.length) {
	            document.removeEventListener('scroll', this._throttledScrollHandler, true);
	            return items;
	        }
	        if (items && args.limit && items.length > args.limit) {
	            this._orgLimit = args.limit;
	            return items.slice(0, this._limit || this._orgLimit);
	        }
	        else {
	            return items;
	        }
	    }
	    ngOnDestroy() {
	        document.removeEventListener('scroll', this._throttledScrollHandler, true);
	    }
	};
	LimitCollectionresultsPipe = __decorate([
	    core_1.Pipe({ name: 'limitCollectionresults', pure: false }), 
	    __metadata('design:paramtypes', [])
	], LimitCollectionresultsPipe);
	exports.LimitCollectionresultsPipe = LimitCollectionresultsPipe;


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let FacebookShareButtonComponent = class FacebookShareButtonComponent {
	    constructor(el) {
	        this.el = el;
	        this.click = new core_1.EventEmitter();
	    }
	    initFacebookJsSdk() {
	        return new Promise((resolve, reject) => {
	            const facebookElId = 'facebookJsSdk';
	            const facebookScriptEl = document.getElementById(facebookElId);
	            if (facebookScriptEl) {
	                resolve();
	            }
	            else {
	                let js;
	                const scripts = document.getElementsByTagName('script')[0];
	                js = document.createElement('script');
	                js.id = facebookElId;
	                js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=146645615953816';
	                scripts.parentNode.insertBefore(js, facebookScriptEl);
	                js.onload = () => {
	                    resolve();
	                };
	            }
	        });
	    }
	    ;
	    initClickListener() {
	        let fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
	        let monitor = setInterval(() => {
	            if (!fbIframe) {
	                fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
	            }
	            let activeEl = document.activeElement;
	            if (activeEl === fbIframe) {
	                clearInterval(monitor);
	                this.click.emit();
	            }
	        }, 1000);
	    }
	    ngOnInit() {
	        this.initFacebookJsSdk().then(() => {
	            this.initClickListener();
	        });
	    }
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], FacebookShareButtonComponent.prototype, "click", void 0);
	FacebookShareButtonComponent = __decorate([
	    core_1.Component({
	        selector: 'facebook-share-button',
	        styles: [__webpack_require__(339)],
	        template: __webpack_require__(341)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	], FacebookShareButtonComponent);
	exports.FacebookShareButtonComponent = FacebookShareButtonComponent;
	var _a;


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(340);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 340 */
153,
/* 341 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"facebook-share-button\" (click)=\"share($event)\">\n  <div class=\"fb-share-button\"\n       data-href=\"https://cloud-player.io\"\n       data-layout=\"button_count\"\n       data-size=\"large\"\n       data-mobile-iframe=\"true\">\n    <a class=\"fb-xfbml-parse-ignore\"\n       target=\"_blank\"\n       href=\"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcloud-player.io%2F&amp;src=sdkpreparse\">\n      Share\n    </a>\n  </div>\n</div>\n";

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	let TwitterShareButtonComponent = class TwitterShareButtonComponent {
	    constructor(el) {
	        this.el = el;
	        this.click = new core_1.EventEmitter();
	    }
	    build() {
	        window.twttr.widgets.createShareButton('https://cloud-player.io', document.querySelector('.twitter-share-button'), {
	            via: 'cldplayer',
	            size: 'large',
	            text: 'Check out this free music player'
	        });
	    }
	    initTwitterJsSdk() {
	        return new Promise((resolve, reject) => {
	            const twitterElId = 'twitterJsSdk';
	            const twitterScriptEl = document.getElementById(twitterElId);
	            if (twitterScriptEl) {
	                resolve();
	            }
	            else {
	                let js;
	                const scripts = document.getElementsByTagName('script')[0];
	                js = document.createElement('script');
	                js.id = twitterElId;
	                js.src = '//platform.twitter.com/widgets.js';
	                scripts.parentNode.insertBefore(js, twitterScriptEl);
	                js.onload = () => {
	                    resolve();
	                };
	            }
	        });
	    }
	    ;
	    initClickListener() {
	        let fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
	        let monitor = setInterval(() => {
	            if (!fbIframe) {
	                fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
	            }
	            let activeEl = document.activeElement;
	            if (activeEl === fbIframe) {
	                clearInterval(monitor);
	                this.click.emit();
	            }
	        }, 1000);
	    }
	    ngOnInit() {
	        this.initTwitterJsSdk().then(() => {
	            this.build();
	            this.initClickListener();
	        });
	    }
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], TwitterShareButtonComponent.prototype, "click", void 0);
	TwitterShareButtonComponent = __decorate([
	    core_1.Component({
	        selector: 'twitter-share-button',
	        styles: [__webpack_require__(343)],
	        template: __webpack_require__(345)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	], TwitterShareButtonComponent);
	exports.TwitterShareButtonComponent = TwitterShareButtonComponent;
	var _a;


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(344);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 344 */
153,
/* 345 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"twitter-share-button\"></div>\n";

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const index_component_1 = __webpack_require__(347);
	const tracks_module_1 = __webpack_require__(89);
	const dashboard_routes_1 = __webpack_require__(351);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const session_module_1 = __webpack_require__(352);
	const backbone_module_1 = __webpack_require__(66);
	const shared_module_1 = __webpack_require__(121);
	const search_filter_component_1 = __webpack_require__(388);
	const social_share_panel_component_1 = __webpack_require__(392);
	let DashboardModule = class DashboardModule {
	};
	DashboardModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            tracks_module_1.TracksModule,
	            dashboard_routes_1.DashboardRoutingModule,
	            session_module_1.SessionModule,
	            backbone_module_1.BackboneModule,
	            shared_module_1.SharedModule
	        ],
	        declarations: [
	            index_component_1.DashboardIndexComponent,
	            search_filter_component_1.SearchFilterComponent,
	            social_share_panel_component_1.SocialSharePanelComponent
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], DashboardModule);
	exports.DashboardModule = DashboardModule;


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracks_collection_1 = __webpack_require__(124);
	const collection_text_input_search_component_1 = __webpack_require__(195);
	const localforage = __webpack_require__(146);
	const auth_service_1 = __webpack_require__(147);
	let DashboardIndexComponent = class DashboardIndexComponent {
	    constructor(tracks, authService) {
	        this.tracks = tracks;
	        this.authService = authService;
	        this.title = 'Search Tracks';
	        this.isFetching = false;
	    }
	    connect() {
	        this.authService.connect();
	    }
	    ngAfterViewInit() {
	        this.searchBar.focus();
	        this.searchBar.valueChange.subscribe((val) => {
	            localforage.setItem('sc_search_term', val);
	        });
	        localforage.getItem('sc_search_term').then((val) => {
	            if (val) {
	                this.searchBar.search(val);
	            }
	        });
	        this.tracks.on('request', () => {
	            this.isFetching = true;
	        });
	        this.tracks.on('sync error', () => {
	            this.isFetching = false;
	        });
	    }
	};
	__decorate([
	    core_1.ViewChild('searchBar'), 
	    __metadata('design:type', (typeof (_a = typeof collection_text_input_search_component_1.CollectionTextInputSearchComponent !== 'undefined' && collection_text_input_search_component_1.CollectionTextInputSearchComponent) === 'function' && _a) || Object)
	], DashboardIndexComponent.prototype, "searchBar", void 0);
	DashboardIndexComponent = __decorate([
	    core_1.Component({
	        selector: 'my-dashboard',
	        styles: [__webpack_require__(348)],
	        template: __webpack_require__(350)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof tracks_collection_1.Tracks !== 'undefined' && tracks_collection_1.Tracks) === 'function' && _b) || Object, (typeof (_c = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _c) || Object])
	], DashboardIndexComponent);
	exports.DashboardIndexComponent = DashboardIndexComponent;
	var _a, _b, _c;


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(349);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host /deep/ scroll-view .results {\n  margin-top: -8px; }\n\n:host social-share-panel {\n  display: block; }\n", ""]);

	// exports


/***/ }),
/* 350 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    <collection-text-input-search [collection]=\"tracks\" [queryParam]=\"'q'\" #searchBar></collection-text-input-search>\n  </view-header>\n\n  <!--<collection-range-input-search [collection]=\"tracks\" [queryParam]=\"'duration[from]'\"></collection-range-input-search>-->\n  <!--<sort-tracks [tracks]=\"tracks\"></sort-tracks>-->\n\n  <scroll-view>\n    <social-share-panel\n      *ngIf=\"tracks.length !== 0\"\n      class=\"card\">\n    </social-share-panel>\n\n    <div *ngIf=\"tracks.length>0\"\n         class=\"results\">\n      <search-filter [collection]=\"tracks\"></search-filter>\n      <track-list [tracks]=\"tracks\"></track-list>\n    </div>\n\n    <div *ngIf=\"tracks.length === 0 && !isFetching\"\n         class=\"card getting-started\">\n      <h1>Welcome to Cloud Player!</h1>\n      <p>\n        Cloud player is an unofficial SoundCloud player to play songs from SoundCloud.\n        <br>\n        You can search for all songs that are available on SoundCloud\n      </p>\n      <p>\n        <a (click)=\"connect()\">Connect with your SoundCloud account</a> to get your playlists and liked tracks. They\n        will appear in the menubar\n        as soon as the connection was successful.\n      </p>\n      <p>\n        You can then create new playlists or edit your existing ones. To add new Songs to your playlists you can simply\n        drag and drop tracks on it.\n      </p>\n      <p>Cloud Player is also available as <a routerLink=\"/desktop-app\">native App for your PC.</a></p>\n    </div>\n\n    <div *ngIf=\"tracks.length === 0 && isFetching\"\n         class=\"card\">\n      Searching for tracks that match your query \"{{tracks.queryParams.q}}\"\n    </div>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const index_component_1 = __webpack_require__(347);
	const routes = [
	    { path: 'dashboard', component: index_component_1.DashboardIndexComponent }
	];
	let DashboardRoutingModule = class DashboardRoutingModule {
	};
	DashboardRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], DashboardRoutingModule);
	exports.DashboardRoutingModule = DashboardRoutingModule;


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const session_routes_1 = __webpack_require__(353);
	const soundcloud_callback_component_1 = __webpack_require__(354);
	const authenticated_user_playlists_1 = __webpack_require__(367);
	const liked_tracks_view_component_1 = __webpack_require__(358);
	const shared_module_1 = __webpack_require__(121);
	const user_playlist_view_component_1 = __webpack_require__(362);
	const authenticated_user_playlists_view_component_1 = __webpack_require__(366);
	const playlist_module_1 = __webpack_require__(378);
	const authenticated_user_view_component_1 = __webpack_require__(374);
	let SessionModule = class SessionModule {
	};
	SessionModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            session_routes_1.SessionRoutingModule,
	            playlist_module_1.PlaylistModule,
	            shared_module_1.SharedModule
	        ],
	        declarations: [
	            soundcloud_callback_component_1.SoundcloudCallbackComponent,
	            authenticated_user_playlists_1.AuthenticatedUserPlaylists,
	            liked_tracks_view_component_1.LikedTracksViewComponent,
	            user_playlist_view_component_1.UserPlayListViewComponent,
	            authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent,
	            authenticated_user_view_component_1.AuthenticatedUserViewComponent
	        ],
	        exports: [
	            authenticated_user_playlists_1.AuthenticatedUserPlaylists,
	            authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], SessionModule);
	exports.SessionModule = SessionModule;


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const soundcloud_callback_component_1 = __webpack_require__(354);
	const liked_tracks_view_component_1 = __webpack_require__(358);
	const user_playlist_view_component_1 = __webpack_require__(362);
	const authenticated_user_playlists_view_component_1 = __webpack_require__(366);
	const authenticated_user_view_component_1 = __webpack_require__(374);
	const routes = [
	    { path: 'connect', component: soundcloud_callback_component_1.SoundcloudCallbackComponent },
	    { path: 'me', component: authenticated_user_view_component_1.AuthenticatedUserViewComponent },
	    { path: 'me/likes', component: liked_tracks_view_component_1.LikedTracksViewComponent },
	    { path: 'me/playlists', component: authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent },
	    { path: 'me/playlists/:id', component: user_playlist_view_component_1.UserPlayListViewComponent }
	];
	let SessionRoutingModule = class SessionRoutingModule {
	};
	SessionRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], SessionRoutingModule);
	exports.SessionRoutingModule = SessionRoutingModule;


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const session_model_1 = __webpack_require__(136);
	let SoundcloudCallbackComponent = class SoundcloudCallbackComponent {
	    constructor(route, router) {
	        this.route = route;
	        this.router = router;
	        this.session = session_model_1.Session.getInstance();
	    }
	    ;
	    ngOnInit() {
	        this.session.get('user').on('change:authenticated', () => {
	            this.router.navigate(['/']);
	        });
	        this.route.queryParams.forEach((params) => {
	            this.session.set({
	                access_token: params.access_token,
	                expires_on: params.expires_on,
	                refresh_token: params.refresh_token
	            });
	        });
	    }
	    ;
	};
	SoundcloudCallbackComponent = __decorate([
	    core_1.Component({
	        selector: 'soundcloud-callback',
	        styles: [__webpack_require__(355)],
	        template: __webpack_require__(357)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	], SoundcloudCallbackComponent);
	exports.SoundcloudCallbackComponent = SoundcloudCallbackComponent;
	var _a, _b;


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(356);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 356 */
153,
/* 357 */
/***/ (function(module, exports) {

	module.exports = "<h1>The authentication with Soundcloud was successful!</h1>\n";

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const session_model_1 = __webpack_require__(136);
	const playlist_model_1 = __webpack_require__(142);
	let LikedTracksViewComponent = class LikedTracksViewComponent {
	    constructor() {
	        this.session = session_model_1.Session.getInstance();
	        this.user = this.session.get('user');
	    }
	    ngOnInit() {
	        if (this.user.get('authenticated')) {
	            this.user.get('likes').fetch({ reset: true });
	        }
	    }
	};
	LikedTracksViewComponent = __decorate([
	    core_1.Component({
	        selector: 'liked-track-view',
	        styles: [__webpack_require__(359)],
	        template: __webpack_require__(361),
	        providers: [playlist_model_1.Playlist]
	    }), 
	    __metadata('design:paramtypes', [])
	], LikedTracksViewComponent);
	exports.LikedTracksViewComponent = LikedTracksViewComponent;


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(360);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 360 */
153,
/* 361 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    <i class=\"fa fa-heart\" aria-hidden=\"true\"></i> Liked Tracks\n  </view-header>\n\n  <scroll-view>\n    <track-list [tracks]=\"user.get('likes')\"></track-list>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const session_model_1 = __webpack_require__(136);
	const authenticated_user_playlist_model_1 = __webpack_require__(143);
	const user_analytics_service_1 = __webpack_require__(83);
	let UserPlayListViewComponent = class UserPlayListViewComponent {
	    constructor(route, router, userAnalyticsService) {
	        this.route = route;
	        this.router = router;
	        this.userAnalyticsService = userAnalyticsService;
	        this.playlist = new authenticated_user_playlist_model_1.AuthenticatedUserPlaylist();
	        this.session = session_model_1.Session.getInstance();
	        this.isInEditMode = false;
	    }
	    fetchPlaylist() {
	        if (this.session.isValid() && this.playlist.id) {
	            this.playlist.fetch();
	        }
	    }
	    cancel() {
	        this.playlist.fetch();
	        this.isInEditMode = false;
	    }
	    save() {
	        this.userAnalyticsService.trackEvent('saved_playlist', 'click', 'user-playlist-cmp');
	        this.playlist.save().then(() => {
	            this.isInEditMode = false;
	        });
	    }
	    destroy() {
	        this.userAnalyticsService.trackEvent('destroyed_playlist', 'click', 'user-playlist-cmp');
	        let userPlaylists = this.session.get('user').get('playlists');
	        let indexOfPlaylist = userPlaylists.indexOf(this.playlist);
	        let otherPlaylistId;
	        this.playlist.destroy().then(() => {
	            if (userPlaylists.at(indexOfPlaylist)) {
	                otherPlaylistId = userPlaylists.at(indexOfPlaylist).get('id');
	            }
	            else if (userPlaylists.at(indexOfPlaylist - 1)) {
	                otherPlaylistId = userPlaylists.at(indexOfPlaylist - 1).get('id');
	            }
	            if (otherPlaylistId) {
	                this.router.navigate(['../', otherPlaylistId], { relativeTo: this.route });
	            }
	            else {
	                this.router.navigateByUrl('/');
	            }
	        });
	    }
	    ngOnInit() {
	        let userPlaylists = this.session.get('user').get('playlists');
	        this.route.params.forEach((params) => {
	            if (userPlaylists.get(params.id)) {
	                this.playlist = this.session.get('user').get('playlists').get(params.id);
	            }
	            else {
	                this.playlist.clear();
	                this.playlist.set({ id: params.id });
	                this.fetchPlaylist();
	            }
	            userPlaylists.on('update', () => {
	                if (userPlaylists.get(params.id)) {
	                    this.playlist = userPlaylists.get(params.id);
	                }
	            });
	        });
	        this.session.get('user').on('change:authenticated', this.fetchPlaylist(), this);
	    }
	};
	UserPlayListViewComponent = __decorate([
	    core_1.Component({
	        selector: 'user-play-list-view',
	        template: __webpack_require__(363),
	        styles: [__webpack_require__(364)]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _c) || Object])
	], UserPlayListViewComponent);
	exports.UserPlayListViewComponent = UserPlayListViewComponent;
	var _a, _b, _c;


/***/ }),
/* 363 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <form (submit)=\"save()\">\n    <view-header>\n      <div *ngIf=\"isInEditMode\"\n           class=\"title edit-mode form-inline\">\n        <toggle-switch [(value)]=\"playlist.attributes.isPublic\"></toggle-switch>\n        <div class=\"form-group\">\n          <input type=\"text\"\n                 name=\"playlistName\"\n                 class=\"form-control\"\n                 id=\"playlistName\"\n                 placeholder=\"Playlist Name\"\n                 [(ngModel)]=\"playlist.attributes.title\"\n                 required\n                 focusInput>\n        </div>\n        <div class=\"button-group\">\n          <input type=\"button\" class=\"btn btn-danger\" (click)=\"cancel()\" value=\"Cancel\"/>\n          <input type=\"submit\" class=\"btn btn-success\" value=\"Save\"/>\n        </div>\n      </div>\n\n      <div *ngIf=\"!isInEditMode\" class=\"title\">\n        <play-list-icon [playlist]=\"playlist\"></play-list-icon>\n        <span class=\"text\">{{playlist.get('title')}}</span>\n        <div class=\"button-group\">\n          <button class=\"btn btn-default\" (click)=\"isInEditMode = true\">\n            <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-default btn-danger\" (click)=\"destroy()\">\n            <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n\n    </view-header>\n  </form>\n\n  <scroll-view>\n    <track-list [tracks]=\"playlist.get('tracks')\" [canBeDeleted]=\"true\"></track-list>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(365);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host .form-group {\n  margin-bottom: 0; }\n\n:host input[type=\"text\"] {\n  font-size: 20px;\n  width: 100%;\n  border-radius: 4px;\n  margin-right: 5px; }\n\n:host /deep/ view-header .default-playlist-img {\n  border: 1px solid;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  margin-right: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px; }\n\n:host /deep/ view-header .title {\n  display: flex;\n  align-items: center;\n  width: 100%; }\n  :host /deep/ view-header .title .text {\n    white-space: nowrap;\n    overflow: hidden; }\n\n:host /deep/ view-header .form-group {\n  display: flex;\n  width: 100%; }\n\n:host /deep/ view-header .button-group {\n  margin-left: auto;\n  display: flex;\n  flex-wrap: nowrap; }\n", ""]);

	// exports


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const authenticated_user_playlists_1 = __webpack_require__(367);
	let AuthenticatedUserPlaylistsViewComponent = class AuthenticatedUserPlaylistsViewComponent extends authenticated_user_playlists_1.AuthenticatedUserPlaylists {
	};
	AuthenticatedUserPlaylistsViewComponent = __decorate([
	    core_1.Component({
	        selector: 'authenticated-user-playlists-view',
	        template: __webpack_require__(371),
	        styles: [__webpack_require__(372)]
	    }), 
	    __metadata('design:paramtypes', [])
	], AuthenticatedUserPlaylistsViewComponent);
	exports.AuthenticatedUserPlaylistsViewComponent = AuthenticatedUserPlaylistsViewComponent;


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const session_model_1 = __webpack_require__(136);
	const authenticated_user_playlist_model_1 = __webpack_require__(143);
	const user_analytics_service_1 = __webpack_require__(83);
	let AuthenticatedUserPlaylists = class AuthenticatedUserPlaylists {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.session = session_model_1.Session.getInstance();
	        this.user = this.session.get('user');
	        this.valueChange = new core_1.EventEmitter();
	        this.isFetching = false;
	        this.isInCreationMode = false;
	        this.tmpPlaylist = new authenticated_user_playlist_model_1.AuthenticatedUserPlaylist();
	        this.dropTrack = (dropData, playlist) => {
	            this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'menu-playlist-bar');
	            playlist.get('tracks').create(dropData);
	        };
	    }
	    fetchPlaylists() {
	        if (this.user.get('authenticated') && !this.isFetching) {
	            this.isFetching = true;
	            let playlist = this.user.get('playlists');
	            this.user.get('playlists').fetch().then(() => {
	                this.isFetching = false;
	                this.valueChange.emit();
	            });
	        }
	    }
	    ;
	    ngOnInit() {
	        this.user.on('change:authenticated', this.fetchPlaylists.bind(this));
	        this.fetchPlaylists();
	    }
	    ;
	    save() {
	        let newPlaylist = this.user.get('playlists').add(this.tmpPlaylist.toJSON());
	        newPlaylist.save().then(() => {
	            this.tmpPlaylist.clear();
	        });
	    }
	    cancel() {
	        if (!this.tmpPlaylist.get('title') || this.tmpPlaylist.get('title').length < 1) {
	            this.isInCreationMode = false;
	        }
	    }
	    addNewPlaylist() {
	        this.isInCreationMode = true;
	    }
	    createPlaylist() {
	        this.userAnalyticsService.trackEvent('created_playlist', 'click', 'menu-playlist-bar');
	        this.user.get('playlists').create(this.tmpPlaylist.toJSON(), { at: 0 });
	        this.isInCreationMode = false;
	        this.tmpPlaylist.clear();
	    }
	    isAuthenticated() {
	        return this.session.get('user').get('authenticated');
	    }
	};
	AuthenticatedUserPlaylists = __decorate([
	    core_1.Component({
	        selector: 'authenticated-user-playlists',
	        styles: [__webpack_require__(368)],
	        template: __webpack_require__(370),
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _a) || Object])
	], AuthenticatedUserPlaylists);
	exports.AuthenticatedUserPlaylists = AuthenticatedUserPlaylists;
	var _a;


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(369);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".dummy-playlist-item i,\n.dummy-playlist-item .text,\n.dummy-playlist-item:hover i,\n.dummy-playlist-item:hover .text {\n  background: #cbcbcb;\n  color: transparent !important; }\n\n.playlist-item {\n  transition: background 0.5s ease; }\n  .playlist-item.drag-over {\n    background: #ddd; }\n    .playlist-item.drag-over .text {\n      color: #ff3600 !important; }\n", ""]);

	// exports


/***/ }),
/* 370 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"authenticated-user-playlists\">\n\n  <div class=\"nav-item new-playlist\"\n       [class.disabled]=\"!isAuthenticated()\"\n       (click)=\"addNewPlaylist()\">\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n    <div class=\"text\">New Playlist</div>\n  </div>\n\n  <div *ngIf=\"isInCreationMode\"\n       class=\"nav-item\">\n    <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n    <div class=\"text\">\n      <form class=\"form-inline\" (submit)=\"createPlaylist()\">\n        <div class=\"form-group\">\n          <input type=\"text\"\n                 name=\"playlistName\"\n                 class=\"form-control\"\n                 id=\"playlistName\"\n                 placeholder=\"Playlist Name\"\n                 [(ngModel)]=\"tmpPlaylist.attributes.title\"\n                 (blur)=\"cancel()\"\n                 required\n                 #newPlaylistInput\n                 focusInput>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <a *ngFor=\"let playlist of user.get('playlists').models\"\n     routerLink=\"me/playlists/{{playlist.get('id')}}\"\n     class=\"playlist-item\"\n     [routerLinkActive]=\"['is-active']\"\n\n     dropzone\n     [dropCallback]=\"dropTrack\"\n     [dropItemRef]=\"playlist\">\n    <play-list-icon [playlist]=\"playlist\"></play-list-icon>\n    <div class=\"text\">{{playlist.get('title')}}</div>\n  </a>\n\n  <div *ngIf=\"!isAuthenticated()\">\n    <a class=\"dummy-playlist-item disabled\" style=\"opacity: 0.3\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n      <div class=\"text\" style=\"width: 30%\">Playlists</div>\n    </a>\n\n    <a class=\"dummy-playlist-item disabled\" style=\"opacity: 0.2\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n      <div class=\"text\" style=\"width: 45%\">Playlists</div>\n    </a>\n\n    <a class=\"dummy-playlist-item disabled\" style=\"opacity: 0.1\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n      <div class=\"text\" style=\"width: 40%\">Playlists</div>\n    </a>\n  </div>\n\n</div>\n";

/***/ }),
/* 371 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    Playlists\n  </view-header>\n\n  <scroll-view>\n\n    <div class=\"card\">\n      <div class=\"well\">\n        <h5>Create a new Playlist</h5>\n        <form>\n          <toggle-switch [(value)]=\"tmpPlaylist.attributes.isPublic\"></toggle-switch>\n          <input type=\"text\" placeholder=\"Playlist\" name=\"playlistName\" [(ngModel)]=\"tmpPlaylist.attributes.title\">\n          <button class=\"btn btn-round btn-primary\" (click)=\"save()\" title=\"Create playlist\"><i class=\"fa fa-plus\"></i></button>\n        </form>\n      </div>\n\n      <div class=\"playlists\">\n        <div *ngFor=\"let playlist of user.get('playlists').models\">\n          <a routerLink=\"/me/playlists/{{playlist.get('id')}}\" dropzone [dropCallback]=\"dropTrack\" [dropItemRef]=\"playlist\">\n            <div class=\"cover\">\n              <img [src]=\"playlist.get('artwork_url').getDefaultSize()\">\n            </div>\n            <div class=\"details\">\n              <p>{{playlist.get('title')}}</p>\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(373);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "section.column {\n  border-right: solid 1px #dad9d9; }\n\nform {\n  display: flex;\n  align-items: center; }\n  form input[type=\"text\"] {\n    flex-grow: 1; }\n\ndiv.details {\n  display: flex;\n  height: 100px; }\n  div.details p {\n    vertical-align: middle;\n    font-weight: bold;\n    line-height: 95px;\n    text-align: left;\n    font-size: 16px;\n    margin: 0 10px;\n    float: left;\n    flex: auto; }\n  div.details button {\n    flex-basis: 20px;\n    margin: 25px 10px; }\n\n.icon {\n  font-size: 24px;\n  color: black; }\n\n.icon:before {\n  visibility: visible; }\n\n.icon:checked {\n  color: lightgray; }\n\ninput[type=checkbox].icon {\n  visibility: hidden; }\n\na {\n  padding: 10px;\n  color: #222222;\n  display: inline-block;\n  text-align: center;\n  width: 100%; }\n\na:hover {\n  color: #777777;\n  text-decoration: none; }\n\ndiv.cover {\n  float: left;\n  display: inline-block;\n  position: relative;\n  margin: 10px;\n  width: 80px;\n  height: 80px;\n  background: #ff3600;\n  background: linear-gradient(#f70, #f30);\n  clip-path: circle(50% at 50% 50%); }\n  div.cover img {\n    margin: auto;\n    width: 80px; }\n", ""]);

	// exports


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const auth_service_1 = __webpack_require__(147);
	let AuthenticatedUserViewComponent = class AuthenticatedUserViewComponent {
	    constructor(authService) {
	        this.authService = authService;
	    }
	    disconnect() {
	        this.authService.disconnect();
	    }
	};
	AuthenticatedUserViewComponent = __decorate([
	    core_1.Component({
	        selector: 'authenticated-user-view',
	        template: __webpack_require__(375),
	        styles: [__webpack_require__(376)]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object])
	], AuthenticatedUserViewComponent);
	exports.AuthenticatedUserViewComponent = AuthenticatedUserViewComponent;
	var _a;


/***/ }),
/* 375 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    Your profile\n  </view-header>\n\n  <scroll-view>\n    <div class=\"card\">\n      <button class=\"btn btn-danger btn-block\"\n              (click)=\"disconnect()\">Sign Out</button>\n    </div>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(377);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "section.column {\n  border-right: solid 1px #dad9d9; }\n\ndiv.details {\n  display: flex;\n  height: 100px; }\n  div.details p {\n    vertical-align: middle;\n    font-weight: bold;\n    line-height: 95px;\n    text-align: left;\n    font-size: 16px;\n    margin: 0 10px;\n    float: left;\n    flex: auto; }\n  div.details button {\n    flex-basis: 40px;\n    margin: 25px 10px; }\n\n.icon {\n  font-size: 24px;\n  color: black; }\n\n.icon:before {\n  visibility: visible; }\n\n.icon:checked {\n  color: lightgray; }\n\ninput[type=checkbox].icon {\n  visibility: hidden; }\n\na {\n  padding: 10px;\n  color: #222222;\n  display: inline-block;\n  text-align: center;\n  width: 100%; }\n\na:hover {\n  color: #777777;\n  text-decoration: none; }\n\ndiv.cover {\n  float: left;\n  display: inline-block;\n  position: relative;\n  margin: 10px;\n  width: 80px;\n  height: 80px;\n  background: #ff3600;\n  background: linear-gradient(#f70, #f30);\n  clip-path: circle(50% at 50% 50%); }\n  div.cover img {\n    margin: auto;\n    width: 80px; }\n", ""]);

	// exports


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracks_module_1 = __webpack_require__(89);
	const playlist_routes_1 = __webpack_require__(379);
	const platform_browser_1 = __webpack_require__(21);
	const playlist_view_component_1 = __webpack_require__(380);
	const shared_module_1 = __webpack_require__(121);
	const playlist_icon_component_1 = __webpack_require__(384);
	let PlaylistModule = class PlaylistModule {
	};
	PlaylistModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            tracks_module_1.TracksModule,
	            playlist_routes_1.PlaylistsRoutingModule,
	            shared_module_1.SharedModule
	        ],
	        exports: [
	            playlist_icon_component_1.PlayListIconComponent
	        ],
	        declarations: [
	            playlist_view_component_1.PlayListViewComponent,
	            playlist_icon_component_1.PlayListIconComponent
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], PlaylistModule);
	exports.PlaylistModule = PlaylistModule;


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const playlist_view_component_1 = __webpack_require__(380);
	const routes = [
	    { path: 'playlists/:id', component: playlist_view_component_1.PlayListViewComponent }
	];
	let PlaylistsRoutingModule = class PlaylistsRoutingModule {
	};
	PlaylistsRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], PlaylistsRoutingModule);
	exports.PlaylistsRoutingModule = PlaylistsRoutingModule;


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const playlist_model_1 = __webpack_require__(142);
	let PlayListViewComponent = class PlayListViewComponent {
	    constructor(route, playlist) {
	        this.route = route;
	        this.playlist = playlist;
	    }
	    ngOnInit() {
	        this.route.params.forEach((params) => {
	            this.playlist.clear();
	            this.playlist.set({ id: params.id });
	            this.playlist.fetch();
	        });
	    }
	};
	PlayListViewComponent = __decorate([
	    core_1.Component({
	        selector: 'play-list-view',
	        styles: [__webpack_require__(381)],
	        template: __webpack_require__(383),
	        providers: [playlist_model_1.Playlist]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof playlist_model_1.Playlist !== 'undefined' && playlist_model_1.Playlist) === 'function' && _b) || Object])
	], PlayListViewComponent);
	exports.PlayListViewComponent = PlayListViewComponent;
	var _a, _b;


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(382);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 382 */
153,
/* 383 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    <i class=\"fa fa-heart\" aria-hidden=\"true\"></i> {{playlist.get('title')}}\n  </view-header>\n\n  <scroll-view>\n    <track-list [tracks]=\"playlist.get('tracks')\"></track-list>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const playlist_model_1 = __webpack_require__(142);
	let PlayListIconComponent = class PlayListIconComponent {
	    constructor() {
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof playlist_model_1.Playlist !== 'undefined' && playlist_model_1.Playlist) === 'function' && _a) || Object)
	], PlayListIconComponent.prototype, "playlist", void 0);
	PlayListIconComponent = __decorate([
	    core_1.Component({
	        selector: 'play-list-icon',
	        styles: [__webpack_require__(385)],
	        template: __webpack_require__(387)
	    }), 
	    __metadata('design:paramtypes', [])
	], PlayListIconComponent);
	exports.PlayListIconComponent = PlayListIconComponent;
	var _a;


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(386);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".playlist-icon {\n  position: relative; }\n  .playlist-icon .cover {\n    border-radius: 50%;\n    background: #ff3600;\n    margin: 0 13px 0 0;\n    width: 30px;\n    height: 30px;\n    flex-shrink: 0; }\n    .playlist-icon .cover img {\n      border-radius: 50%;\n      width: 100%;\n      height: 100%;\n      vertical-align: top; }\n  .playlist-icon i {\n    border: 1px solid;\n    border-radius: 50%;\n    width: 30px;\n    height: 30px;\n    margin-right: 13px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12px; }\n  .playlist-icon .private-badge {\n    position: absolute;\n    right: 5px;\n    bottom: -5px;\n    width: 20px;\n    height: 20px;\n    background: #fcfcfc;\n    border-radius: 50%; }\n    .playlist-icon .private-badge i {\n      width: inherit;\n      height: inherit; }\n", ""]);

	// exports


/***/ }),
/* 387 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"playlist-icon\">\n  <div *ngIf=\"playlist.get('artwork_url').getDefaultSize()\"\n       class=\"cover\">\n    <img [src]=\"playlist.get('artwork_url').getDefaultSize()\">\n  </div>\n  <i *ngIf=\"!playlist.get('artwork_url').getDefaultSize()\"\n     class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n  <div *ngIf=\"!playlist.get('isPublic')\"\n       class=\"private-badge\">\n    <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n  </div>\n</div>\n";

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const base_collection_1 = __webpack_require__(76);
	const h_readable_seconds_pipe_1 = __webpack_require__(122);
	const user_analytics_service_1 = __webpack_require__(83);
	let SearchFilterComponent = class SearchFilterComponent {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.showFilterForm = false;
	        this.transformProgressBarValues = function (input) {
	            return this.humanReadableSecPipe.transform(input / 1000, null);
	        }.bind(this);
	        this.humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
	    }
	    toggleFilterForm() {
	        if (this.showFilterForm) {
	            this.userAnalyticsService.trackEvent('close_filter_form', 'click', 'search-filter-cmp');
	            this.showFilterForm = false;
	        }
	        else {
	            this.userAnalyticsService.trackEvent('open_filter_form', 'click', 'search-filter-cmp');
	            this.showFilterForm = true;
	        }
	    }
	    transformDuration(input = '') {
	        return this.humanReadableSecPipe.transform(input, null);
	    }
	    reFetch(changedAttr) {
	        this.collection.fetch({ reset: true });
	        this.userAnalyticsService.trackEvent(`filter_${changedAttr}`, 'click', 'search-filter-cmp');
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof base_collection_1.BaseCollection !== 'undefined' && base_collection_1.BaseCollection) === 'function' && _a) || Object)
	], SearchFilterComponent.prototype, "collection", void 0);
	SearchFilterComponent = __decorate([
	    core_1.Component({
	        selector: 'search-filter',
	        styles: [__webpack_require__(389)],
	        template: __webpack_require__(391),
	        animations: [
	            core_1.trigger('visibilityChanged', [
	                core_1.state('true', core_1.style({ height: '*', marginBottom: '15px', padding: '15px', })),
	                core_1.state('false', core_1.style({ height: 0, marginBottom: 0, padding: 0, display: 'none' })),
	                core_1.state('void', core_1.style({ height: 0, marginBottom: 0, padding: 0, display: 'none' })),
	                core_1.transition('* => *', core_1.animate('200ms ease-in-out'))
	            ])
	        ]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_b = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _b) || Object])
	], SearchFilterComponent);
	exports.SearchFilterComponent = SearchFilterComponent;
	var _a, _b;


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(390);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".search-filter {\n  position: relative; }\n  .search-filter .nav-tabs {\n    z-index: 1;\n    position: relative;\n    margin-bottom: -2px;\n    border-bottom: none; }\n    .search-filter .nav-tabs li a {\n      border: none; }\n      .search-filter .nav-tabs li a:hover, .search-filter .nav-tabs li a:focus {\n        background: none; }\n    .search-filter .nav-tabs li.active a {\n      background: #fcfcfc; }\n  .search-filter .item-amount {\n    position: absolute;\n    right: 0;\n    top: 9px; }\n    .search-filter .item-amount .label {\n      background: transparent;\n      border: 1px solid #666;\n      color: #666; }\n  .search-filter .new-filter {\n    position: relative;\n    background: #fcfcfc;\n    width: 100%;\n    padding: 30px 15px 15px;\n    margin-bottom: 15px;\n    overflow: hidden;\n    border-radius: 4px; }\n\n@media (max-width: 992px) {\n  .search-filter {\n    padding-left: 15px;\n    padding-right: 15px; }\n    .search-filter .item-amount {\n      right: 15px; } }\n", ""]);

	// exports


/***/ }),
/* 391 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"search-filter\">\n  <ul class=\"nav nav-tabs\">\n    <li role=\"presentation\" [class.active]=\"!showFilterForm\"><a (click)=\"toggleFilterForm()\">All Results</a></li>\n    <li role=\"presentation\" [class.active]=\"showFilterForm\"><a (click)=\"toggleFilterForm()\">Filter Result</a></li>\n  </ul>\n  <div class=\"item-amount\">\n    <span class=\"label label-default\">{{collection.length}} Tracks</span>\n  </div>\n  <div class=\"new-filter\" [@visibilityChanged]=\"showFilterForm\">\n    <form class=\"form-horizontal\">\n\n      <div class=\"form-group\">\n        <label class=\"col-sm-2 control-label\">Duration</label>\n        <div class=\"col-sm-10\">\n          <two-range-slider\n            [(minValue)]=\"this.collection.queryParams['duration[from]']\"\n            [(maxValue)]=\"this.collection.queryParams['duration[to]']\"\n            [min]=\"1000\"\n            [max]=\"3600000\"\n            [allowInfinityMin]=\"true\"\n            [allowInfinityMax]=\"true\"\n            [transformDisplayValue]=\"transformProgressBarValues\"\n            (maxValueChanged)=\"reFetch('duration_to')\"\n            (minValueChanged)=\"reFetch('duration_from')\"\n            [step]=\"1000\">\n          </two-range-slider>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"col-sm-2 control-label\">BPM</label>\n        <div class=\"col-sm-10\">\n          <two-range-slider\n            [(minValue)]=\"this.collection.queryParams['bpm[from]']\"\n            [(maxValue)]=\"this.collection.queryParams['bpm[to]']\"\n            [min]=\"20\"\n            [max]=\"200\"\n            [allowInfinityMin]=\"true\"\n            [allowInfinityMax]=\"true\"\n            (maxValueChanged)=\"reFetch('bpm_to')\"\n            (minValueChanged)=\"reFetch('bpm_from')\"\n            [step]=\"20\">\n          </two-range-slider>\n        </div>\n      </div>\n\n      <!--<div class=\"form-group\">-->\n        <!--<label class=\"col-sm-2 control-label\">Genre</label>-->\n        <!--<div class=\"col-sm-10\">-->\n          <!--<input type=\"text\"-->\n                 <!--class=\"form-control\"-->\n                 <!--name=\"genres\"-->\n                 <!--[(ngModel)]=\"this.collection.queryParams['genres']\">-->\n        <!--</div>-->\n      <!--</div>-->\n\n      <!--<div class=\"well\">-->\n        <!--<p>Save this filter as a quick filter</p>-->\n        <!--<div class=\"form-group\">-->\n          <!--<label class=\"sr-only\" for=\"exampleInputPassword3\">Password</label>-->\n          <!--<input type=\"text\" class=\"form-control\" id=\"exampleInputPassword3\" placeholder=\"Password\">-->\n        <!--</div>-->\n      <!--</div>-->\n\n    </form>\n  </div>\n</div>\n";

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_analytics_service_1 = __webpack_require__(83);
	const localforage = __webpack_require__(146);
	let SocialSharePanelComponent = class SocialSharePanelComponent {
	    constructor(el, userAnalyticsService) {
	        this.el = el;
	        this.userAnalyticsService = userAnalyticsService;
	    }
	    shared(type) {
	        this.dismiss();
	        this.userAnalyticsService.trackEvent('social_shared_on_' + type, 'click', 'social-share-panel-component');
	        localforage.setItem('shared_cp', type);
	    }
	    notShared() {
	        this.dismiss();
	        this.userAnalyticsService.trackEvent('social_not_shared', 'click', 'social-share-panel-component');
	        localforage.setItem('shared_cp', "none");
	    }
	    dismiss() {
	        this.el.nativeElement.remove();
	    }
	    ngOnInit() {
	        this.el.nativeElement.style.display = 'none';
	        localforage.getItem('shared_cp').then((value) => {
	            if (!value) {
	                this.el.nativeElement.style.display = 'block';
	            }
	        });
	    }
	};
	SocialSharePanelComponent = __decorate([
	    core_1.Component({
	        selector: 'social-share-panel',
	        styles: [__webpack_require__(393)],
	        template: __webpack_require__(395)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _b) || Object])
	], SocialSharePanelComponent);
	exports.SocialSharePanelComponent = SocialSharePanelComponent;
	var _a, _b;


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(394);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host .social-button-holder {\n  display: flex;\n  justify-content: flex-start; }\n  :host .social-button-holder > * {\n    margin-right: 5px; }\n    :host .social-button-holder > *:last-child {\n      margin-right: 0; }\n\n:host .nope-btn {\n  margin: 0;\n  height: 29px;\n  border-radius: 4px;\n  padding: 0 10px;\n  display: flex;\n  align-items: center; }\n", ""]);

	// exports


/***/ }),
/* 395 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"social-share-panel\">\n  <h3>Thanks for using Cloudplayer</h3>\n  <p>When you like our player you can do us a favor and share Cloudplayer to support further development. Thank you :)</p>\n  <div class=\"social-button-holder\">\n    <facebook-share-button (click)=\"shared('FB')\"></facebook-share-button>\n    <twitter-share-button (click)=\"shared('TW')\"></twitter-share-button>\n    <div class=\"btn btn-default nope-btn\" (click)=\"notShared()\">Nah, I'm fine</div>\n  </div>\n</div>\n";

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const session_model_1 = __webpack_require__(136);
	let MainComponent = class MainComponent {
	    constructor() {
	        this.isAuthenticated = false;
	        this.session = session_model_1.Session.getInstance();
	    }
	    ngOnInit() {
	        this.session.get('user').on('change:authenticated', (user) => {
	            this.setAuthenticated(user);
	        });
	        if (this.session.isValid()) {
	            this.setAuthenticated(this.session.get('user'));
	        }
	    }
	    setAuthenticated(user) {
	        if (user.get('authenticated')) {
	            user.fetch().then(() => {
	                this.isAuthenticated = true;
	                user.get('likes').fetch();
	            });
	        }
	        else {
	            this.isAuthenticated = false;
	        }
	    }
	    ;
	};
	MainComponent = __decorate([
	    core_1.Component({
	        selector: 'cloud-player',
	        styles: [__webpack_require__(397)],
	        template: __webpack_require__(399),
	        encapsulation: core_1.ViewEncapsulation.None
	    }), 
	    __metadata('design:paramtypes', [])
	], MainComponent);
	exports.MainComponent = MainComponent;


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(398);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Raleway:400,600);", ""]);

	// module
	exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Raleway\", Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #333333;\n  background-color: #fff; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\na {\n  color: #ff3600;\n  text-decoration: none; }\n  a:hover, a:focus {\n    color: #b32600;\n    text-decoration: underline; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\nfigure {\n  margin: 0; }\n\nimg {\n  vertical-align: middle; }\n\n.img-responsive {\n  display: block;\n  max-width: 100%;\n  height: auto; }\n\n.img-rounded {\n  border-radius: 6px; }\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto; }\n\n.img-circle {\n  border-radius: 50%; }\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container:before, .container:after {\n    content: \" \";\n    display: table; }\n  .container:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .container {\n      width: 750px; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 970px; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1170px; } }\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container-fluid:before, .container-fluid:after {\n    content: \" \";\n    display: table; }\n  .container-fluid:after {\n    clear: both; }\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .row:before, .row:after {\n    content: \" \";\n    display: table; }\n  .row:after {\n    clear: both; }\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left; }\n\n.col-xs-1 {\n  width: 8.33333%; }\n\n.col-xs-2 {\n  width: 16.66667%; }\n\n.col-xs-3 {\n  width: 25%; }\n\n.col-xs-4 {\n  width: 33.33333%; }\n\n.col-xs-5 {\n  width: 41.66667%; }\n\n.col-xs-6 {\n  width: 50%; }\n\n.col-xs-7 {\n  width: 58.33333%; }\n\n.col-xs-8 {\n  width: 66.66667%; }\n\n.col-xs-9 {\n  width: 75%; }\n\n.col-xs-10 {\n  width: 83.33333%; }\n\n.col-xs-11 {\n  width: 91.66667%; }\n\n.col-xs-12 {\n  width: 100%; }\n\n.col-xs-pull-0 {\n  right: auto; }\n\n.col-xs-pull-1 {\n  right: 8.33333%; }\n\n.col-xs-pull-2 {\n  right: 16.66667%; }\n\n.col-xs-pull-3 {\n  right: 25%; }\n\n.col-xs-pull-4 {\n  right: 33.33333%; }\n\n.col-xs-pull-5 {\n  right: 41.66667%; }\n\n.col-xs-pull-6 {\n  right: 50%; }\n\n.col-xs-pull-7 {\n  right: 58.33333%; }\n\n.col-xs-pull-8 {\n  right: 66.66667%; }\n\n.col-xs-pull-9 {\n  right: 75%; }\n\n.col-xs-pull-10 {\n  right: 83.33333%; }\n\n.col-xs-pull-11 {\n  right: 91.66667%; }\n\n.col-xs-pull-12 {\n  right: 100%; }\n\n.col-xs-push-0 {\n  left: auto; }\n\n.col-xs-push-1 {\n  left: 8.33333%; }\n\n.col-xs-push-2 {\n  left: 16.66667%; }\n\n.col-xs-push-3 {\n  left: 25%; }\n\n.col-xs-push-4 {\n  left: 33.33333%; }\n\n.col-xs-push-5 {\n  left: 41.66667%; }\n\n.col-xs-push-6 {\n  left: 50%; }\n\n.col-xs-push-7 {\n  left: 58.33333%; }\n\n.col-xs-push-8 {\n  left: 66.66667%; }\n\n.col-xs-push-9 {\n  left: 75%; }\n\n.col-xs-push-10 {\n  left: 83.33333%; }\n\n.col-xs-push-11 {\n  left: 91.66667%; }\n\n.col-xs-push-12 {\n  left: 100%; }\n\n.col-xs-offset-0 {\n  margin-left: 0%; }\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-xs-offset-3 {\n  margin-left: 25%; }\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-xs-offset-6 {\n  margin-left: 50%; }\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-xs-offset-9 {\n  margin-left: 75%; }\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-xs-offset-12 {\n  margin-left: 100%; }\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; }\n  .col-sm-1 {\n    width: 8.33333%; }\n  .col-sm-2 {\n    width: 16.66667%; }\n  .col-sm-3 {\n    width: 25%; }\n  .col-sm-4 {\n    width: 33.33333%; }\n  .col-sm-5 {\n    width: 41.66667%; }\n  .col-sm-6 {\n    width: 50%; }\n  .col-sm-7 {\n    width: 58.33333%; }\n  .col-sm-8 {\n    width: 66.66667%; }\n  .col-sm-9 {\n    width: 75%; }\n  .col-sm-10 {\n    width: 83.33333%; }\n  .col-sm-11 {\n    width: 91.66667%; }\n  .col-sm-12 {\n    width: 100%; }\n  .col-sm-pull-0 {\n    right: auto; }\n  .col-sm-pull-1 {\n    right: 8.33333%; }\n  .col-sm-pull-2 {\n    right: 16.66667%; }\n  .col-sm-pull-3 {\n    right: 25%; }\n  .col-sm-pull-4 {\n    right: 33.33333%; }\n  .col-sm-pull-5 {\n    right: 41.66667%; }\n  .col-sm-pull-6 {\n    right: 50%; }\n  .col-sm-pull-7 {\n    right: 58.33333%; }\n  .col-sm-pull-8 {\n    right: 66.66667%; }\n  .col-sm-pull-9 {\n    right: 75%; }\n  .col-sm-pull-10 {\n    right: 83.33333%; }\n  .col-sm-pull-11 {\n    right: 91.66667%; }\n  .col-sm-pull-12 {\n    right: 100%; }\n  .col-sm-push-0 {\n    left: auto; }\n  .col-sm-push-1 {\n    left: 8.33333%; }\n  .col-sm-push-2 {\n    left: 16.66667%; }\n  .col-sm-push-3 {\n    left: 25%; }\n  .col-sm-push-4 {\n    left: 33.33333%; }\n  .col-sm-push-5 {\n    left: 41.66667%; }\n  .col-sm-push-6 {\n    left: 50%; }\n  .col-sm-push-7 {\n    left: 58.33333%; }\n  .col-sm-push-8 {\n    left: 66.66667%; }\n  .col-sm-push-9 {\n    left: 75%; }\n  .col-sm-push-10 {\n    left: 83.33333%; }\n  .col-sm-push-11 {\n    left: 91.66667%; }\n  .col-sm-push-12 {\n    left: 100%; }\n  .col-sm-offset-0 {\n    margin-left: 0%; }\n  .col-sm-offset-1 {\n    margin-left: 8.33333%; }\n  .col-sm-offset-2 {\n    margin-left: 16.66667%; }\n  .col-sm-offset-3 {\n    margin-left: 25%; }\n  .col-sm-offset-4 {\n    margin-left: 33.33333%; }\n  .col-sm-offset-5 {\n    margin-left: 41.66667%; }\n  .col-sm-offset-6 {\n    margin-left: 50%; }\n  .col-sm-offset-7 {\n    margin-left: 58.33333%; }\n  .col-sm-offset-8 {\n    margin-left: 66.66667%; }\n  .col-sm-offset-9 {\n    margin-left: 75%; }\n  .col-sm-offset-10 {\n    margin-left: 83.33333%; }\n  .col-sm-offset-11 {\n    margin-left: 91.66667%; }\n  .col-sm-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left; }\n  .col-md-1 {\n    width: 8.33333%; }\n  .col-md-2 {\n    width: 16.66667%; }\n  .col-md-3 {\n    width: 25%; }\n  .col-md-4 {\n    width: 33.33333%; }\n  .col-md-5 {\n    width: 41.66667%; }\n  .col-md-6 {\n    width: 50%; }\n  .col-md-7 {\n    width: 58.33333%; }\n  .col-md-8 {\n    width: 66.66667%; }\n  .col-md-9 {\n    width: 75%; }\n  .col-md-10 {\n    width: 83.33333%; }\n  .col-md-11 {\n    width: 91.66667%; }\n  .col-md-12 {\n    width: 100%; }\n  .col-md-pull-0 {\n    right: auto; }\n  .col-md-pull-1 {\n    right: 8.33333%; }\n  .col-md-pull-2 {\n    right: 16.66667%; }\n  .col-md-pull-3 {\n    right: 25%; }\n  .col-md-pull-4 {\n    right: 33.33333%; }\n  .col-md-pull-5 {\n    right: 41.66667%; }\n  .col-md-pull-6 {\n    right: 50%; }\n  .col-md-pull-7 {\n    right: 58.33333%; }\n  .col-md-pull-8 {\n    right: 66.66667%; }\n  .col-md-pull-9 {\n    right: 75%; }\n  .col-md-pull-10 {\n    right: 83.33333%; }\n  .col-md-pull-11 {\n    right: 91.66667%; }\n  .col-md-pull-12 {\n    right: 100%; }\n  .col-md-push-0 {\n    left: auto; }\n  .col-md-push-1 {\n    left: 8.33333%; }\n  .col-md-push-2 {\n    left: 16.66667%; }\n  .col-md-push-3 {\n    left: 25%; }\n  .col-md-push-4 {\n    left: 33.33333%; }\n  .col-md-push-5 {\n    left: 41.66667%; }\n  .col-md-push-6 {\n    left: 50%; }\n  .col-md-push-7 {\n    left: 58.33333%; }\n  .col-md-push-8 {\n    left: 66.66667%; }\n  .col-md-push-9 {\n    left: 75%; }\n  .col-md-push-10 {\n    left: 83.33333%; }\n  .col-md-push-11 {\n    left: 91.66667%; }\n  .col-md-push-12 {\n    left: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0%; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left; }\n  .col-lg-1 {\n    width: 8.33333%; }\n  .col-lg-2 {\n    width: 16.66667%; }\n  .col-lg-3 {\n    width: 25%; }\n  .col-lg-4 {\n    width: 33.33333%; }\n  .col-lg-5 {\n    width: 41.66667%; }\n  .col-lg-6 {\n    width: 50%; }\n  .col-lg-7 {\n    width: 58.33333%; }\n  .col-lg-8 {\n    width: 66.66667%; }\n  .col-lg-9 {\n    width: 75%; }\n  .col-lg-10 {\n    width: 83.33333%; }\n  .col-lg-11 {\n    width: 91.66667%; }\n  .col-lg-12 {\n    width: 100%; }\n  .col-lg-pull-0 {\n    right: auto; }\n  .col-lg-pull-1 {\n    right: 8.33333%; }\n  .col-lg-pull-2 {\n    right: 16.66667%; }\n  .col-lg-pull-3 {\n    right: 25%; }\n  .col-lg-pull-4 {\n    right: 33.33333%; }\n  .col-lg-pull-5 {\n    right: 41.66667%; }\n  .col-lg-pull-6 {\n    right: 50%; }\n  .col-lg-pull-7 {\n    right: 58.33333%; }\n  .col-lg-pull-8 {\n    right: 66.66667%; }\n  .col-lg-pull-9 {\n    right: 75%; }\n  .col-lg-pull-10 {\n    right: 83.33333%; }\n  .col-lg-pull-11 {\n    right: 91.66667%; }\n  .col-lg-pull-12 {\n    right: 100%; }\n  .col-lg-push-0 {\n    left: auto; }\n  .col-lg-push-1 {\n    left: 8.33333%; }\n  .col-lg-push-2 {\n    left: 16.66667%; }\n  .col-lg-push-3 {\n    left: 25%; }\n  .col-lg-push-4 {\n    left: 33.33333%; }\n  .col-lg-push-5 {\n    left: 41.66667%; }\n  .col-lg-push-6 {\n    left: 50%; }\n  .col-lg-push-7 {\n    left: 58.33333%; }\n  .col-lg-push-8 {\n    left: 66.66667%; }\n  .col-lg-push-9 {\n    left: 75%; }\n  .col-lg-push-10 {\n    left: 83.33333%; }\n  .col-lg-push-11 {\n    left: 91.66667%; }\n  .col-lg-push-12 {\n    left: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0%; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-offset-12 {\n    margin-left: 100%; } }\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5; }\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold; }\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal; }\n\ninput[type=\"file\"] {\n  display: block; }\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%; }\n\nselect[multiple],\nselect[size] {\n  height: auto; }\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control:focus {\n    border-color: #ff8666;\n    outline: 0;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 134, 102, 0.6);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 134, 102, 0.6); }\n  .form-control::-moz-placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #999; }\n  .form-control::-webkit-input-placeholder {\n    color: #999; }\n  .form-control::-ms-expand {\n    border: 0;\n    background-color: transparent; }\n  .form-control[disabled], .form-control[readonly],\n  fieldset[disabled] .form-control {\n    background-color: #eeeeee;\n    opacity: 1; }\n  .form-control[disabled],\n  fieldset[disabled] .form-control {\n    cursor: not-allowed; }\n\ntextarea.form-control {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px; }\n  input[type=\"date\"].input-sm, .input-group-sm > input[type=\"date\"].form-control,\n  .input-group-sm > input[type=\"date\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-sm input[type=\"date\"],\n  input[type=\"time\"].input-sm,\n  .input-group-sm > input[type=\"time\"].form-control,\n  .input-group-sm > input[type=\"time\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-sm\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-sm\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-sm,\n  .input-group-sm > input[type=\"month\"].form-control,\n  .input-group-sm > input[type=\"month\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-sm\n  input[type=\"month\"] {\n    line-height: 30px; }\n  input[type=\"date\"].input-lg, .input-group-lg > input[type=\"date\"].form-control,\n  .input-group-lg > input[type=\"date\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-lg input[type=\"date\"],\n  input[type=\"time\"].input-lg,\n  .input-group-lg > input[type=\"time\"].form-control,\n  .input-group-lg > input[type=\"time\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-lg\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-lg\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-lg,\n  .input-group-lg > input[type=\"month\"].form-control,\n  .input-group-lg > input[type=\"month\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-lg\n  input[type=\"month\"] {\n    line-height: 46px; } }\n\n.form-group {\n  margin-bottom: 15px; }\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  .radio label,\n  .checkbox label {\n    min-height: 20px;\n    padding-left: 20px;\n    margin-bottom: 0;\n    font-weight: normal;\n    cursor: pointer; }\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9; }\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px; }\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer; }\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px; }\n\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed; }\n\n.radio-inline.disabled,\nfieldset[disabled] .radio-inline,\n.checkbox-inline.disabled,\nfieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed; }\n\n.radio.disabled label,\nfieldset[disabled] .radio label,\n.checkbox.disabled label,\nfieldset[disabled]\n.checkbox label {\n  cursor: not-allowed; }\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px; }\n  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn {\n    padding-left: 0;\n    padding-right: 0; }\n\n.input-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\nselect.input-sm, .input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn {\n  height: 30px;\n  line-height: 30px; }\n\ntextarea.input-sm, .input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\nselect[multiple].input-sm,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px; }\n\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto; }\n\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.input-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\nselect.input-lg, .input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn {\n  height: 46px;\n  line-height: 46px; }\n\ntextarea.input-lg, .input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\nselect[multiple].input-lg,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px; }\n\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto; }\n\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.has-feedback {\n  position: relative; }\n  .has-feedback .form-control {\n    padding-right: 42.5px; }\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none; }\n\n.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px; }\n\n.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px; }\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d; }\n\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-success .form-control:focus {\n    border-color: #2b542c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168; }\n\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8; }\n\n.has-success .form-control-feedback {\n  color: #3c763d; }\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b; }\n\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-warning .form-control:focus {\n    border-color: #66512c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }\n\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3; }\n\n.has-warning .form-control-feedback {\n  color: #8a6d3b; }\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442; }\n\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-error .form-control:focus {\n    border-color: #843534;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }\n\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede; }\n\n.has-error .form-control-feedback {\n  color: #a94442; }\n\n.has-feedback label ~ .form-control-feedback {\n  top: 25px; }\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0; }\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373; }\n\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n    .form-inline .radio label,\n    .form-inline .checkbox label {\n      padding-left: 0; }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px; }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px; }\n\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .form-horizontal .form-group:before, .form-horizontal .form-group:after {\n    content: \" \";\n    display: table; }\n  .form-horizontal .form-group:after {\n    clear: both; }\n\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px; } }\n\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px; }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px; } }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px; } }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:hover, .btn:focus, .btn.focus {\n    color: #333;\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    outline: 0;\n    background-image: none;\n    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn.disabled, .btn[disabled],\n  fieldset[disabled] .btn {\n    cursor: not-allowed;\n    opacity: 0.65;\n    filter: alpha(opacity=65);\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-default:focus, .btn-default.focus {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #8c8c8c; }\n  .btn-default:hover {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus,\n    .open > .btn-default.dropdown-toggle:hover,\n    .open > .btn-default.dropdown-toggle:focus,\n    .open > .btn-default.dropdown-toggle.focus {\n      color: #333;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    background-image: none; }\n  .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus,\n  fieldset[disabled] .btn-default:hover,\n  fieldset[disabled] .btn-default:focus,\n  fieldset[disabled] .btn-default.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-default .badge {\n    color: #fff;\n    background-color: #333; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #ff3600;\n  border-color: #e63100; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #cc2b00;\n    border-color: #661600; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #cc2b00;\n    border-color: #a82400; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #cc2b00;\n    border-color: #a82400; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #a82400;\n      border-color: #661600; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    background-image: none; }\n  .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus,\n  fieldset[disabled] .btn-primary:hover,\n  fieldset[disabled] .btn-primary:focus,\n  fieldset[disabled] .btn-primary.focus {\n    background-color: #ff3600;\n    border-color: #e63100; }\n  .btn-primary .badge {\n    color: #ff3600;\n    background-color: #fff; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #255625; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #255625; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    background-image: none; }\n  .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus,\n  fieldset[disabled] .btn-success:hover,\n  fieldset[disabled] .btn-success:focus,\n  fieldset[disabled] .btn-success.focus {\n    background-color: #5cb85c;\n    border-color: #4cae4c; }\n  .btn-success .badge {\n    color: #5cb85c;\n    background-color: #fff; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #1b6d85; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1b6d85; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    background-image: none; }\n  .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus,\n  fieldset[disabled] .btn-info:hover,\n  fieldset[disabled] .btn-info:focus,\n  fieldset[disabled] .btn-info.focus {\n    background-color: #5bc0de;\n    border-color: #46b8da; }\n  .btn-info .badge {\n    color: #5bc0de;\n    background-color: #fff; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #985f0d; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #985f0d; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    background-image: none; }\n  .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus,\n  fieldset[disabled] .btn-warning:hover,\n  fieldset[disabled] .btn-warning:focus,\n  fieldset[disabled] .btn-warning.focus {\n    background-color: #f0ad4e;\n    border-color: #eea236; }\n  .btn-warning .badge {\n    color: #f0ad4e;\n    background-color: #fff; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #d9534f;\n    background-color: #fff; }\n\n.btn-link {\n  color: #ff3600;\n  font-weight: normal;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled],\n  fieldset[disabled] .btn-link {\n    background-color: transparent;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover, .btn-link:focus {\n    color: #b32600;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link[disabled]:hover, .btn-link[disabled]:focus,\n  fieldset[disabled] .btn-link:hover,\n  fieldset[disabled] .btn-link:focus {\n    color: #777777;\n    text-decoration: none; }\n\n.btn-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.btn-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-xs {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate; }\n  .input-group[class*=\"col-\"] {\n    float: none;\n    padding-left: 0;\n    padding-right: 0; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  .input-group-addon.input-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 5px 10px;\n    font-size: 12px;\n    border-radius: 3px; }\n  .input-group-addon.input-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 10px 16px;\n    font-size: 18px;\n    border-radius: 6px; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:first-child {\n  border-right: 0; }\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group-addon:last-child {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {\n      z-index: 2; }\n  .input-group-btn:first-child > .btn,\n  .input-group-btn:first-child > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:last-child > .btn,\n  .input-group-btn:last-child > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none; }\n  .nav:before, .nav:after {\n    content: \" \";\n    display: table; }\n  .nav:after {\n    clear: both; }\n  .nav > li {\n    position: relative;\n    display: block; }\n    .nav > li > a {\n      position: relative;\n      display: block;\n      padding: 10px 15px; }\n      .nav > li > a:hover, .nav > li > a:focus {\n        text-decoration: none;\n        background-color: #eeeeee; }\n    .nav > li.disabled > a {\n      color: #777777; }\n      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\n        color: #777777;\n        text-decoration: none;\n        background-color: transparent;\n        cursor: not-allowed; }\n  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n    background-color: #eeeeee;\n    border-color: #ff3600; }\n  .nav .nav-divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .nav > li > a > img {\n    max-width: none; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs > li {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs > li > a {\n      margin-right: 2px;\n      line-height: 1.42857;\n      border: 1px solid transparent;\n      border-radius: 4px 4px 0 0; }\n      .nav-tabs > li > a:hover {\n        border-color: #eeeeee #eeeeee #ddd; }\n    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n      color: #555555;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-bottom-color: transparent;\n      cursor: default; }\n\n.nav-pills > li {\n  float: left; }\n  .nav-pills > li > a {\n    border-radius: 4px; }\n  .nav-pills > li + li {\n    margin-left: 2px; }\n  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\n    color: #fff;\n    background-color: #ff3600; }\n\n.nav-stacked > li {\n  float: none; }\n  .nav-stacked > li + li {\n    margin-top: 2px;\n    margin-left: 0; }\n\n.nav-justified, .nav-tabs.nav-justified {\n  width: 100%; }\n  .nav-justified > li, .nav-tabs.nav-justified > li {\n    float: none; }\n    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n      text-align: center;\n      margin-bottom: 5px; }\n  .nav-justified > .dropdown .dropdown-menu {\n    top: auto;\n    left: auto; }\n  @media (min-width: 768px) {\n    .nav-justified > li, .nav-tabs.nav-justified > li {\n      display: table-cell;\n      width: 1%; }\n      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n        margin-bottom: 0; } }\n\n.nav-tabs-justified, .nav-tabs.nav-justified {\n  border-bottom: 0; }\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n    margin-right: 0;\n    border-radius: 4px; }\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n    border: 1px solid #ddd; }\n  @media (min-width: 768px) {\n    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n      border-bottom: 1px solid #ddd;\n      border-radius: 4px 4px 0 0; }\n    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n    .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n    .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n      border-bottom-color: #fff; } }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em; }\n  .label:empty {\n    display: none; }\n  .btn .label {\n    position: relative;\n    top: -1px; }\n\na.label:hover, a.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-default {\n  background-color: #777777; }\n  .label-default[href]:hover, .label-default[href]:focus {\n    background-color: #5e5e5e; }\n\n.label-primary {\n  background-color: #ff3600; }\n  .label-primary[href]:hover, .label-primary[href]:focus {\n    background-color: #cc2b00; }\n\n.label-success {\n  background-color: #5cb85c; }\n  .label-success[href]:hover, .label-success[href]:focus {\n    background-color: #449d44; }\n\n.label-info {\n  background-color: #5bc0de; }\n  .label-info[href]:hover, .label-info[href]:focus {\n    background-color: #31b0d5; }\n\n.label-warning {\n  background-color: #f0ad4e; }\n  .label-warning[href]:hover, .label-warning[href]:focus {\n    background-color: #ec971f; }\n\n.label-danger {\n  background-color: #d9534f; }\n  .label-danger[href]:hover, .label-danger[href]:focus {\n    background-color: #c9302c; }\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px; }\n  .badge:empty {\n    display: none; }\n  .btn .badge {\n    position: relative;\n    top: -1px; }\n  .btn-xs .badge,\n  .btn-group-xs > .btn .badge {\n    top: 0;\n    padding: 1px 5px; }\n  .list-group-item.active > .badge,\n  .nav-pills > .active > a > .badge {\n    color: #ff3600;\n    background-color: #fff; }\n  .list-group-item > .badge {\n    float: right; }\n  .list-group-item > .badge + .badge {\n    margin-right: 5px; }\n  .nav-pills > li > a > .badge {\n    margin-left: 3px; }\n\na.badge:hover, a.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.pull-right {\n  float: right !important; }\n\n.pull-left {\n  float: left !important; }\n\n.hide {\n  display: none !important; }\n\n.show {\n  display: block !important; }\n\n.invisible {\n  visibility: hidden; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.hidden {\n  display: none !important; }\n\n.affix {\n  position: fixed; }\n\n@-ms-viewport {\n  width: device-width; }\n\n.visible-xs {\n  display: none !important; }\n\n.visible-sm {\n  display: none !important; }\n\n.visible-md {\n  display: none !important; }\n\n.visible-lg {\n  display: none !important; }\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important; }\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important; }\n  table.visible-xs {\n    display: table !important; }\n  tr.visible-xs {\n    display: table-row !important; }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important; }\n  table.visible-sm {\n    display: table !important; }\n  tr.visible-sm {\n    display: table-row !important; }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important; }\n  table.visible-md {\n    display: table !important; }\n  tr.visible-md {\n    display: table-row !important; }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important; }\n  table.visible-lg {\n    display: table !important; }\n  tr.visible-lg {\n    display: table-row !important; }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important; } }\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important; } }\n\n.visible-print {\n  display: none !important; }\n\n@media print {\n  .visible-print {\n    display: block !important; }\n  table.visible-print {\n    display: table !important; }\n  tr.visible-print {\n    display: table-row !important; }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important; } }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n/* Global styles */\nh2 {\n  font-size: 28px;\n  margin-top: 10px; }\n\n* {\n  font-family: \"Raleway\", Helvetica, sans-serif;\n  font-weight: 300; }\n\nhtml, body {\n  height: 100vh;\n  width: 100%; }\n\nbody {\n  background: #efefef;\n  overflow: hidden; }\n\na {\n  cursor: pointer; }\n\na.disabled, div.disabled {\n  pointer-events: none;\n  cursor: default;\n  color: #999 !important; }\n\nbutton:focus {\n  outline: 0 !important; }\n\n.btn {\n  margin: 5px; }\n  .btn:focus {\n    outline: 0; }\n\n.btn-round {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%; }\n\n.btn-brand {\n  background: #ff3600;\n  border-color: #fff;\n  color: white; }\n  .btn-brand:hover {\n    background: #e63100;\n    color: white; }\n\n.btn-danger {\n  color: #d9534f;\n  background-color: #fff;\n  border-color: #d43f3a;\n  transition: all 0.3s ease; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #d9534f;\n    background-color: #e6e6e6;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #d9534f;\n      background-color: #d4d4d4;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #fff;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #fff;\n    background-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n    .btn-danger:hover:focus, .btn-danger:hover.focus {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #761c19; }\n    .btn-danger:hover:hover {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #ac2925; }\n    .btn-danger:hover:active, .btn-danger:hover.active,\n    .open > .btn-danger:hover.dropdown-toggle {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #ac2925; }\n      .btn-danger:hover:active:hover, .btn-danger:hover:active:focus, .btn-danger:hover:active.focus, .btn-danger:hover.active:hover, .btn-danger:hover.active:focus, .btn-danger:hover.active.focus,\n      .open > .btn-danger:hover.dropdown-toggle:hover,\n      .open > .btn-danger:hover.dropdown-toggle:focus,\n      .open > .btn-danger:hover.dropdown-toggle.focus {\n        color: #fff;\n        background-color: #ac2925;\n        border-color: #761c19; }\n    .btn-danger:hover:active, .btn-danger:hover.active,\n    .open > .btn-danger:hover.dropdown-toggle {\n      background-image: none; }\n    .btn-danger:hover.disabled:hover, .btn-danger:hover.disabled:focus, .btn-danger:hover.disabled.focus, .btn-danger:hover[disabled]:hover, .btn-danger:hover[disabled]:focus, .btn-danger:hover[disabled].focus,\n    fieldset[disabled] .btn-danger:hover:hover,\n    fieldset[disabled] .btn-danger:hover:focus,\n    fieldset[disabled] .btn-danger:hover.focus {\n      background-color: #d9534f;\n      border-color: #d43f3a; }\n    .btn-danger:hover .badge {\n      color: #d9534f;\n      background-color: #fff; }\n\n.divider {\n  position: relative; }\n  .divider .title {\n    display: flex; }\n    .divider .title:before, .divider .title:after {\n      content: \"\";\n      position: relative;\n      border-top: 1px solid #ccc;\n      flex-grow: 1;\n      margin: 9px 3px; }\n    .divider .title:before {\n      max-width: 10px; }\n\n.main {\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  max-width: 1500px;\n  background: #efefef;\n  margin: auto;\n  box-shadow: 0 0 8px 0 #c8c8c8; }\n  .main .flex-container {\n    display: flex; }\n  .main .routes {\n    width: 100%;\n    max-width: 800px;\n    margin: 0 auto;\n    overflow: auto; }\n\nbody.native.desktop .native-bar {\n  -webkit-app-region: drag;\n  width: 100vw;\n  background: #777777;\n  position: relative; }\n  body.native.desktop .native-bar:after {\n    content: '';\n    width: 100%;\n    height: 3px;\n    background: #ff3600;\n    position: absolute;\n    bottom: 0; }\n\nbody.native.desktop.darwin .native-bar {\n  height: 27px; }\n\n.label + .label {\n  margin-left: 5px; }\n\n.label.label-light {\n  background: transparent;\n  border: 1px solid; }\n  .label.label-light.label-default {\n    color: #777777; }\n  .label.label-light.label-primary {\n    color: #ff3600; }\n  .label.label-light.label-success {\n    color: #5cb85c; }\n  .label.label-light.label-danger {\n    color: #d9534f; }\n  .label.label-light.label-info {\n    color: #5bc0de; }\n  .label.label-light.label-warning {\n    color: #f0ad4e; }\n\n.scrollable {\n  overflow: auto;\n  display: block; }\n  .scrollable::-webkit-scrollbar {\n    display: none; }\n\n/* Medium devices (desktops, 992px and up) */\n@media (min-width: 992px) {\n  .main .routes {\n    padding: 15px; } }\n\n@media (min-width: 1200px) {\n  .main .routes {\n    margin: 0;\n    max-width: initial; } }\n", ""]);

	// exports


/***/ }),
/* 399 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"main\">\n\n  <div class=\"native-bar\"></div>\n\n  <main class=\"flex-container\">\n\n    <nav-sidebar class=\"flex-item\"></nav-sidebar>\n    <audio-player class=\"flex-item\"></audio-player>\n    <div class=\"routes\">\n      <router-outlet class=\"flex-item\"></router-outlet>\n    </div>\n\n  </main>\n\n</section>\n\n<view-change-loader></view-change-loader>\n";

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const desktop_app_view_component_1 = __webpack_require__(401);
	const routes = [
	    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	    { path: 'desktop-app', component: desktop_app_view_component_1.DesktopAppViewComponent }
	];
	let MainRoutingModule = class MainRoutingModule {
	};
	MainRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], MainRoutingModule);
	exports.MainRoutingModule = MainRoutingModule;


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const client_detector_service_1 = __webpack_require__(131);
	const user_analytics_service_1 = __webpack_require__(83);
	let DesktopAppViewComponent = class DesktopAppViewComponent {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	    }
	    isWindowsPc() {
	        let os = client_detector_service_1.ClientDetector.getOs();
	        return (os.name === client_detector_service_1.OsNames.Windows && os.version >= 7);
	    }
	    isMacPc() {
	        let os = client_detector_service_1.ClientDetector.getOs();
	        return (os.name === client_detector_service_1.OsNames.MacOs && os.version > 0);
	    }
	    download(platform) {
	        this.userAnalyticsService.trackEvent(`download_desktop_app_${platform}`, 'click', 'desktop-app-view');
	    }
	};
	DesktopAppViewComponent = __decorate([
	    core_1.Component({
	        selector: 'cloud-player',
	        styles: [__webpack_require__(402)],
	        template: __webpack_require__(406)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _a) || Object])
	], DesktopAppViewComponent);
	exports.DesktopAppViewComponent = DesktopAppViewComponent;
	var _a;


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(403);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host .screenshot {\n  background-position-y: initial;\n  -webkit-background-size: cover;\n  margin-left: -15px;\n  width: calc(100% + 30px);\n  margin-top: -10px;\n  border-radius: 4px 4px 0 0; }\n  :host .screenshot.win {\n    background: url(" + __webpack_require__(404) + ") no-repeat;\n    height: 300px; }\n  :host .screenshot.osx {\n    background: url(" + __webpack_require__(405) + ") no-repeat;\n    height: 300px; }\n\n:host .tutorial .img-holder {\n  text-align: center; }\n", ""]);

	// exports


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "win-screenshot.72c50c881a234637ac1418f6a00c7f3a.png";

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "osx-screenshot.1ea45195d62c85507366f794aaa27816.png";

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<section class=\"column\">\n  <view-header>\n    Desktop App\n  </view-header>\n\n  <scroll-view>\n    <div class=\"card\">\n      <div class=\"screenshot\"\n           [class.win]=\"isWindowsPc()\"\n           [class.osx]=\"isMacPc()\"></div>\n      <div>\n        <h3>Download the native Cloud Player App to install it on your PC.</h3>\n        <ul>\n          <li>Create a shortcut to Cloud Player on your Desktop</li>\n          <li>Control the Cloud Player from your keyboard (play/pause, next track, previous track)</li>\n          <li>Have all the other nice features of Cloud Player</li>\n        </ul>\n      </div>\n      <a *ngIf=\"isWindowsPc()\"\n         href=\"https://github.com/Cloud-Player/desktop-app/releases/download/v0.1.8/cloud-player.setup.exe\"\n         class=\"btn btn-primary btn-block\"\n         (click)=\"download('WIN')\">\n        Download for Windows\n      </a>\n\n      <a *ngIf=\"isMacPc()\"\n         href=\"https://github.com/Cloud-Player/desktop-app/releases/download/v0.1.8/cloud-player.dmg\"\n         class=\"btn btn-primary btn-block\"\n         (click)=\"download('OSX')\">\n        Download for Mac\n      </a>\n\n      <div *ngIf=\"!isWindowsPc() && !isMacPc()\"\n           class=\"alert alert-info\">\n        Sorry for this platform we don't have a native app yet :(\n      </div>\n    </div>\n\n    <div class=\"card tutorial osx\"\n         *ngIf=\"isMacPc()\">\n      <h2>How to Install</h2>\n      <h3>Open the downloaded <i>cloud-player.dmg</i> file</h3>\n      <div class=\"img-holder\">\n        <img src=\"" + __webpack_require__(407) + "\" width=\"400px\"/>\n      </div>\n      <p>After the Download has finished open the dmg file. Drag and drop the Cloud Player app into the <i>Applications</i> folder</p>\n      <hr>\n      <h3>Start Cloud Player</h3>\n      <p>\n        We could not sign the Cloud Player with an official Apple developer certificate. When you try to start it, macOS will tell you\n        that the application is from an unidentified developer.\n        <br>\n        <br>\n        To open the app anyway locate Cloud Player in the <i>Applications</i> folder. Control click the Cloud Player app icon\n        and then choose <i>Open</i> from the shortcut menu.\n        <br>\n        <br>\n        This has to be done only when you start Cloud Player for the first time.\n        <br>\n        <br>\n        <a href=\"https://support.apple.com/kb/PH25088?locale=en_US\" target=\"_blank\">More information...</a>\n\n      </p>\n    </div>\n\n    <div class=\"card tutorial win\"\n         *ngIf=\"isWindowsPc()\">\n      <h2>How to Install</h2>\n      <h3>Open the downloaded <i>cloud-player.setup.exe</i> file</h3>\n      <div class=\"img-holder\">\n        <img src=\"" + __webpack_require__(408) + "\" width=\"400px\"/>\n      </div>\n      <p>\n        After the Download has finished open the exe file.\n      </p>\n      <p>\n        We could not sign the Cloud Player with an official Windows developer certificate. Therefore the Windows\n        Security Agent\n        will prevent starting the installation process\n        <br>\n        <br>\n        To start the installation anyway click on the button \"More Info\" (1). A new button \"Run anyway\" will appear (2).\n        Click\n        on that button to start the installation process\n      </p>\n    </div>\n  </scroll-view>\n</section>\n";

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "osx-dmg.6e033680f5cb65a592061aa159b6e9fa.png";

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "win-exe.25d192266a404622165f3c54c8982243.png";

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const forms_1 = __webpack_require__(62);
	const platform_browser_1 = __webpack_require__(21);
	const playqueue_component_1 = __webpack_require__(410);
	const shared_module_1 = __webpack_require__(121);
	const audio_player_component_1 = __webpack_require__(414);
	const audio_player_controls_component_1 = __webpack_require__(418);
	const underscore_1 = __webpack_require__(67);
	const localforage = __webpack_require__(146);
	const play_queue_collection_1 = __webpack_require__(125);
	const tracks_collection_1 = __webpack_require__(124);
	const comments_module_1 = __webpack_require__(422);
	let AudioPlayerModule = class AudioPlayerModule {
	    constructor() {
	        let playQueue = play_queue_collection_1.PlayQueue.getInstance();
	        localforage.getItem('sc_playqueue').then((playQueueItems) => {
	            playQueue.add(playQueueItems);
	            if (playQueue.length > 0) {
	                let playQueueItemTracks = playQueue.map((item) => {
	                    return {
	                        id: item.id
	                    };
	                });
	                let tmpTracks = new tracks_collection_1.Tracks();
	                tmpTracks.add(playQueueItemTracks);
	                if (tmpTracks.length > 0) {
	                    tmpTracks.refresh().then(function (tracks) {
	                        tracks.forEach((track) => {
	                            playQueue.add({ track: track }, { merge: true, silent: true });
	                        });
	                    });
	                }
	            }
	        });
	        let debouncedPlayQueueSave = underscore_1.debounce(() => {
	            localforage.setItem('sc_playqueue', playQueue.getScheduledItemsJSON(30));
	        }, 1000);
	        playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
	    }
	};
	AudioPlayerModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            shared_module_1.SharedModule,
	            comments_module_1.CommentsModule
	        ],
	        declarations: [
	            audio_player_controls_component_1.AudioPlayerControlsComponent,
	            audio_player_component_1.AudioPlayerComponent,
	            playqueue_component_1.PlayQueueComponent
	        ],
	        exports: [
	            audio_player_component_1.AudioPlayerComponent
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], AudioPlayerModule);
	exports.AudioPlayerModule = AudioPlayerModule;


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const play_queue_collection_1 = __webpack_require__(125);
	const track_cover_component_1 = __webpack_require__(127);
	const user_analytics_service_1 = __webpack_require__(83);
	let PlayQueueComponent = class PlayQueueComponent {
	    constructor(userAnalyticsService) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.coverSize = track_cover_component_1.CoverSizes.Medium;
	        this.dropTrack = (dropData) => {
	            this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'play-queue');
	            if (this.playQueue.length > 0) {
	                this.playQueue.queue({ track: dropData });
	            }
	            else {
	                this.playQueue.addAndPlay({ track: dropData });
	            }
	        };
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	        this.playQueue.on('add', (playQueueItem) => {
	            if (playQueueItem.isQueued()) {
	                this.userAnalyticsService.trackEvent('queue_track', 'add', 'play-queue');
	            }
	        });
	    }
	};
	PlayQueueComponent = __decorate([
	    core_1.Component({
	        selector: 'play-queue',
	        styles: [__webpack_require__(411)],
	        template: __webpack_require__(413)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _a) || Object])
	], PlayQueueComponent);
	exports.PlayQueueComponent = PlayQueueComponent;
	var _a;


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(412);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".play-queue {\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 10px 15px;\n  margin-top: -5px;\n  height: calc(100vh - 490px);\n  background: #fcfcfc; }\n  .play-queue .queued-tracks-list .divider,\n  .play-queue .scheduled-tracks-list .divider {\n    margin: 5px -15px 10px -15px; }\n  .play-queue .queued-tracks-list .track,\n  .play-queue .scheduled-tracks-list .track {\n    display: flex;\n    margin-bottom: 10px; }\n    .play-queue .queued-tracks-list .track track-cover,\n    .play-queue .scheduled-tracks-list .track track-cover {\n      width: 60px;\n      height: 60px;\n      flex-shrink: 0;\n      margin-right: 10px; }\n    .play-queue .queued-tracks-list .track .details,\n    .play-queue .scheduled-tracks-list .track .details {\n      flex-grow: 1;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n      .play-queue .queued-tracks-list .track .details.dummy .title,\n      .play-queue .queued-tracks-list .track .details.dummy .artist,\n      .play-queue .scheduled-tracks-list .track .details.dummy .title,\n      .play-queue .scheduled-tracks-list .track .details.dummy .artist {\n        background: #eeeeee;\n        color: transparent; }\n      .play-queue .queued-tracks-list .track .details.dummy .title,\n      .play-queue .scheduled-tracks-list .track .details.dummy .title {\n        width: 90%; }\n      .play-queue .queued-tracks-list .track .details.dummy .artist,\n      .play-queue .scheduled-tracks-list .track .details.dummy .artist {\n        width: 70%; }\n      .play-queue .queued-tracks-list .track .details.dummy .stats,\n      .play-queue .scheduled-tracks-list .track .details.dummy .stats {\n        display: none; }\n      .play-queue .queued-tracks-list .track .details .stats,\n      .play-queue .scheduled-tracks-list .track .details .stats {\n        margin-top: 5px; }\n        .play-queue .queued-tracks-list .track .details .stats > div,\n        .play-queue .scheduled-tracks-list .track .details .stats > div {\n          display: inline-block;\n          font-size: 11px;\n          color: #777777; }\n  .play-queue::-webkit-scrollbar {\n    display: none; }\n\n@media (max-width: 767px) {\n  :host {\n    display: none; } }\n", ""]);

	// exports


/***/ }),
/* 413 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"play-queue\"\n     dropzone\n     [dropCallback]=\"dropTrack\">\n\n  <div class=\"queued-tracks-list\" *ngIf=\"playQueue.getQueuedItems().length > 0\">\n    <div class=\"divider\">\n      <div class=\"title\">Coming up next</div>\n    </div>\n    <div *ngFor=\"let playQueueItem of playQueue.getQueuedItems()\"\n         class=\"track\"\n         draggable=\"true\"\n         [dragData]=\"playQueueItem.get('track').toJSON()\"\n         [dragImageUrl]=\"playQueueItem.get('track').get('artwork_url').getSmallSize()\"\n         dragEffect=\"copy\">\n      <track-cover [track]=\"playQueueItem.get('track')\" [size]=\"coverSize\"></track-cover>\n      <div class=\"details\"\n           [class.dummy]=\"!playQueueItem.get('track').get('user').get('username')\">\n        <div style=\"display: flex; align-items: center\">\n          <b class=\"title\"\n             style=\"flex-grow: 1; width: inherit; overflow: hidden; text-overflow: ellipsis;\">\n            {{playQueueItem.get('track').get('title')|| 'None'}}\n          </b>\n          <button class=\"btn btn-xs btn-default\" (click)=\"playQueueItem.unQueue()\">\n            <span class=\"fa fa-trash\"></span>\n          </button>\n        </div>\n        <div class=\"artist\">{{playQueueItem.get('track').get('user').get('username')}}</div>\n        <div class=\"stats\">\n          <div class=\"duration\">\n            <i class=\"fa fa-clock-o\" aria-hidden=\"true\" alt=\"play count\"></i>\n            {{playQueueItem.get('track').get('duration')/1000 | hReadableSeconds}}\n          </div>\n          <div *ngIf=\"playQueueItem.get('track').get('genre')\"\n               class=\"genre\">\n            #{{playQueueItem.get('track').get('genre')}}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"scheduled-tracks-list\" *ngIf=\"playQueue.getScheduledItems().length > 0\">\n    <div class=\"divider\">\n      <div class=\"title\">Next Songs</div>\n    </div>\n    <div *ngFor=\"let playQueueItem of playQueue.getScheduledItems()\"\n         class=\"track\"\n         draggable=\"true\"\n         [dragData]=\"playQueueItem.get('track').toJSON()\"\n         [dragImageUrl]=\"playQueueItem.get('track').get('artwork_url').getSmallSize()\"\n         dragEffect=\"copy\">\n      <div class=\"cover\">\n        <track-cover [track]=\"playQueueItem.get('track')\" [size]=\"coverSize\"></track-cover>\n      </div>\n      <div class=\"details\"\n           [class.dummy]=\"!playQueueItem.get('track').get('user').get('username')\">\n        <b class=\"title\">\n          {{playQueueItem.get('track').get('title')|| 'None'}}\n        </b>\n        <div class=\"artist\">{{playQueueItem.get('track').get('user').get('username') || 'None'}}</div>\n        <div class=\"stats\">\n          <div class=\"duration\">\n            <i class=\"fa fa-clock-o\" aria-hidden=\"true\" alt=\"play count\"></i>\n            {{playQueueItem.get('track').get('duration')/1000 | hReadableSeconds}}\n          </div>\n          <div *ngIf=\"playQueueItem.get('track').get('genre')\"\n               class=\"genre\">\n            #{{playQueueItem.get('track').get('genre')}}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"playQueue.getScheduledItems().length === 0 && playQueue.getQueuedItems().length === 0 && !playQueue.getCurrentItem()\">\n    <p>No tracks available. <a routerLink=\"/app\">Search</a> for a track and click on it to play it.</p>\n    <p>You can drag and drop tracks here to add them to the play queue</p>\n\n  </div>\n\n  <div *ngIf=\"playQueue.getScheduledItems().length === 0 && playQueue.getQueuedItems().length === 0 && playQueue.getCurrentItem()\">\n    No more tracks available. <a routerLink=\"/app\">Search</a> for more tracks to keep the party going on.\n  </div>\n\n</div>\n";

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const play_queue_collection_1 = __webpack_require__(125);
	const track_cover_component_1 = __webpack_require__(127);
	let AudioPlayerComponent = class AudioPlayerComponent {
	    getCoverSize() {
	        return track_cover_component_1.CoverSizes.Large;
	    }
	    updateCurrentTime(val) {
	        this.currentPlayingTime = val;
	    }
	    ngOnInit() {
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	        this.playQueue.on('add change:status', () => {
	            if (this.playQueue.hasCurrentItem()) {
	                let item = this.playQueue.getCurrentItem();
	                if (item) {
	                    this.track = item.get('track');
	                }
	            }
	        });
	    }
	};
	AudioPlayerComponent = __decorate([
	    core_1.Component({
	        selector: 'audio-player',
	        styles: [__webpack_require__(415)],
	        template: __webpack_require__(417)
	    }), 
	    __metadata('design:paramtypes', [])
	], AudioPlayerComponent);
	exports.AudioPlayerComponent = AudioPlayerComponent;


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(416);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "@media only screen and (min-width: 320px) {\n  .audio-player {\n    width: 320px;\n    position: relative;\n    box-shadow: 0 8px 8px 0 #c8c8c8;\n    z-index: 99; }\n    .audio-player .track-item {\n      box-shadow: 0 2px 8px 0 #c8c8c8;\n      position: relative;\n      z-index: 1;\n      background: white; }\n      .audio-player .track-item .meta {\n        display: flex;\n        align-items: center;\n        margin: 5px 0;\n        padding-right: 10px;\n        padding-bottom: 15px; }\n        .audio-player .track-item .meta toggle-liked-track {\n          padding: 10px; }\n        .audio-player .track-item .meta .details {\n          overflow: hidden;\n          text-overflow: ellipsis; }\n          .audio-player .track-item .meta .details .track-title,\n          .audio-player .track-item .meta .details .artist {\n            white-space: nowrap; }\n      .audio-player .track-item .dummy i {\n        padding: 10px;\n        color: #ccc; }\n      .audio-player .track-item .dummy .track-title,\n      .audio-player .track-item .dummy .artist {\n        background: #efefef;\n        color: transparent;\n        display: block;\n        height: 17px; }\n      .audio-player .track-item .dummy .track-title {\n        width: 250px;\n        margin-bottom: 4px; }\n      .audio-player .track-item .dummy .artist {\n        width: 100px; } }\n\n@media (max-width: 767px) {\n  :host {\n    position: fixed;\n    bottom: 40px;\n    width: 100vw;\n    z-index: 2; }\n    :host .audio-player {\n      width: 100%;\n      box-shadow: none; }\n      :host .audio-player .track-item {\n        height: 48px; }\n      :host .audio-player .play-track {\n        width: 30px;\n        height: 30px;\n        border-radius: 50%;\n        border: 1px solid;\n        margin: 0 8px; }\n        :host .audio-player .play-track i {\n          font-size: 16px;\n          padding: 6px 9px; }\n      :host .audio-player .meta {\n        padding: 5px 5px 5px 54px !important; }\n        :host .audio-player .meta .artist {\n          display: block; }\n      :host .audio-player /deep/ audio-player-controls .button-container {\n        padding: 0; }\n        :host .audio-player /deep/ audio-player-controls .button-container .prev,\n        :host .audio-player /deep/ audio-player-controls .button-container .next {\n          display: none; }\n        :host .audio-player /deep/ audio-player-controls .button-container .play,\n        :host .audio-player /deep/ audio-player-controls .button-container .pause {\n          width: 30px;\n          height: 30px;\n          border-radius: 50%;\n          border: 1px solid;\n          margin: 0 8px;\n          font-size: inherit;\n          padding: 0;\n          color: inherit;\n          background: none;\n          position: absolute;\n          left: 5px;\n          top: 9px; }\n          :host .audio-player /deep/ audio-player-controls .button-container .play i,\n          :host .audio-player /deep/ audio-player-controls .button-container .pause i {\n            font-size: 16px;\n            padding: 6px 9px; }\n        :host .audio-player /deep/ audio-player-controls .button-container .pause i {\n          padding: 6px 0; }\n      :host .audio-player /deep/ audio-player-controls /deep/ range-slider {\n        top: -10px;\n        position: absolute;\n        width: 100%;\n        left: 0; }\n        :host .audio-player /deep/ audio-player-controls /deep/ range-slider .min-value,\n        :host .audio-player /deep/ audio-player-controls /deep/ range-slider .max-value {\n          display: none; }\n      :host .audio-player.noTrack {\n        display: none; } }\n", ""]);

	// exports


/***/ }),
/* 417 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"audio-player\" [class.noTrack]=\"!track\">\n\n  <div class=\"track-item\">\n\n    <track-cover [track]=\"track\" class=\"hidden-xs\" [size]=\"getCoverSize()\" [animate]=\"true\"></track-cover>\n\n    <!--<user-comments *ngIf=\"track\" [currentTime]=\"currentPlayingTime\" [comments]=\"track.get('comments')\" class=\"hidden-xs\"></user-comments>-->\n\n    <audio-player-controls class=\"controls\" (currentTimeChange)=\"updateCurrentTime($event)\"></audio-player-controls>\n\n    <div *ngIf=\"track\" class=\"meta\">\n      <toggle-liked-track [track]=\"track\" class=\"hidden-xs\"></toggle-liked-track>\n      <div class=\"details\"\n           draggable=\"true\"\n           [dragData]=\"track.toJSON()\"\n           [dragImageUrl]=\"track.get('artwork_url').getSmallSize()\"\n           dragEffect=\"copy\">\n        <b class=\"track-title\">{{track.get('title')}}</b>\n        <div class=\"artist\">{{track.get('user').get('username')}}</div>\n      </div>\n    </div>\n\n    <div *ngIf=\"!track\"\n         class=\"dummy meta\">\n      <i class=\"fa fa-heart-o\"\n         aria-hidden=\"true\"></i>\n      <div class=\"details\">\n        <b class=\"track-title\">abc</b>\n        <div class=\"artist\">abc</div>\n      </div>\n    </div>\n  </div>\n\n  <play-queue class=\"queue\"></play-queue>\n</section>\n";

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const play_queue_collection_1 = __webpack_require__(125);
	const underscore_1 = __webpack_require__(67);
	const localforage = __webpack_require__(146);
	const h_readable_seconds_pipe_1 = __webpack_require__(122);
	const cloud_player_logo_service_1 = __webpack_require__(181);
	const user_analytics_service_1 = __webpack_require__(83);
	let AudioPlayerControlsComponent = class AudioPlayerControlsComponent {
	    constructor(cloudPlayerLogoService, userAnalyticsService) {
	        this.cloudPlayerLogoService = cloudPlayerLogoService;
	        this.userAnalyticsService = userAnalyticsService;
	        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
	        this.hadError = false;
	        this.isBuffering = false;
	        this.currentTimeChange = new core_1.EventEmitter();
	        this.transformProgressBarValues = function (input) {
	            return this.humanReadableSecPipe.transform(input, null);
	        }.bind(this);
	        this.audio = new Audio();
	        this.playQueue.on('change:status', this.reactOnStatusChange, this);
	        this.timeTick = 0;
	        this.duration = 0;
	        this.humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
	        this.setAudioObjectEventListeners();
	    }
	    setAudioObjectEventListeners() {
	        this.audio.addEventListener('canplay', () => {
	            this.duration = this.audio.duration;
	            this.isBuffering = false;
	        });
	        let throttledTimeUpdater = underscore_1.throttle(() => {
	            this.timeTick = this.audio.currentTime;
	            if (this.playQueue.getCurrentItem()) {
	                localforage.setItem('sc_current_track', {
	                    id: this.playQueue.getCurrentItem().get('track').id,
	                    currentTime: this.audio.currentTime,
	                    duration: this.audio.duration
	                });
	                this.currentTimeChange.emit(this.audio.currentTime);
	            }
	        }, 1000);
	        this.audio.addEventListener('timeupdate', throttledTimeUpdater);
	        this.audio.addEventListener('ended', () => {
	            if (this.playQueue.hasNextItem()) {
	                this.nextTrack();
	            }
	            else {
	                this.playQueue.getCurrentItem().stop();
	            }
	        });
	        this.audio.addEventListener('error', () => {
	            this.userAnalyticsService.trackEvent('playback_err', 'click', 'audio-player-cmp');
	            this.hadError = true;
	            this.pauseTrack();
	        });
	        this.audio.addEventListener('playing', () => {
	            this.hadError = false;
	            this.cloudPlayerLogoService.play();
	        });
	        this.audio.addEventListener('waiting', () => {
	            this.isBuffering = true;
	        });
	    }
	    initializeLastPlayingTrack(lastTrack) {
	        let item = this.playQueue.add({ status: 'PAUSED', track: { id: lastTrack.id } }, { at: 0 });
	        item.get('track').fetch().then((track) => {
	            this.audio.src = track.getResourceUrl();
	        });
	        this.audio.currentTime = lastTrack.currentTime;
	        this.timeTick = lastTrack.currentTime;
	        this.duration = lastTrack.duration;
	    }
	    setMobileMediaNotification(track) {
	        if ('mediaSession' in navigator) {
	            let nv = navigator;
	            let artwork = track.get('artwork_url');
	            nv.mediaSession.metadata = new MediaMetadata({
	                title: track.get('title'),
	                artist: track.get('user').get('username'),
	                artwork: [
	                    { src: artwork.getDefaultSize(), sizes: '96x96', type: 'image/jpg' },
	                    { src: artwork.getDefaultSize(), sizes: '128x128', type: 'image/jpg' },
	                    { src: artwork.getDefaultSize(), sizes: '192x192', type: 'image/jpg' },
	                    { src: artwork.getImageByFormat('t300x300'), sizes: '256x256', type: 'image/jpg' },
	                    { src: artwork.getImageByFormat('crop'), sizes: '384x384', type: 'image/jpg' },
	                    { src: artwork.getLargeSize(), sizes: '512x512', type: 'image/jpg' },
	                ]
	            });
	            this.userAnalyticsService.trackEvent('set_notification_chrome_mob', 'click', 'audio-player-cmp');
	            if (this.playQueue.hasPreviousItem()) {
	                nv.mediaSession.setActionHandler('previoustrack', () => {
	                    this.userAnalyticsService.trackEvent('previous_track_chrome_mob', 'click', 'audio-player-cmp');
	                    this.previousTrack();
	                });
	            }
	            if (this.playQueue.hasNextItem()) {
	                this.userAnalyticsService.trackEvent('next_track_chrome_mob', 'click', 'audio-player-cmp');
	                nv.mediaSession.setActionHandler('nexttrack', () => {
	                    this.nextTrack();
	                });
	            }
	        }
	    }
	    ngOnInit() {
	        localforage.getItem('sc_volume').then((volume) => {
	            if (volume) {
	                this.audio.volume = volume;
	            }
	        });
	        localforage.getItem('sc_current_track').then((currentTrack) => {
	            if (currentTrack) {
	                this.initializeLastPlayingTrack(currentTrack);
	            }
	        });
	        window.addEventListener('playPauseTrackKeyPressed', this.togglePlayPause.bind(this));
	        window.addEventListener('nextTrackKeyPressed', this.nextTrack.bind(this));
	        window.addEventListener('previousTrackKeyPressed', this.previousTrack.bind(this));
	        window.addEventListener('abc', function () {
	            console.log('ABC');
	        });
	        if (this.playQueue.getPlayingItem()) {
	            this.startAudioPlayer(this.playQueue.getPlayingItem());
	        }
	    }
	    reactOnStatusChange(item) {
	        switch (item.get('status')) {
	            case 'PLAYING':
	                this.startAudioPlayer(item);
	                break;
	            case 'STOPPED':
	                this.stopAudioPlayer();
	                break;
	            case 'PAUSED':
	                this.pauseAudioPlayer();
	                break;
	        }
	    }
	    setVolume(volume) {
	        this.audio.volume = volume;
	    }
	    saveVolume(volume) {
	        let roundedVolumeStr = (Math.round(volume * 10) / 10).toString();
	        localforage.setItem('sc_volume', roundedVolumeStr);
	    }
	    playTrack(playQueueItem) {
	        this.userAnalyticsService.trackEvent('play_track', 'click', 'audio-player-cmp');
	        playQueueItem = playQueueItem || this.playQueue.getItem();
	        if (playQueueItem) {
	            playQueueItem.play();
	        }
	    }
	    playTrackFromPosition(newTimeSec) {
	        this.audio.currentTime = newTimeSec;
	        this.playTrack(this.playQueue.getPlayingItem());
	    }
	    pauseTrack() {
	        this.userAnalyticsService.trackEvent('pause_track', 'click', 'audio-player-cmp');
	        let track = this.playQueue.getPlayingItem();
	        if (track) {
	            track.pause();
	        }
	        this.pauseAudioPlayer();
	    }
	    togglePlayPause() {
	        let currItem = this.playQueue.getCurrentItem();
	        if (currItem) {
	            if (currItem.isPlaying()) {
	                currItem.pause();
	            }
	            else {
	                currItem.play();
	            }
	        }
	    }
	    previousTrack() {
	        this.userAnalyticsService.trackEvent('next_track', 'click', 'audio-player-cmp');
	        if (this.audio && this.audio.currentTime && this.audio.currentTime > 1) {
	            this.playTrackFromPosition(0);
	        }
	        else {
	            if (this.playQueue.hasPreviousItem()) {
	                this.timeTick = 0;
	                this.playTrack(this.playQueue.getPreviousItem());
	            }
	        }
	    }
	    nextTrack() {
	        this.userAnalyticsService.trackEvent('previous_track', 'click', 'audio-player-cmp');
	        if (this.playQueue.hasNextItem()) {
	            this.timeTick = 0;
	            this.playTrack(this.playQueue.getNextItem());
	        }
	    }
	    startAudioPlayer(item) {
	        let currTime = this.audio.currentTime;
	        if (this.audio.src !== item.get('track').getResourceUrl()) {
	            this.audio.src = item.get('track').getResourceUrl();
	            this.audio.currentTime = 0;
	        }
	        if (this.hadError) {
	            this.audio.src = item.get('track').getResourceUrl();
	            this.audio.load();
	            this.audio.currentTime = currTime;
	        }
	        if (item.get('track').get('comments').length === 0) {
	            item.get('track').get('comments').fetch();
	        }
	        this.timeTick = this.audio.currentTime;
	        this.audio.play();
	        this.setMobileMediaNotification(item.get('track'));
	    }
	    pauseAudioPlayer() {
	        this.audio.pause();
	        this.isBuffering = false;
	        this.cloudPlayerLogoService.pause();
	    }
	    stopAudioPlayer() {
	        this.audio.pause();
	        delete this.audio.src;
	    }
	};
	__decorate([
	    core_1.Output(), 
	    __metadata('design:type', Object)
	], AudioPlayerControlsComponent.prototype, "currentTimeChange", void 0);
	AudioPlayerControlsComponent = __decorate([
	    core_1.Component({
	        selector: 'audio-player-controls',
	        styles: [__webpack_require__(419)],
	        template: __webpack_require__(421)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof cloud_player_logo_service_1.CloudPlayerLogoService !== 'undefined' && cloud_player_logo_service_1.CloudPlayerLogoService) === 'function' && _a) || Object, (typeof (_b = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _b) || Object])
	], AudioPlayerControlsComponent);
	exports.AudioPlayerControlsComponent = AudioPlayerControlsComponent;
	var _a, _b;


/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(420);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".audio-player-controls {\n  width: 100%;\n  margin: 0 auto;\n  display: block;\n  text-align: center;\n  padding: 0 10px;\n  position: relative; }\n  .audio-player-controls .button-container {\n    padding-top: 12px; }\n  .audio-player-controls range-slider {\n    display: block;\n    margin-top: -5px; }\n  .audio-player-controls button.next, .audio-player-controls button.prev {\n    border: none;\n    font-size: 24px;\n    background: none;\n    vertical-align: middle;\n    box-shadow: none; }\n    .audio-player-controls button.next:hover, .audio-player-controls button.prev:hover {\n      color: grey; }\n    .audio-player-controls button.next:disabled, .audio-player-controls button.prev:disabled {\n      pointer-events: none; }\n  .audio-player-controls button.play, .audio-player-controls button.pause {\n    width: 60px;\n    height: 60px;\n    border: none;\n    font-size: 28px;\n    border-radius: 30px; }\n    .audio-player-controls button.play:disabled, .audio-player-controls button.pause:disabled {\n      pointer-events: none; }\n\ndiv.volume, div.time {\n  display: flex;\n  justify-content: space-around; }\n  div.volume span, div.volume i, div.volume div, div.time span, div.time i, div.time div {\n    flex: auto;\n    text-align: center; }\n  div.volume i, div.time i {\n    font-size: 22px; }\n\nbutton i.fa-play {\n  padding-left: 3px; }\n", ""]);

	// exports


/***/ }),
/* 421 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"audio-player-controls\">\n\n  <div class=\"button-container\">\n    <button class=\"btn prev\"\n            type=\"button\"\n            [disabled]=\"!playQueue.hasPreviousItem() && audio.currentTime < 1\"\n            (click)=\"previousTrack()\">\n      <i class=\"fa fa-backward\" aria-hidden=\"true\"></i>\n    </button>\n\n    <button class=\"btn btn-round btn-brand play\"\n            *ngIf=\"!playQueue.getPlayingItem()\"\n            type=\"button\"\n            [disabled]=\"!playQueue.getCurrentItem() || !playQueue.getCurrentItem().get('track').get('stream_url')\"\n            (click)=\"playTrack()\">\n      <i class=\"fa fa-play\" aria-hidden=\"true\"></i>\n    </button>\n\n    <button class=\"btn btn-round btn-brand pause\"\n            *ngIf=\"playQueue.getPlayingItem()\"\n            type=\"button\"\n            (click)=\"pauseTrack()\">\n      <i class=\"fa fa-pause\" aria-hidden=\"true\"></i>\n    </button>\n\n    <button class=\"btn next\"\n            type=\"button\"\n            [disabled]=\"!playQueue.hasNextItem()\"\n            (click)=\"nextTrack()\">\n      <i class=\"fa fa-forward\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n\n  <range-slider [min]=\"0\"\n                [max]=\"duration\"\n                [value]=\"timeTick\"\n                [step]=\"0.01\"\n                [isLoading]=\"isBuffering\"\n                [transformDisplayValue]=\"transformProgressBarValues\"\n                [showCurrentValue]=\"true\"\n                (valueChanged)=\"playTrackFromPosition($event)\"\n                class=\"time\">\n  </range-slider>\n\n  <!--<range-slider [min]=\"0\"-->\n                <!--[max]=\"1\"-->\n                <!--[value]=\"audio.volume\"-->\n                <!--[step]=\"0.01\"-->\n                <!--[hideSliderValue]=\"true\"-->\n                <!--(valueChange)=\"setVolume($event)\"-->\n                <!--(valueChanged)=\"saveVolume($event)\"-->\n                <!--class=\"volume\">-->\n  <!--</range-slider>-->\n</div>\n";

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const forms_1 = __webpack_require__(62);
	const platform_browser_1 = __webpack_require__(21);
	const shared_module_1 = __webpack_require__(121);
	const comments_component_1 = __webpack_require__(423);
	let CommentsModule = class CommentsModule {
	};
	CommentsModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            shared_module_1.SharedModule
	        ],
	        declarations: [
	            comments_component_1.CommentsComponent
	        ],
	        exports: [
	            comments_component_1.CommentsComponent
	        ]
	    }), 
	    __metadata('design:paramtypes', [])
	], CommentsModule);
	exports.CommentsModule = CommentsModule;


/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const comments_collection_1 = __webpack_require__(114);
	const h_readable_seconds_pipe_1 = __webpack_require__(122);
	let CommentsComponent = class CommentsComponent {
	    constructor() {
	        this._commentsMap = {};
	        this._queueItemAliceTimeSecs = 5;
	        this.visibleCommentLines = 0;
	        this.canShowMoreComments = true;
	        this._humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
	        this.commentsQueue = new comments_collection_1.Comments();
	    }
	    _setCommentsTimeMap(comments) {
	        this._commentsMap = {};
	        this.commentsQueue.reset();
	        comments.each((comment) => {
	            let secs = Math.round(comment.get('timestamp') / 1000);
	            if (this._commentsMap[secs]) {
	                this._commentsMap[secs].push(comment);
	            }
	            else {
	                this._commentsMap[secs] = [comment];
	            }
	        });
	    }
	    cleanUpHandler(currentTime) {
	        var removeQueueItems = this.commentsQueue.filter((commentQueueItem) => {
	            return (commentQueueItem.get('timestamp') / 1000) + this._queueItemAliceTimeSecs < currentTime;
	        });
	        removeQueueItems.forEach((item) => {
	            this.commentsQueue.remove(item);
	        });
	    }
	    get currentTime() {
	        return this._currentTime;
	    }
	    set currentTime(val) {
	        this._currentTime = Math.round(val);
	        if (this._commentsMap[this._currentTime]) {
	            this._commentsMap[this._currentTime].forEach((comment) => {
	                if (this.visibleCommentLines < 9) {
	                    this.commentsQueue.push(comment);
	                }
	            });
	        }
	        this.cleanUpHandler(val);
	    }
	    get comments() {
	        return this.comments;
	    }
	    set comments(comments) {
	        if (this._comments) {
	            this._comments.off('update', this._setCommentsTimeMap, this);
	        }
	        this._comments = comments;
	        this._setCommentsTimeMap(this._comments);
	        this._comments.on('update', this._setCommentsTimeMap, this);
	    }
	    updateVisibleLines(val) {
	        this.visibleCommentLines += val;
	        if (val > 0 && !this.canShowMoreComments) {
	            this.canShowMoreComments = this.visibleCommentLines < 15;
	        }
	    }
	};
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', Number)
	], CommentsComponent.prototype, "currentTime", null);
	__decorate([
	    core_1.Input(), 
	    __metadata('design:type', (typeof (_a = typeof comments_collection_1.Comments !== 'undefined' && comments_collection_1.Comments) === 'function' && _a) || Object)
	], CommentsComponent.prototype, "comments", null);
	CommentsComponent = __decorate([
	    core_1.Component({
	        selector: 'user-comments',
	        styles: [__webpack_require__(424)],
	        template: __webpack_require__(426)
	    }), 
	    __metadata('design:paramtypes', [])
	], CommentsComponent);
	exports.CommentsComponent = CommentsComponent;
	var _a;


/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(425);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host {\n  position: absolute;\n  top: 0;\n  height: 290px;\n  margin-top: 15px;\n  overflow: hidden; }\n  :host ul {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n  :host .comment {\n    margin-bottom: 1px;\n    display: flex; }\n    :host .comment .user-image {\n      margin-right: 1px; }\n      :host .comment .user-image img {\n        width: 18px;\n        height: 18px; }\n    :host .comment .text {\n      font-size: 12.5px; }\n      :host .comment .text .line,\n      :host .comment .text multi-line /deep/ .line {\n        margin-bottom: 1px;\n        white-space: nowrap;\n        overflow: hidden;\n        color: #ff3600;\n        background: white;\n        padding: 0 5px;\n        max-width: 298px;\n        margin-top: 1px;\n        height: 18px;\n        display: flex;\n        align-items: center; }\n      :host .comment .text multi-line /deep/ .multiLines {\n        border-left: 1px solid #ff3600; }\n", ""]);

	// exports


/***/ }),
/* 426 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"comments\">\n\n  <ul>\n    <li *ngFor=\"let comment of commentsQueue.models\"\n        class=\"comment\">\n      <div class=\"user-image\">\n        <img [src]=\"comment.get('user').get('avatar_url').getImageByFormat('tiny')\">\n      </div>\n      <div class=\"text\">\n        <multi-line\n          [text]=\"comment.get('body')\"\n          font=\"300 12px Raleway\"\n          [maxLines]=\"2\"\n          [maxWidth]=\"288\"\n          [paddingLeft]=\"5\"\n          [paddingRight]=\"5\"\n          (lineAmountChanged)=\"updateVisibleLines($event)\"></multi-line>\n      </div>\n    </li>\n  </ul>\n\n</div>\n\n";

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const platform_browser_1 = __webpack_require__(21);
	const forms_1 = __webpack_require__(62);
	const users_routes_1 = __webpack_require__(428);
	let UsersModule = class UsersModule {
	};
	UsersModule = __decorate([
	    core_1.NgModule({
	        imports: [
	            platform_browser_1.BrowserModule,
	            forms_1.FormsModule,
	            users_routes_1.UsersRoutingModule
	        ],
	        declarations: [],
	        exports: []
	    }), 
	    __metadata('design:paramtypes', [])
	], UsersModule);
	exports.UsersModule = UsersModule;


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const router_1 = __webpack_require__(91);
	const routes = [];
	let UsersRoutingModule = class UsersRoutingModule {
	};
	UsersRoutingModule = __decorate([
	    core_1.NgModule({
	        imports: [router_1.RouterModule.forRoot(routes)],
	        exports: [router_1.RouterModule]
	    }), 
	    __metadata('design:paramtypes', [])
	], UsersRoutingModule);
	exports.UsersRoutingModule = UsersRoutingModule;


/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const session_model_1 = __webpack_require__(136);
	const auth_service_1 = __webpack_require__(147);
	const client_detector_service_1 = __webpack_require__(131);
	let NavComponent = class NavComponent {
	    constructor(authService) {
	        this.authService = authService;
	        this.toggleState = 'in';
	        this.imgUrl = 'https://a-v2.sndcdn.com/assets/images/header/cloud@2x-e5fba4.png';
	        this.session = session_model_1.Session.getInstance();
	        this.user = this.session.get('user');
	    }
	    toggle() {
	        this.toggleState = this.toggleState === 'out' ? 'in' : 'out';
	    }
	    connect() {
	        this.authService.connect();
	    }
	    disconnect() {
	        this.authService.disconnect();
	    }
	    setAuthenticated(user) {
	        if (user.get('authenticated')) {
	            user.fetch().then(() => {
	                this.isAuthenticated = true;
	                user.get('likes').fetch();
	            });
	        }
	        else {
	            this.isAuthenticated = false;
	        }
	    }
	    ;
	    ngOnInit() {
	        this.session.get('user').on('change:authenticated', (user) => {
	            this.setAuthenticated(user);
	        });
	        if (this.session.isValid()) {
	            this.setAuthenticated(this.session.get('user'));
	        }
	    }
	    ;
	    showDesktopAppEntry() {
	        let os = client_detector_service_1.ClientDetector.getOs(), client = client_detector_service_1.ClientDetector.getClient();
	        return (client.name !== client_detector_service_1.ClientNames.Electron &&
	            ((os.name === client_detector_service_1.OsNames.MacOs && os.version > 0) || (os.name === client_detector_service_1.OsNames.Windows && os.version >= 7)));
	    }
	};
	NavComponent = __decorate([
	    core_1.Component({
	        selector: 'nav-sidebar',
	        styles: [__webpack_require__(430)],
	        template: __webpack_require__(432)
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _a) || Object])
	], NavComponent);
	exports.NavComponent = NavComponent;
	var _a;


/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

	// css-to-string-loader: transforms styles from css-loader to a string output

	// Get the styles
	var styles = __webpack_require__(431);

	if (typeof styles === 'string') {
	  // Return an existing string
	  module.exports = styles;
	} else {
	  // Call the custom toString method from css-loader module
	  module.exports = styles.toString();
	}

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ":host .column {\n  background: #efefef;\n  height: calc(100vh); }\n\n.sidebar {\n  width: 95px;\n  overflow: hidden;\n  transition: all 0.4s ease; }\n  .sidebar .menu {\n    min-width: 250px;\n    padding-left: 15px; }\n  .sidebar .cloud-player {\n    background: #fcfcfc;\n    padding: 0;\n    text-align: center;\n    margin: 15px 15px 15px 15px;\n    border-radius: 4px;\n    height: 60px; }\n    .sidebar .cloud-player img {\n      width: 58px; }\n  .sidebar .menu a,\n  .sidebar .menu .nav-item,\n  .sidebar /deep/ authenticated-user-playlists a,\n  .sidebar /deep/ authenticated-user-playlists .nav-item {\n    margin: 20px 15px;\n    display: flex;\n    align-items: center;\n    text-align: center;\n    width: 100%;\n    text-decoration: none;\n    cursor: pointer; }\n    .sidebar .menu a img,\n    .sidebar .menu .nav-item img,\n    .sidebar /deep/ authenticated-user-playlists a img,\n    .sidebar /deep/ authenticated-user-playlists .nav-item img {\n      margin: 0 13px 0 0;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%; }\n    .sidebar .menu a i,\n    .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      border: 1px solid;\n      border-radius: 50%;\n      width: 30px;\n      height: 30px;\n      margin-right: 13px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 12px; }\n      .sidebar .menu a i.fa-search,\n      .sidebar .menu .nav-item i.fa-search,\n      .sidebar /deep/ authenticated-user-playlists a i.fa-search,\n      .sidebar /deep/ authenticated-user-playlists .nav-item i.fa-search {\n        font-size: 14px; }\n    .sidebar .menu a .text,\n    .sidebar .menu .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text {\n      display: block; }\n  .sidebar .menu a, .sidebar .menu .nav-item,\n  .sidebar /deep/ authenticated-user-playlists a,\n  .sidebar /deep/ authenticated-user-playlists .nav-item {\n    text-decoration: none; }\n    .sidebar .menu a .text,\n    .sidebar .menu a i, .sidebar .menu .nav-item .text,\n    .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      transition: color 0.6s ease; }\n    .sidebar .menu a i, .sidebar .menu .nav-item i,\n    .sidebar /deep/ authenticated-user-playlists a i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item i {\n      color: #222222;\n      transition: color 0.6s ease; }\n    .sidebar .menu a .text, .sidebar .menu .nav-item .text,\n    .sidebar /deep/ authenticated-user-playlists a .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item .text {\n      color: #cbcbcb; }\n    .sidebar .menu a.disabled .text,\n    .sidebar .menu a.disabled i, .sidebar .menu .nav-item.disabled .text,\n    .sidebar .menu .nav-item.disabled i,\n    .sidebar /deep/ authenticated-user-playlists a.disabled .text,\n    .sidebar /deep/ authenticated-user-playlists a.disabled i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.disabled .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.disabled i {\n      color: #cbcbcb; }\n    .sidebar .menu a:hover .text,\n    .sidebar .menu a:hover i, .sidebar .menu .nav-item:hover .text,\n    .sidebar .menu .nav-item:hover i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .text,\n    .sidebar /deep/ authenticated-user-playlists a:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover i {\n      color: #ff3600; }\n    .sidebar .menu a:hover i, .sidebar .menu .nav-item:hover i,\n    .sidebar /deep/ authenticated-user-playlists a:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover i {\n      border-color: #222222;\n      color: #ff3600; }\n    .sidebar .menu a:hover .private-badge i, .sidebar .menu .nav-item:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .private-badge i {\n      color: #222222; }\n    .sidebar .menu a:hover .private-badge i, .sidebar .menu .nav-item:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item:hover .private-badge i {\n      border-color: #222222 !important;\n      color: #222222 !important; }\n    .sidebar .menu a.is-active .text,\n    .sidebar .menu a.is-active i, .sidebar .menu a.is-active:hover .text,\n    .sidebar .menu a.is-active:hover i, .sidebar .menu .nav-item.is-active .text,\n    .sidebar .menu .nav-item.is-active i, .sidebar .menu .nav-item.is-active:hover .text,\n    .sidebar .menu .nav-item.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .text,\n    .sidebar /deep/ authenticated-user-playlists a.is-active i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .text,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .text,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover i {\n      font-weight: bold; }\n    .sidebar .menu a.is-active i,\n    .sidebar .menu a.is-active .cover, .sidebar .menu a.is-active:hover i,\n    .sidebar .menu a.is-active:hover .cover, .sidebar .menu .nav-item.is-active i,\n    .sidebar .menu .nav-item.is-active .cover, .sidebar .menu .nav-item.is-active:hover i,\n    .sidebar .menu .nav-item.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .cover {\n      color: #ff3600 !important;\n      border-color: #ff3600 !important; }\n    .sidebar .menu a.is-active .cover, .sidebar .menu a.is-active:hover .cover, .sidebar .menu .nav-item.is-active .cover, .sidebar .menu .nav-item.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .cover,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .cover {\n      border: 1px solid; }\n    .sidebar .menu a.is-active .private-badge i, .sidebar .menu a.is-active:hover .private-badge i, .sidebar .menu .nav-item.is-active .private-badge i, .sidebar .menu .nav-item.is-active:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists a.is-active:hover .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active .private-badge i,\n    .sidebar /deep/ authenticated-user-playlists .nav-item.is-active:hover .private-badge i {\n      border-color: #222222 !important;\n      color: #222222 !important; }\n  .sidebar:hover {\n    width: 250px; }\n    .sidebar:hover .menu a .text, .sidebar:hover .menu .nav-item .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item .text {\n      color: #222222; }\n    .sidebar:hover .menu a.disabled .text,\n    .sidebar:hover .menu a.disabled i, .sidebar:hover .menu .nav-item.disabled .text,\n    .sidebar:hover .menu .nav-item.disabled i,\n    .sidebar:hover /deep/ authenticated-user-playlists a.disabled .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a.disabled i,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.disabled .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.disabled i {\n      color: #cbcbcb; }\n    .sidebar:hover .menu a:hover .text,\n    .sidebar:hover .menu a:hover i, .sidebar:hover .menu .nav-item:hover .text,\n    .sidebar:hover .menu .nav-item:hover i,\n    .sidebar:hover /deep/ authenticated-user-playlists a:hover .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a:hover i,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item:hover .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item:hover i {\n      color: #ff3600; }\n    .sidebar:hover .menu a.is-active .text, .sidebar:hover .menu .nav-item.is-active .text,\n    .sidebar:hover /deep/ authenticated-user-playlists a.is-active .text,\n    .sidebar:hover /deep/ authenticated-user-playlists .nav-item.is-active .text {\n      color: #222222 !important; }\n  @media (min-width: 1200px) {\n    .sidebar {\n      width: 250px; }\n      .sidebar .menu a .text,\n      .sidebar .menu a i, .sidebar .menu .nav-item .text,\n      .sidebar .menu .nav-item i,\n      .sidebar /deep/ authenticated-user-playlists a .text,\n      .sidebar /deep/ authenticated-user-playlists a i,\n      .sidebar /deep/ authenticated-user-playlists .nav-item .text,\n      .sidebar /deep/ authenticated-user-playlists .nav-item i {\n        color: #222222; }\n      .sidebar .menu a.disabled .text,\n      .sidebar .menu a.disabled i, .sidebar .menu .nav-item.disabled .text,\n      .sidebar .menu .nav-item.disabled i,\n      .sidebar /deep/ authenticated-user-playlists a.disabled .text,\n      .sidebar /deep/ authenticated-user-playlists a.disabled i,\n      .sidebar /deep/ authenticated-user-playlists .nav-item.disabled .text,\n      .sidebar /deep/ authenticated-user-playlists .nav-item.disabled i {\n        color: #cbcbcb; } }\n  @media (min-width: 1380px) {\n    .sidebar {\n      width: 300px; }\n      .sidebar:hover {\n        width: 300px; } }\n\n@media (max-width: 991px) {\n  :host {\n    width: 100vw;\n    position: fixed;\n    bottom: 0;\n    height: 40px;\n    z-index: 1;\n    box-shadow: 0 0 8px 0 #c8c8c8;\n    z-index: 999; }\n    :host .sidebar,\n    :host /deep/ authenticated-user-playlists {\n      min-width: 100%;\n      padding: 0; }\n      :host .sidebar .menu,\n      :host /deep/ authenticated-user-playlists .menu {\n        min-width: 100%;\n        padding-left: 0; }\n      :host .sidebar .divider,\n      :host .sidebar .cloud-player,\n      :host /deep/ authenticated-user-playlists .divider,\n      :host /deep/ authenticated-user-playlists .cloud-player {\n        display: none; }\n      :host .sidebar .user,\n      :host /deep/ authenticated-user-playlists .user {\n        order: 4; }\n      :host .sidebar nav,\n      :host /deep/ authenticated-user-playlists nav {\n        display: flex;\n        font-size: 13px;\n        margin: 0; }\n        :host .sidebar nav a,\n        :host .sidebar nav .nav-item,\n        :host /deep/ authenticated-user-playlists nav a,\n        :host /deep/ authenticated-user-playlists nav .nav-item {\n          display: block;\n          margin: 0;\n          border-left: 1px solid #dad9d9;\n          padding: 7px; }\n          :host .sidebar nav a.is-active,\n          :host .sidebar nav .nav-item.is-active,\n          :host /deep/ authenticated-user-playlists nav a.is-active,\n          :host /deep/ authenticated-user-playlists nav .nav-item.is-active {\n            background: #dad9d9; }\n            :host .sidebar nav a.is-active i,\n            :host .sidebar nav .nav-item.is-active i,\n            :host /deep/ authenticated-user-playlists nav a.is-active i,\n            :host /deep/ authenticated-user-playlists nav .nav-item.is-active i {\n              color: #ff3600; }\n          :host .sidebar nav a.disabled,\n          :host .sidebar nav .nav-item.disabled,\n          :host /deep/ authenticated-user-playlists nav a.disabled,\n          :host /deep/ authenticated-user-playlists nav .nav-item.disabled {\n            display: none; }\n          :host .sidebar nav a i,\n          :host .sidebar nav .nav-item i,\n          :host /deep/ authenticated-user-playlists nav a i,\n          :host /deep/ authenticated-user-playlists nav .nav-item i {\n            margin: 0 auto;\n            font-size: 20px;\n            padding: 0;\n            border: none;\n            background: transparent; }\n            :host .sidebar nav a i.fa-search,\n            :host .sidebar nav .nav-item i.fa-search,\n            :host /deep/ authenticated-user-playlists nav a i.fa-search,\n            :host /deep/ authenticated-user-playlists nav .nav-item i.fa-search {\n              font-size: 18px; }\n          :host .sidebar nav a img,\n          :host .sidebar nav .nav-item img,\n          :host /deep/ authenticated-user-playlists nav a img,\n          :host /deep/ authenticated-user-playlists nav .nav-item img {\n            width: 27px;\n            height: 27px; }\n          :host .sidebar nav a .text,\n          :host .sidebar nav .nav-item .text,\n          :host /deep/ authenticated-user-playlists nav a .text,\n          :host /deep/ authenticated-user-playlists nav .nav-item .text {\n            display: none; }\n          :host .sidebar nav a.sc-connect,\n          :host .sidebar nav .nav-item.sc-connect,\n          :host /deep/ authenticated-user-playlists nav a.sc-connect,\n          :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect {\n            display: flex; }\n            :host .sidebar nav a.sc-connect i,\n            :host .sidebar nav .nav-item.sc-connect i,\n            :host /deep/ authenticated-user-playlists nav a.sc-connect i,\n            :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect i {\n              margin-right: 5px; }\n            :host .sidebar nav a.sc-connect .text,\n            :host .sidebar nav .nav-item.sc-connect .text,\n            :host /deep/ authenticated-user-playlists nav a.sc-connect .text,\n            :host /deep/ authenticated-user-playlists nav .nav-item.sc-connect .text {\n              display: block;\n              margin-right: auto;\n              color: #222222;\n              font-size: 10px; } }\n", ""]);

	// exports


/***/ }),
/* 432 */
/***/ (function(module, exports) {

	module.exports = "<section class=\"column\">\n\n  <div class=\"sidebar\">\n    <div class=\"cloud-player\">\n      <cloud-player-logo [animate]=\"true\"></cloud-player-logo>\n    </div>\n\n    <div class=\"menu\">\n      <nav>\n        <a routerLink=\"/dashboard\"\n           [routerLinkActive]=\"['is-active']\">\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Search</div>\n        </a>\n\n        <a *ngIf=\"showDesktopAppEntry()\"\n           routerLink=\"/desktop-app\"\n           [routerLinkActive]=\"['is-active']\"\n           class=\"desktop-entry\">\n          <i class=\"fa fa-desktop\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Desktop App</div>\n        </a>\n\n        <div class=\"divider\">\n          <div class=\"title\">Account</div>\n        </div>\n\n        <a *ngIf=\"isAuthenticated\"\n           routerLink=\"/me\"\n           class=\"user\">\n          <img [src]=\"user.get('avatar_url').getLargeSize() || imgUrl\" [alt]=\"user.get('full_name')\" class=\"avatar\">\n          <div class=\"text\">\n            <span>{{user.get('full_name') || user.get('username')}}</span>\n          </div>\n        </a>\n\n        <a *ngIf=\"!isAuthenticated\"\n           (click)=\"connect()\"\n           class=\"sc-connect\">\n          <i class=\"fa fa-soundcloud\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Login with SoundCloud</div>\n        </a>\n\n        <a routerLink=\"me/likes\"\n           [routerLinkActive]=\"['is-active']\" [class.disabled]=\"!isAuthenticated\">\n          <i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Likes</div>\n        </a>\n\n\n        <a *ngIf=\"isAuthenticated\"\n           routerLink=\"me/playlists\"\n           [routerLinkActive]=\"['is-active']\"\n           class=\"visible-xs visible-sm\">\n          <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n          <div class=\"text\">Playlists</div>\n        </a>\n\n        <div class=\"divider\">\n          <div class=\"title\">Playlists</div>\n        </div>\n\n        <authenticated-user-playlists class=\"hidden-xs hidden-sm\" fillHeight></authenticated-user-playlists>\n      </nav>\n    </div>\n\n  </div>\n\n</section>\n";

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const user_analytics_service_1 = __webpack_require__(83);
	const google_analytics_tracking_provider_model_1 = __webpack_require__(434);
	const router_1 = __webpack_require__(91);
	let UserAnalyticsModule = class UserAnalyticsModule {
	    constructor(userAnalyticsService, router, route) {
	        this.userAnalyticsService = userAnalyticsService;
	        this.router = router;
	        this.route = route;
	        userAnalyticsService.addProvider(new google_analytics_tracking_provider_model_1.GoogleAnalyticsTrackingProvider('UA-96117674-1'));
	        userAnalyticsService.setProperty('anonymizeIp', true);
	        this.router.events
	            .filter(event => event instanceof router_1.NavigationEnd)
	            .subscribe(() => {
	            let currentRoute = this.route.root;
	            while (currentRoute.children[0] !== undefined) {
	                currentRoute = currentRoute.children[0];
	            }
	            userAnalyticsService.trackPage(currentRoute.snapshot.routeConfig.path);
	        });
	    }
	};
	UserAnalyticsModule = __decorate([
	    core_1.NgModule({
	        providers: [user_analytics_service_1.UserAnalyticsService]
	    }), 
	    __metadata('design:paramtypes', [(typeof (_a = typeof user_analytics_service_1.UserAnalyticsService !== 'undefined' && user_analytics_service_1.UserAnalyticsService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _c) || Object])
	], UserAnalyticsModule);
	exports.UserAnalyticsModule = UserAnalyticsModule;
	var _a, _b, _c;


/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const core_1 = __webpack_require__(3);
	const tracking_provider_model_1 = __webpack_require__(85);
	const underscore_1 = __webpack_require__(67);
	let GoogleAnalyticsTrackingProvider = class GoogleAnalyticsTrackingProvider extends tracking_provider_model_1.TrackingProviderModel {
	    trackEvent(eventName, eventAction, msg) {
	        window.ga('send', 'event', eventName, eventAction, msg);
	    }
	    trackPage(page) {
	        window.ga('set', 'page', page);
	        window.ga('send', 'pageview');
	    }
	    setUserId(userId) {
	        window.ga('set', 'userId', userId);
	    }
	    setProperty(property, value) {
	        window.ga('set', property, value);
	    }
	    initialize(GoogleAnalyticsTrackingId) {
	        this.set('id', 'GA');
	        if (!GoogleAnalyticsTrackingId || !underscore_1.isString(GoogleAnalyticsTrackingId)) {
	            throw new Error('Please initialize this provider with a valid Google analytics tracking id by passing the id into the constructor!');
	        }
	        /*
	         * This is the code snippet provided by Google Analytics
	         * https://developers.google.com/analytics/devguides/collection/analyticsjs/
	         */
	        (function (i, s, o, g, r, a, m) {
	            i['GoogleAnalyticsObject'] = r;
	            i[r] = i[r] || function () {
	                (i[r].q = i[r].q || []).push(arguments);
	            }, i[r].l = 1 * new Date();
	            a = s.createElement(o),
	                m = s.getElementsByTagName(o)[0];
	            a.async = 1;
	            a.src = g;
	            m.parentNode.insertBefore(a, m);
	        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
	        window.ga('create', GoogleAnalyticsTrackingId, 'auto');
	    }
	};
	GoogleAnalyticsTrackingProvider = __decorate([
	    core_1.Injectable(), 
	    __metadata('design:paramtypes', [])
	], GoogleAnalyticsTrackingProvider);
	exports.GoogleAnalyticsTrackingProvider = GoogleAnalyticsTrackingProvider;


/***/ })
]);