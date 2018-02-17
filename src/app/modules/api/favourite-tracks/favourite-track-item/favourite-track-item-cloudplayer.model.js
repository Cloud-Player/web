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
var playlist_item_cloudplayer_model_1 = require("../../playlists/playlist-item/playlist-item-cloudplayer.model");
var FavouriteTrackItemCloudplayerModel = /** @class */ (function (_super) {
  __extends(FavouriteTrackItemCloudplayerModel, _super);

  function FavouriteTrackItemCloudplayerModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FavouriteTrackItemCloudplayerModel.prototype.compose = function () {
    return {
      track_provider_id: this.track.provider,
      track_id: this.track.id
    };
  };
  return FavouriteTrackItemCloudplayerModel;
}(playlist_item_cloudplayer_model_1.PlaylistItemCloudplayerModel));
exports.FavouriteTrackItemCloudplayerModel = FavouriteTrackItemCloudplayerModel;
