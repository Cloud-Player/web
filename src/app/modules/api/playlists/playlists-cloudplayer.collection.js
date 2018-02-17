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
var playlist_cloudplayer_model_1 = require("./playlist-cloudplayer.model");
var cloud_player_collection_1 = require("../cloud-player/cloud-player.collection");
var PlaylistsCloudplayerCollection = /** @class */ (function (_super) {
  __extends(PlaylistsCloudplayerCollection, _super);

  function PlaylistsCloudplayerCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlist/cloudplayer';
    _this.model = playlist_cloudplayer_model_1.PlaylistCloudplayerModel;
    return _this;
  }

  return PlaylistsCloudplayerCollection;
}(cloud_player_collection_1.CloudplayerCollection));
exports.PlaylistsCloudplayerCollection = PlaylistsCloudplayerCollection;
