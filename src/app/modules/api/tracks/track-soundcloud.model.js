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
var globals_1 = require("../../../../globals");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var soundcloud_proxy_model_1 = require("../soundcloud/soundcloud-proxy.model");
var TrackSoundcloudModel = /** @class */ (function (_super) {
  __extends(TrackSoundcloudModel, _super);

  function TrackSoundcloudModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/tracks';
    _this.isLikeable = true;
    return _this;
  }

  TrackSoundcloudModel.prototype.getResourceUrl = function () {
    if (this.streamUrl) {
      return this.streamUrl + "?client_id=" + globals_1.Globals.soundcloudClientId;
    }
    else {
      return "https://api.soundcloud.com/tracks/" + this.id + "/stream?client_id=" + globals_1.Globals.soundcloudClientId;
    }
  };
  TrackSoundcloudModel.prototype.parse = function (attrs) {
    attrs = _super.prototype.parse.call(this, attrs);
    attrs.likes = attrs.likes_count || attrs.favoritings_count;
    if (attrs.strea_url) {
      attrs.hasDetails = true;
    }
    return attrs;
  };
  TrackSoundcloudModel.prototype.toMiniJSON = function () {
    var obj = {};
    obj.provider = this.provider;
    obj.id = this.id;
    obj.title = this.title;
    obj.duration = this.duration;
    obj.stream_url = this.streamUrl;
    obj.artwork_url = this.image.imageUrl;
    obj.user = this.artist.toJSON();
    return obj;
  };
  TrackSoundcloudModel.prototype.initialize = function () {
    var _this = this;
    if (this.id) {
      this.comments.setTrackId(this.id);
    }
    this.on('change:id', function () {
      _this.comments.setTrackId(_this.id);
    });
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('hasDetails'),
    default_value_decorator_1.defaultValue(false)
  ], TrackSoundcloudModel.prototype, "hasDetails", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('provider_id'),
    default_value_decorator_1.defaultValue('soundcloud')
  ], TrackSoundcloudModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('user'),
    nested_decorator_1.nested()
  ], TrackSoundcloudModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('artwork_url'),
    nested_decorator_1.nested()
  ], TrackSoundcloudModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('comments'),
    nested_decorator_1.nested()
  ], TrackSoundcloudModel.prototype, "comments", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title')
  ], TrackSoundcloudModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('duration')
  ], TrackSoundcloudModel.prototype, "duration", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('genre')
  ], TrackSoundcloudModel.prototype, "genre", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('created_at')
  ], TrackSoundcloudModel.prototype, "createdAt", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('likes')
  ], TrackSoundcloudModel.prototype, "likes", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('playback_count')
  ], TrackSoundcloudModel.prototype, "clicks", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('stream_url')
  ], TrackSoundcloudModel.prototype, "streamUrl", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('aspectRatio'),
    default_value_decorator_1.defaultValue(1)
  ], TrackSoundcloudModel.prototype, "aspectRatio", void 0);
  return TrackSoundcloudModel;
}(soundcloud_proxy_model_1.SoundcloudProxyModel));
exports.TrackSoundcloudModel = TrackSoundcloudModel;
