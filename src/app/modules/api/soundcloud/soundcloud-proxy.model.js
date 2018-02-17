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
var SoundcloudProxyModel = /** @class */ (function (_super) {
  __extends(SoundcloudProxyModel, _super);

  function SoundcloudProxyModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SoundcloudProxyModel.prototype.basePath = function () {
    return '/proxy/soundcloud';
  };
  SoundcloudProxyModel.prototype.save = function (attributes, options) {
    if (options === void 0) {
      options = {};
    }
    options.patch = false;
    return _super.prototype.save.call(this, attributes, options);
  };
  return SoundcloudProxyModel;
}(cloud_player_model_1.CloudplayerModel));
exports.SoundcloudProxyModel = SoundcloudProxyModel;
