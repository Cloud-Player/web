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
var authenticated_user_playlist_soundcloud_model_1 = require("./authenticated-user-playlist-soundcloud.model");
var playlists_soundcloud_collection_1 = require("../../playlists/playlists-soundcloud.collection");
var AuthenticatedUserPlaylistsSoundcloudCollection = /** @class */ (function (_super) {
  __extends(AuthenticatedUserPlaylistsSoundcloudCollection, _super);

  function AuthenticatedUserPlaylistsSoundcloudCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/me/playlists';
    _this.model = authenticated_user_playlist_soundcloud_model_1.AuthenticatedUserPlaylistSoundcloudModel;
    return _this;
  }

  return AuthenticatedUserPlaylistsSoundcloudCollection;
}(playlists_soundcloud_collection_1.PlaylistsSoundcloudCollection));
exports.AuthenticatedUserPlaylistsSoundcloudCollection = AuthenticatedUserPlaylistsSoundcloudCollection;
