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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {value: true});
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var cloud_player_model_1 = require("../cloud-player/cloud-player.model");
var TrackCloudplayerModel = /** @class */ (function (_super) {
  __extends(TrackCloudplayerModel, _super);

  function TrackCloudplayerModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/tracks';
    _this.isLikeable = true;
    return _this;
  }

  TrackCloudplayerModel.prototype.toMiniJSON = function () {
    return {};
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('hasDetails'),
    default_value_decorator_1.defaultValue(false)
  ], TrackCloudplayerModel.prototype, "hasDetails", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('provider_id'),
    default_value_decorator_1.defaultValue('cloudplayer')
  ], TrackCloudplayerModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('artist'),
    nested_decorator_1.nested()
  ], TrackCloudplayerModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('image'),
    nested_decorator_1.nested()
  ], TrackCloudplayerModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title')
  ], TrackCloudplayerModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('duration')
  ], TrackCloudplayerModel.prototype, "duration", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('genre')
  ], TrackCloudplayerModel.prototype, "genre", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('createdAt')
  ], TrackCloudplayerModel.prototype, "createdAt", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('likes')
  ], TrackCloudplayerModel.prototype, "likes", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('clicks')
  ], TrackCloudplayerModel.prototype, "clicks", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('aspectRatio'),
    default_value_decorator_1.defaultValue(1)
  ], TrackCloudplayerModel.prototype, "aspectRatio", void 0);
  return TrackCloudplayerModel;
}(cloud_player_model_1.CloudplayerModel));
exports.TrackCloudplayerModel = TrackCloudplayerModel;
