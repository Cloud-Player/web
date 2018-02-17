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
var track_youtube_model_1 = require("./track-youtube.model");
var youtube_proxy_collection_1 = require("../youtube/youtube-proxy.collection");
var underscore_1 = require("underscore");
var TracksYoutubeCollection = /** @class */ (function (_super) {
  __extends(TracksYoutubeCollection, _super);

  function TracksYoutubeCollection() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    _this.model = track_youtube_model_1.TrackYoutubeModel;
    _this.endpoint = '/search';
    _this.queryParams = {
      q: null,
      part: 'snippet',
      type: 'video',
      maxResults: 50
    };
    var debouncedFetchDetails = underscore_1.debounce(_this.fetchVideoDetails.bind(_this), 100);
    _this.on('update reset add', debouncedFetchDetails, _this);
    return _this;
  }

  TracksYoutubeCollection.getTrackDetails = function (trackIds) {
    var url = TracksYoutubeCollection.prototype.hostName.call(this) + "/proxy/youtube/videos";
    if (trackIds.length === 0) {
      return Promise.resolve({items: []});
    }
    else {
      return TracksYoutubeCollection.prototype.request.call(this, url, 'GET', {
        params: {
          part: 'statistics,contentDetails,player,topicDetails,snippet',
          id: trackIds.join(',')
        }
      });
    }
  };
  TracksYoutubeCollection.prototype.fetchVideoDetails = function () {
    var _this = this;
    var videoIds = [];
    this.each(function (item) {
      if (!item.hasDetails) {
        videoIds.push(item.id);
      }
    });
    return TracksYoutubeCollection.getTrackDetails(videoIds).then(function (rsp) {
      debugger;
      _this.add(rsp, {parse: true, merge: true});
      return _this;
    });
  };
  return TracksYoutubeCollection;
}(youtube_proxy_collection_1.YoutubeProxyCollection));
exports.TracksYoutubeCollection = TracksYoutubeCollection;
