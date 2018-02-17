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
var favourite_track_item_youtube_model_1 = require("./favourite-track-item-youtube.model");
var playlist_items_youtube_collection_1 = require("../../playlists/playlist-item/playlist-items-youtube.collection");
var query_param_decorator_1 = require("../../../backbone/decorators/query-param.decorator");
var FavouriteTrackItemsYoutubeCollection = /** @class */ (function (_super) {
  __extends(FavouriteTrackItemsYoutubeCollection, _super);

  function FavouriteTrackItemsYoutubeCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.myRating = 'like';
    _this.maxResults = 50;
    _this.part = 'snippet';
    _this.endpoint = '/videos';
    _this.model = favourite_track_item_youtube_model_1.FavouriteTrackItemYoutubeModel;
    return _this;
  }

  __decorate([
    query_param_decorator_1.queryParam()
  ], FavouriteTrackItemsYoutubeCollection.prototype, "myRating", void 0);
  __decorate([
    query_param_decorator_1.queryParam()
  ], FavouriteTrackItemsYoutubeCollection.prototype, "maxResults", void 0);
  __decorate([
    query_param_decorator_1.queryParam()
  ], FavouriteTrackItemsYoutubeCollection.prototype, "part", void 0);
  return FavouriteTrackItemsYoutubeCollection;
}(playlist_items_youtube_collection_1.PlaylistItemsYoutubeCollection));
exports.FavouriteTrackItemsYoutubeCollection = FavouriteTrackItemsYoutubeCollection;
