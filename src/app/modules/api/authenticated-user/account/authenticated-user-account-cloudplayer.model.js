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
var account_cloudplayer_model_1 = require("../../account/account-cloudplayer.model");
var attributes_key_decorator_1 = require("../../../backbone/decorators/attributes-key.decorator");
var default_value_decorator_1 = require("../../../backbone/decorators/default-value.decorator");
var authenticated_user_playlist_cloudplayer_model_1 = require("../playlist/authenticated-user-playlist-cloudplayer.model");
var nested_decorator_1 = require("../../../backbone/decorators/nested.decorator");
var AuthenticatedUserAccountCloudplayerModel = /** @class */ (function (_super) {
  __extends(AuthenticatedUserAccountCloudplayerModel, _super);

  function AuthenticatedUserAccountCloudplayerModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.loginUrl = null;
    _this.endpoint = '/user/me';
    return _this;
  }

  AuthenticatedUserAccountCloudplayerModel.prototype.initialize = function () {
    var _this = this;
    if (this.id) {
      this.playlists.setEndpoint(this.id);
    }
    this.on('change:id', function () {
      _this.playlists.setEndpoint(_this.id);
      //this.favouriteTracks.setEndpoint(this.id);
    });
  };
  AuthenticatedUserAccountCloudplayerModel.prototype.createNewPlaylist = function (title, isPublic) {
    if (isPublic === void 0) {
      isPublic = false;
    }
    var playlist = new authenticated_user_playlist_cloudplayer_model_1.AuthenticatedUserPlaylistCloudplayerModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    playlist.accountId = this.id;
    this.playlists.add(playlist);
    return playlist.save();
  };
  AuthenticatedUserAccountCloudplayerModel.prototype.parse = function (attributes) {
    if (attributes.title === null) {
      delete attributes.title;
      attributes.tmpAccount = true;
    }
    if (!attributes.connected) {
      delete attributes.id;
    }
    return attributes;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('title'),
    default_value_decorator_1.defaultValue('Guest')
  ], AuthenticatedUserAccountCloudplayerModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('tmpAccount'),
    default_value_decorator_1.defaultValue(false)
  ], AuthenticatedUserAccountCloudplayerModel.prototype, "tmpAccount", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('playlists'),
    nested_decorator_1.nested()
  ], AuthenticatedUserAccountCloudplayerModel.prototype, "playlists", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('favourite'),
    nested_decorator_1.nested()
  ], AuthenticatedUserAccountCloudplayerModel.prototype, "favouriteTracks", void 0);
  return AuthenticatedUserAccountCloudplayerModel;
}(account_cloudplayer_model_1.AccountCloudplayerModel));
exports.AuthenticatedUserAccountCloudplayerModel = AuthenticatedUserAccountCloudplayerModel;
