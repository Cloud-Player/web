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
var playlist_item_soundcloud_model_1 = require("../../playlists/playlist-item/playlist-item-soundcloud.model");
var soundcloud_proxy_model_1 = require("../../soundcloud/soundcloud-proxy.model");
var FavouriteTrackItemSoundcloudModel = /** @class */ (function (_super) {
  __extends(FavouriteTrackItemSoundcloudModel, _super);

  function FavouriteTrackItemSoundcloudModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FavouriteTrackItemSoundcloudModel.prototype.destroy = function () {
    return soundcloud_proxy_model_1.SoundcloudProxyModel.prototype.destroy.apply(this, arguments);
  };
  FavouriteTrackItemSoundcloudModel.prototype.save = function () {
    return soundcloud_proxy_model_1.SoundcloudProxyModel.prototype.save.apply(this, arguments);
  };
  return FavouriteTrackItemSoundcloudModel;
}(playlist_item_soundcloud_model_1.PlaylistItemSoundcloudModel));
exports.FavouriteTrackItemSoundcloudModel = FavouriteTrackItemSoundcloudModel;
