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
var base_collection_1 = require("../../backbone/collections/base.collection");
var request_util_1 = require("../../backbone/utils/request.util");
var cloud_player_model_1 = require("./cloud-player.model");
var CloudplayerCollection = /** @class */ (function (_super) {
  __extends(CloudplayerCollection, _super);

  function CloudplayerCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = cloud_player_model_1.CloudplayerModel;
    return _this;
  }

  CloudplayerCollection.prototype.hostName = function () {
    return 'https://api.cloud-player.io';
  };
  CloudplayerCollection.prototype.request = function (url, method, options) {
    if (options === void 0) {
      options = {};
    }
    options.withCredentials = true;
    return request_util_1.request(url, method, options, this);
  };
  CloudplayerCollection.prototype.sync = function (method, model, options) {
    if (options === void 0) {
      options = {};
    }
    options.withCredentials = true;
    return _super.prototype.sync.call(this, method, model, options);
  };
  return CloudplayerCollection;
}(base_collection_1.BaseCollection));
exports.CloudplayerCollection = CloudplayerCollection;
