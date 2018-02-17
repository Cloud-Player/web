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
var playlist_youtube_model_1 = require("./playlist-youtube.model");
var youtube_proxy_collection_1 = require("../youtube/youtube-proxy.collection");
var PlaylistsYoutubeCollection = /** @class */ (function (_super) {
  __extends(PlaylistsYoutubeCollection, _super);

  function PlaylistsYoutubeCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlists';
    _this.model = playlist_youtube_model_1.PlaylistYoutubeModel;
    _this.queryParams = {
      part: 'snippet, status'
    };
    return _this;
  }

  return PlaylistsYoutubeCollection;
}(youtube_proxy_collection_1.YoutubeProxyCollection));
exports.PlaylistsYoutubeCollection = PlaylistsYoutubeCollection;
