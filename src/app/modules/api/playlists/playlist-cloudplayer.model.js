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
var cloud_player_model_1 = require("../cloud-player/cloud-player.model");
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var PlaylistCloudplayerModel = /** @class */ (function (_super) {
  __extends(PlaylistCloudplayerModel, _super);

  function PlaylistCloudplayerModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlist/cloudplayer';
    return _this;
  }

  PlaylistCloudplayerModel.prototype.parse = function (attributes) {
    delete attributes.items;
    return attributes;
  };
  PlaylistCloudplayerModel.prototype.initialize = function () {
    var _this = this;
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', function () {
      _this.items.setEndpoint(_this.id);
    });
    this.items.once('add', function (item) {
      if (!_this.image.getSmallSizeUrl()) {
        if (item.track.image.getSmallSizeUrl()) {
          _this.image.small = item.track.image.getSmallSizeUrl();
        }
        else {
          item.track.image.on('change', function () {
            _this.image.small = item.track.image.getSmallSizeUrl();
          });
        }
      }
    });
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('provider'),
    default_value_decorator_1.defaultValue('cloudplayer')
  ], PlaylistCloudplayerModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('canEdit'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistCloudplayerModel.prototype, "canEdit", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('isPublic'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistCloudplayerModel.prototype, "isPublic", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title'),
    default_value_decorator_1.defaultValue('')
  ], PlaylistCloudplayerModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('user'),
    nested_decorator_1.nested()
  ], PlaylistCloudplayerModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('image'),
    nested_decorator_1.nested()
  ], PlaylistCloudplayerModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('items'),
    nested_decorator_1.nested()
  ], PlaylistCloudplayerModel.prototype, "items", void 0);
  return PlaylistCloudplayerModel;
}(cloud_player_model_1.CloudplayerModel));
exports.PlaylistCloudplayerModel = PlaylistCloudplayerModel;
