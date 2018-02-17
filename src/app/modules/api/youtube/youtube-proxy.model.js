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
var cloud_player_model_1 = require("../cloud-player/cloud-player.model");
var YoutubeProxyModel = /** @class */ (function (_super) {
  __extends(YoutubeProxyModel, _super);

  function YoutubeProxyModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.url = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var id = _this.get(_this.idAttribute);
      _this.set(_this.idAttribute, null, {silent: true});
      var superCall = cloud_player_model_1.CloudplayerModel.prototype.url.apply(_this, args);
      _this.set(_this.idAttribute, id, {silent: true});
      return superCall;
    };
    return _this;
  }

  YoutubeProxyModel.prototype.basePath = function () {
    return '/proxy/youtube';
  };
  YoutubeProxyModel.prototype.sync = function (method, model, options) {
    if (options === void 0) {
      options = {};
    }
    var id = model.get(model.idAttribute);
    model.queryParams.id = id;
    var superCall = _super.prototype.sync.call(this, method, model, options);
    delete model.queryParams.id;
    return superCall;
  };
  YoutubeProxyModel.prototype.save = function (attributes, options) {
    if (options === void 0) {
      options = {};
    }
    options.patch = false;
    return _super.prototype.save.call(this, attributes, options);
  };
  return YoutubeProxyModel;
}(cloud_player_model_1.CloudplayerModel));
exports.YoutubeProxyModel = YoutubeProxyModel;
