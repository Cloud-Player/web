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
var favourite_track_item_cloudplayer_model_1 = require("./favourite-track-item-cloudplayer.model");
var playlist_items_cloudplayer_collection_1 = require("../../playlists/playlist-item/playlist-items-cloudplayer.collection");
var FavouriteTrackItemsCloudplayerCollection = /** @class */ (function (_super) {
  __extends(FavouriteTrackItemsCloudplayerCollection, _super);

  function FavouriteTrackItemsCloudplayerCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/favourite/cloudplayer/mine/item';
    _this.model = favourite_track_item_cloudplayer_model_1.FavouriteTrackItemCloudplayerModel;
    return _this;
  }

  FavouriteTrackItemsCloudplayerCollection.prototype.setEndpoint = function () {
  };
  return FavouriteTrackItemsCloudplayerCollection;
}(playlist_items_cloudplayer_collection_1.PlaylistItemsCloudplayerCollection));
exports.FavouriteTrackItemsCloudplayerCollection = FavouriteTrackItemsCloudplayerCollection;
