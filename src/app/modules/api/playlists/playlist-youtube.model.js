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
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var youtube_proxy_model_1 = require("../youtube/youtube-proxy.model");
var query_param_decorator_1 = require("../../backbone/decorators/query-param.decorator");
var PlaylistYoutubeModel = /** @class */ (function (_super) {
  __extends(PlaylistYoutubeModel, _super);

  function PlaylistYoutubeModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/playlists';
    _this.part = 'snippet';
    return _this;
  }

  PlaylistYoutubeModel.prototype.parse = function (attributes) {
    if (attributes.items) {
      attributes = attributes.items[0];
    }
    var parsedPlaylist = {
      id: attributes.id
    };
    if (attributes.snippet) {
      parsedPlaylist.title = attributes.snippet.title;
      parsedPlaylist.image = attributes.snippet.thumbnails;
      parsedPlaylist.artist = {
        id: attributes.snippet.channelId,
        title: attributes.snippet.channelTitle
      };
    }
    if (attributes.status) {
      parsedPlaylist.isPublic = attributes.status.privacyStatus === 'public';
    }
    return parsedPlaylist;
  };
  PlaylistYoutubeModel.prototype.initialize = function () {
    var _this = this;
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', function () {
      _this.items.setEndpoint(_this.id);
    });
  };
  __decorate([
    query_param_decorator_1.queryParam()
  ], PlaylistYoutubeModel.prototype, "part", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('provider'),
    default_value_decorator_1.defaultValue('youtube')
  ], PlaylistYoutubeModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('canEdit'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistYoutubeModel.prototype, "canEdit", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('isPublic'),
    default_value_decorator_1.defaultValue(false)
  ], PlaylistYoutubeModel.prototype, "isPublic", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title'),
    default_value_decorator_1.defaultValue('')
  ], PlaylistYoutubeModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('user'),
    nested_decorator_1.nested()
  ], PlaylistYoutubeModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('items'),
    nested_decorator_1.nested()
  ], PlaylistYoutubeModel.prototype, "items", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('image'),
    nested_decorator_1.nested()
  ], PlaylistYoutubeModel.prototype, "image", void 0);
  return PlaylistYoutubeModel;
}(youtube_proxy_model_1.YoutubeProxyModel));
exports.PlaylistYoutubeModel = PlaylistYoutubeModel;
