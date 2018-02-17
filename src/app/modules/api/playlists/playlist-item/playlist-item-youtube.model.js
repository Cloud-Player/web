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
var attributes_key_decorator_1 = require("../../../backbone/decorators/attributes-key.decorator");
var nested_decorator_1 = require("../../../backbone/decorators/nested.decorator");
var youtube_proxy_model_1 = require("../../youtube/youtube-proxy.model");
var PlaylistItemYoutubeModel = /** @class */ (function (_super) {
  __extends(PlaylistItemYoutubeModel, _super);

  function PlaylistItemYoutubeModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  PlaylistItemYoutubeModel.prototype.setEndpoint = function (playlistId) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = "/playlistItems";
  };
  PlaylistItemYoutubeModel.prototype.parse = function (attributes) {
    var parsedPlaylistItem = {
      id: attributes.id
    };
    if (attributes.snippet) {
      parsedPlaylistItem.title = attributes.snippet.title;
      if (attributes.snippet.resourceId) {
        parsedPlaylistItem.track = {
          id: attributes.snippet.resourceId.videoId,
          title: attributes.snippet.title
        };
      }
    }
    return parsedPlaylistItem;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('track'),
    nested_decorator_1.nested()
  ], PlaylistItemYoutubeModel.prototype, "track", void 0);
  return PlaylistItemYoutubeModel;
}(youtube_proxy_model_1.YoutubeProxyModel));
exports.PlaylistItemYoutubeModel = PlaylistItemYoutubeModel;
