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
var playlist_item_soundcloud_model_1 = require("./playlist-item-soundcloud.model");
var tracks_soundcloud_collection_1 = require("../../tracks/tracks-soundcloud.collection");
var soundcloud_proxy_collection_1 = require("../../soundcloud/soundcloud-proxy.collection");
var PlaylistItemsSoundcloudCollection = /** @class */ (function (_super) {
  __extends(PlaylistItemsSoundcloudCollection, _super);

  function PlaylistItemsSoundcloudCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = playlist_item_soundcloud_model_1.PlaylistItemSoundcloudModel;
    return _this;
  }

  PlaylistItemsSoundcloudCollection.prototype.fetchTrackDetails = function () {
    var trackIds = [];
    this.pluck('track').forEach(function (track) {
      trackIds.push(track.id);
    });
    return this.getTrackDetails(trackIds);
  };
  PlaylistItemsSoundcloudCollection.prototype.create = function (item) {
    this.add(item);
    this.triggerSave(item);
    return item;
  };
  PlaylistItemsSoundcloudCollection.prototype.triggerSave = function (track) {
    this.trigger('save', track, this);
  };
  PlaylistItemsSoundcloudCollection.prototype.setEndpoint = function (playlistId) {
    this.endpoint = "/playlists/" + playlistId;
  };
  PlaylistItemsSoundcloudCollection.prototype.getTrackDetails = function (trackIds) {
    var _this = this;
    return tracks_soundcloud_collection_1.TracksSoundcloudCollection.getTrackDetails(trackIds).then(function (rsp) {
      rsp.forEach(function (rspItem) {
        var playlistItem = _this.find(function (item) {
          return item.track.id.toString() === rspItem.id.toString();
        });
        if (playlistItem) {
          playlistItem.track.hasDetails = true;
          playlistItem.track.set(playlistItem.track.parse(rspItem));
        }
      });
      return _this;
    });
  };
  return PlaylistItemsSoundcloudCollection;
}(soundcloud_proxy_collection_1.SoundcloudProxyCollection));
exports.PlaylistItemsSoundcloudCollection = PlaylistItemsSoundcloudCollection;
