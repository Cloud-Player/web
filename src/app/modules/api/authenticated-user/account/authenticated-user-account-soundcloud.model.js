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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {value: true});
var account_soundcloud_model_1 = require("../../account/account-soundcloud.model");
var nested_decorator_1 = require("../../../backbone/decorators/nested.decorator");
var attributes_key_decorator_1 = require("../../../backbone/decorators/attributes-key.decorator");
var authenticated_user_playlist_cloudplayer_model_1 = require("../playlist/authenticated-user-playlist-cloudplayer.model");
var AuthenticatedUserAccountSoundcloudModel = /** @class */ (function (_super) {
  __extends(AuthenticatedUserAccountSoundcloudModel, _super);

  function AuthenticatedUserAccountSoundcloudModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.loginUrl = _this.hostName() + "/soundcloud";
    return _this;
  }

  AuthenticatedUserAccountSoundcloudModel.prototype.createNewPlaylist = function (title, isPublic) {
    if (isPublic === void 0) {
      isPublic = false;
    }
    var playlist = new authenticated_user_playlist_cloudplayer_model_1.AuthenticatedUserPlaylistCloudplayerModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    this.playlists.add(playlist);
    return playlist.save();
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('playlists'),
    nested_decorator_1.nested()
  ], AuthenticatedUserAccountSoundcloudModel.prototype, "playlists", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('favouriteTracks'),
    nested_decorator_1.nested()
  ], AuthenticatedUserAccountSoundcloudModel.prototype, "favouriteTracks", void 0);
  return AuthenticatedUserAccountSoundcloudModel;
}(account_soundcloud_model_1.AccountSoundcloudModel));
exports.AuthenticatedUserAccountSoundcloudModel = AuthenticatedUserAccountSoundcloudModel;
