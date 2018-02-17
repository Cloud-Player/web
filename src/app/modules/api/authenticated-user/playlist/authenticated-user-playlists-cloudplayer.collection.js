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
var authenticated_user_playlist_cloudplayer_model_1 = require("./authenticated-user-playlist-cloudplayer.model");
var playlists_cloudplayer_collection_1 = require("../../playlists/playlists-cloudplayer.collection");
var AuthenticatedUserPlaylistsCloudplayerCollection = /** @class */ (function (_super) {
  __extends(AuthenticatedUserPlaylistsCloudplayerCollection, _super);

  function AuthenticatedUserPlaylistsCloudplayerCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = authenticated_user_playlist_cloudplayer_model_1.AuthenticatedUserPlaylistCloudplayerModel;
    return _this;
  }

  AuthenticatedUserPlaylistsCloudplayerCollection.prototype.setEndpoint = function (id) {
    this.queryParams['account_id'] = id;
    this.endpoint = "/playlist/cloudplayer";
  };
  return AuthenticatedUserPlaylistsCloudplayerCollection;
}(playlists_cloudplayer_collection_1.PlaylistsCloudplayerCollection));
exports.AuthenticatedUserPlaylistsCloudplayerCollection = AuthenticatedUserPlaylistsCloudplayerCollection;
