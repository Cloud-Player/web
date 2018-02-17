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
var playlist_item_cloudplayer_model_1 = require("./playlist-item-cloudplayer.model");
var cloud_player_collection_1 = require("../../cloud-player/cloud-player.collection");
var playlist_items_soundcloud_collection_1 = require("./playlist-items-soundcloud.collection");
var playlist_items_youtube_collection_1 = require("./playlist-items-youtube.collection");
var underscore_1 = require("underscore");
var PlaylistItemsCloudplayerCollection = /** @class */ (function (_super) {
  __extends(PlaylistItemsCloudplayerCollection, _super);

  function PlaylistItemsCloudplayerCollection() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    _this.model = playlist_item_cloudplayer_model_1.PlaylistItemCloudplayerModel;
    var debouncedFetchDetails = underscore_1.debounce(_this.fetchDetails.bind(_this), 100);
    _this.on('update reset add', debouncedFetchDetails, _this);
    return _this;
  }

  PlaylistItemsCloudplayerCollection.prototype.fetchDetails = function () {
    var url = this.hostName() + "/proxy/youtube/videos";
    var youtubeTrackIds = [];
    var soundcloudTrackIds = [];
    this.pluck('track').forEach(function (track) {
      if (!track.hasDetails) {
        switch (track.provider) {
          case 'youtube':
            youtubeTrackIds.push(track.id);
            break;
          case 'soundcloud':
            soundcloudTrackIds.push(track.id);
            break;
        }
      }
    });
    playlist_items_soundcloud_collection_1.PlaylistItemsSoundcloudCollection.prototype.getTrackDetails.call(this, soundcloudTrackIds);
    playlist_items_youtube_collection_1.PlaylistItemsYoutubeCollection.prototype.getTrackDetails.call(this, youtubeTrackIds);
  };
  PlaylistItemsCloudplayerCollection.prototype.setEndpoint = function (playlistId) {
    this.endpoint = "/playlist/cloudplayer/" + playlistId + "/item";
  };
  return PlaylistItemsCloudplayerCollection;
}(cloud_player_collection_1.CloudplayerCollection));
exports.PlaylistItemsCloudplayerCollection = PlaylistItemsCloudplayerCollection;
