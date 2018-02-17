"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function (d, b) {
      d.__proto__ = b;
    }) ||
    function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", {value: true});
var base_model_1 = require("../../backbone/models/base.model");
var request_util_1 = require("../../backbone/utils/request.util");
var underscore_1 = require("underscore");
var CloudplayerModel = /** @class */ (function (_super) {
  __extends(CloudplayerModel, _super);

  function CloudplayerModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  CloudplayerModel.prototype.hostName = function () {
    return 'https://api.cloud-player.io';
  };
  CloudplayerModel.prototype.request = function (url, method, options) {
    if (options === void 0) {
      options = {};
    }
    options.withCredentials = true;
    return request_util_1.request(url, method, options, this);
  };
  CloudplayerModel.prototype.sync = function (method, model, options) {
    if (options === void 0) {
      options = {};
    }
    options.withCredentials = true;
    return _super.prototype.sync.call(this, method, model, options);
  };
  CloudplayerModel.prototype.parse = function (rsp) {
    return rsp.data || rsp;
  };
  CloudplayerModel.prototype.save = function (attributes, options) {
    if (options === void 0) {
      options = {};
    }
    options.patch = underscore_1.isUndefined(options.patch) ? true : options.patch;
    return _super.prototype.save.call(this, attributes, options);
  };
  return CloudplayerModel;
}(base_model_1.BaseModel));
exports.CloudplayerModel = CloudplayerModel;
