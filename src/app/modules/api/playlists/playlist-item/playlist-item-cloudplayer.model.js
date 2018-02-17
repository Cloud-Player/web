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
var cloud_player_model_1 = require("../../cloud-player/cloud-player.model");
var attributes_key_decorator_1 = require("../../../backbone/decorators/attributes-key.decorator");
var dynamic_instance_decorator_1 = require("../../../backbone/decorators/dynamic-instance.decorator");
var track_soundcloud_model_1 = require("../../tracks/track-soundcloud.model");
var track_youtube_model_1 = require("../../tracks/track-youtube.model");
var PlaylistItemCloudplayerModel = /** @class */ (function (_super) {
  __extends(PlaylistItemCloudplayerModel, _super);

  function PlaylistItemCloudplayerModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  PlaylistItemCloudplayerModel.prototype.parse = function (attributes) {
    var parsedTrack = {
      id: attributes.track_id,
      provider_id: attributes.track_provider_id
    };
    delete attributes.track_id;
    delete attributes.track_provider_id;
    attributes.track = parsedTrack;
    return attributes;
  };
  PlaylistItemCloudplayerModel.prototype.compose = function () {
    return {
      track_provider_id: this.track.provider,
      track_id: this.track.id,
      rank: this.collection.length
    };
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('track'),
    dynamic_instance_decorator_1.dynamicInstance({
      identifierKey: 'provider_id',
      identifierKeyValueMap: {
        soundcloud: track_soundcloud_model_1.TrackSoundcloudModel,
        youtube: track_youtube_model_1.TrackYoutubeModel
      }
    })
  ], PlaylistItemCloudplayerModel.prototype, "track", void 0);
  return PlaylistItemCloudplayerModel;
}(cloud_player_model_1.CloudplayerModel));
exports.PlaylistItemCloudplayerModel = PlaylistItemCloudplayerModel;
