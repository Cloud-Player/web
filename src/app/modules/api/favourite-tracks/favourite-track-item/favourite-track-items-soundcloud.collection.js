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
var playlist_items_soundcloud_collection_1 = require("../../playlists/playlist-item/playlist-items-soundcloud.collection");
var favourite_track_item_soundcloud_model_1 = require("./favourite-track-item-soundcloud.model");
var soundcloud_proxy_collection_1 = require("../../soundcloud/soundcloud-proxy.collection");
var FavouriteTrackItemsSoundcloudCollection = /** @class */ (function (_super) {
  __extends(FavouriteTrackItemsSoundcloudCollection, _super);

  function FavouriteTrackItemsSoundcloudCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/users/me/favorites';
    _this.model = favourite_track_item_soundcloud_model_1.FavouriteTrackItemSoundcloudModel;
    return _this;
  }

  FavouriteTrackItemsSoundcloudCollection.prototype.setEndpoint = function (playlistId) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = "/playlistItems";
  };
  FavouriteTrackItemsSoundcloudCollection.prototype.create = function () {
    return soundcloud_proxy_collection_1.SoundcloudProxyCollection.prototype.create.apply(this, arguments);
  };
  return FavouriteTrackItemsSoundcloudCollection;
}(playlist_items_soundcloud_collection_1.PlaylistItemsSoundcloudCollection));
exports.FavouriteTrackItemsSoundcloudCollection = FavouriteTrackItemsSoundcloudCollection;
