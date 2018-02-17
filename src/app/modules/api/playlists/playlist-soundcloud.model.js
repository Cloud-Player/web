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
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var soundcloud_proxy_model_1 = require("../soundcloud/soundcloud-proxy.model");
var PlaylistSoundcloudModel = /** @class */ (function (_super) {
  __extends(PlaylistSoundcloudModel, _super);

  function PlaylistSoundcloudModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlists';
    return _this;
  }

  PlaylistSoundcloudModel.prototype.parse = function (attrs) {
    attrs.isPublic = (attrs.sharing === 'public');
    delete attrs.sharing;
    if (!attrs.artwork_url && attrs.tracks.length > 0) {
      attrs.artwork_url = attrs.tracks[0].artwork_url;
    }
    if (attrs.tracks) {
      var parsedPlaylistItems_1 = [];
      attrs.tracks.forEach(function (track) {
        parsedPlaylistItems_1.push({
          id: track.id,
          track: track
        });
      });
      delete attrs.tracks;
      attrs.items = parsedPlaylistItems_1;
    }
    return attrs;
  };
  PlaylistSoundcloudModel.prototype.compose = function (attrs) {
    return {
      playlist: {
        title: attrs.title,
        sharing: attrs.isPublic ? 'public' : 'private',
        tracks: attrs.items
      }
    };
  };
  PlaylistSoundcloudModel.prototype.initialize = function () {
    var _this = this;
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', function () {
      _this.items.setEndpoint(_this.id);
    });
    this.items.on('save', function () {
      _this.save();
    });
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('provider'),
    default_value_decorator_1.defaultValue('soundcloud')
  ], PlaylistSoundcloudModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('canEdit'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistSoundcloudModel.prototype, "canEdit", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('isPublic'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistSoundcloudModel.prototype, "isPublic", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title'),
    default_value_decorator_1.defaultValue('')
  ], PlaylistSoundcloudModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('user'),
    nested_decorator_1.nested()
  ], PlaylistSoundcloudModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('items'),
    nested_decorator_1.nested()
  ], PlaylistSoundcloudModel.prototype, "items", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('artwork_url'),
    nested_decorator_1.nested()
  ], PlaylistSoundcloudModel.prototype, "image", void 0);
  return PlaylistSoundcloudModel;
}(soundcloud_proxy_model_1.SoundcloudProxyModel));
exports.PlaylistSoundcloudModel = PlaylistSoundcloudModel;
