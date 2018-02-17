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
var playlist_youtube_model_1 = require("../../playlists/playlist-youtube.model");
var nested_decorator_1 = require("../../../backbone/decorators/nested.decorator");
var attributes_key_decorator_1 = require("../../../backbone/decorators/attributes-key.decorator");
var default_value_decorator_1 = require("../../../backbone/decorators/default-value.decorator");
var AuthenticatedUserPlaylistYoutubeModel = /** @class */ (function (_super) {
  __extends(AuthenticatedUserPlaylistYoutubeModel, _super);

  function AuthenticatedUserPlaylistYoutubeModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlists';
    return _this;
  }

  AuthenticatedUserPlaylistYoutubeModel.prototype.compose = function (attrs) {
    return {
      snippet: {
        title: attrs.title
      }
    };
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('canEdit'),
    default_value_decorator_1.defaultValue(true)
  ], AuthenticatedUserPlaylistYoutubeModel.prototype, "canEdit", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('items'),
    nested_decorator_1.nested()
  ], AuthenticatedUserPlaylistYoutubeModel.prototype, "items", void 0);
  return AuthenticatedUserPlaylistYoutubeModel;
}(playlist_youtube_model_1.PlaylistYoutubeModel));
exports.AuthenticatedUserPlaylistYoutubeModel = AuthenticatedUserPlaylistYoutubeModel;
