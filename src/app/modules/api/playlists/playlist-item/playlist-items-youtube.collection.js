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
var tracks_youtube_collection_1 = require("../../tracks/tracks-youtube.collection");
var playlist_item_youtube_model_1 = require("./playlist-item-youtube.model");
var query_param_decorator_1 = require("../../../backbone/decorators/query-param.decorator");
var youtube_proxy_collection_1 = require("../../youtube/youtube-proxy.collection");
var underscore_1 = require("underscore");
var PlaylistItemsYoutubeCollection = /** @class */ (function (_super) {
  __extends(PlaylistItemsYoutubeCollection, _super);

  function PlaylistItemsYoutubeCollection() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    _this.model = playlist_item_youtube_model_1.PlaylistItemYoutubeModel;
    _this.part = 'snippet';
    _this.maxResults = 50;
    var debouncedFetchDetails = underscore_1.debounce(_this.fetchTrackDetails.bind(_this), 100);
    _this.on('update reset add', debouncedFetchDetails, _this);
    return _this;
  }

  PlaylistItemsYoutubeCollection.prototype.setEndpoint = function (playlistId) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = "/playlistItems";
  };
  PlaylistItemsYoutubeCollection.prototype.fetchTrackDetails = function () {
    var trackIds = [];
    this.pluck('track').forEach(function (track) {
      trackIds.push(track.id);
    });
    return this.getTrackDetails(trackIds);
  };
  PlaylistItemsYoutubeCollection.prototype.getTrackDetails = function (trackIds) {
    var _this = this;
    return tracks_youtube_collection_1.TracksYoutubeCollection.getTrackDetails(trackIds).then(function (rsp) {
      rsp.items.forEach(function (rspItem) {
        var playlistItem = _this.find(function (item) {
          return item.track.id === rspItem.id;
        });
        if (playlistItem) {
          playlistItem.track.set(playlistItem.track.parse(rspItem));
        }
      });
      return _this;
    });
  };
  __decorate([
    query_param_decorator_1.queryParam()
  ], PlaylistItemsYoutubeCollection.prototype, "part", void 0);
  __decorate([
    query_param_decorator_1.queryParam()
  ], PlaylistItemsYoutubeCollection.prototype, "maxResults", void 0);
  return PlaylistItemsYoutubeCollection;
}(youtube_proxy_collection_1.YoutubeProxyCollection));
exports.PlaylistItemsYoutubeCollection = PlaylistItemsYoutubeCollection;
