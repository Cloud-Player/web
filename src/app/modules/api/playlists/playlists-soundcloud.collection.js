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
var soundcloud_proxy_collection_1 = require("../soundcloud/soundcloud-proxy.collection");
var playlist_soundcloud_model_1 = require("./playlist-soundcloud.model");
var PlaylistsSoundcloudCollection = /** @class */ (function (_super) {
  __extends(PlaylistsSoundcloudCollection, _super);

  function PlaylistsSoundcloudCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlists';
    _this.model = playlist_soundcloud_model_1.PlaylistSoundcloudModel;
    return _this;
  }

  return PlaylistsSoundcloudCollection;
}(soundcloud_proxy_collection_1.SoundcloudProxyCollection));
exports.PlaylistsSoundcloudCollection = PlaylistsSoundcloudCollection;
