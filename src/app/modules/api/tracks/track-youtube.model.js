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
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var youtube_proxy_model_1 = require("../youtube/youtube-proxy.model");
var tracks_youtube_topics_collection_1 = require("./tracks-youtube-topics.collection");
var query_param_decorator_1 = require("../../backbone/decorators/query-param.decorator");
var underscore_1 = require("underscore");
var TrackYoutubeModel = /** @class */ (function (_super) {
  __extends(TrackYoutubeModel, _super);

  function TrackYoutubeModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/videos';
    _this.isLikeable = false;
    _this.part = 'snippet';
    return _this;
  }

  // Parses the youtube duration string e.g. PT4M25S, PT10H4M25S, PT4M
  TrackYoutubeModel.getParsedDuration = function (ytDuration) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    if (ytDuration) {
      var match = ytDuration.match(/(\d*H)?(\d*M)?(\d*S)?$/);
      if (match && match.length === 4) {
        if (match[1]) {
          hours = parseInt(match[1], 10);
        }
        if (match[2]) {
          minutes = parseInt(match[2], 10);
        }
        if (match[3]) {
          seconds = parseInt(match[3], 10);
        }
      }
    }
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };
  // Parses the width and height from the youtube embed html string
  // e.g. <iframe width="480" height="270" src="//www.youtube.com/embed/Kpm1l0HfkV0"></iframe>
  TrackYoutubeModel.getAspectRationFromEmbedString = function (embedString) {
    var aspectRatio = 1;
    if (embedString) {
      var match = embedString.match(/width="(\d*)".*height="(\d*)"/);
      if (match && match.length === 3) {
        aspectRatio = parseInt(match[1], 10) / (parseInt(match[2], 10));
      }
    }
    return aspectRatio;
  };
  TrackYoutubeModel.prototype.setGenre = function () {
    var _this = this;
    if (this.categoryIds.length > 0) {
      this.categoryIds.each(function (id, index) {
        var topic = _this._topics.get(id);
        if (!topic.isParent || index === _this.categoryIds.length) {
          _this.genre = topic.title;
        }
      });
    }
  };
  TrackYoutubeModel.prototype.hostName = function () {
    return youtube_proxy_model_1.YoutubeProxyModel.prototype.hostName.apply(this);
  };
  TrackYoutubeModel.prototype.sync = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return youtube_proxy_model_1.YoutubeProxyModel.prototype.sync.apply(this, args);
  };
  TrackYoutubeModel.prototype.parse = function (attributes) {
    if (attributes.items && attributes.items.length === 1) {
      //attributes = attributes.items[0];
    }
    var parsedTrack = {
      id: underscore_1.isObject(attributes.id) ? attributes.id.videoId : attributes.id
    };
    if (attributes.snippet) {
      parsedTrack.title = attributes.snippet.title;
      parsedTrack.createdAt = +new Date(attributes.snippet.publishedAt);
      if (attributes.snippet.thumbnails) {
        parsedTrack.image = {
          default: attributes.snippet.thumbnails.default,
          medium: attributes.snippet.thumbnails.medium,
          high: attributes.snippet.thumbnails.high
        };
      }
      parsedTrack.user = {
        id: attributes.snippet.channelId,
        title: attributes.snippet.channelTitle
      };
    }
    if (attributes.player) {
      parsedTrack.aspectRatio = TrackYoutubeModel.getAspectRationFromEmbedString(attributes.player.embedHtml);
    }
    if (attributes.contentDetails) {
      parsedTrack.duration = TrackYoutubeModel.getParsedDuration(attributes.contentDetails.duration);
      parsedTrack.hasDetails = true;
    }
    if (attributes.statistics) {
      parsedTrack.likes = parseInt(attributes.statistics.likeCount, 10);
      parsedTrack.clicks = parseInt(attributes.statistics.viewCount, 10);
    }
    if (attributes.topicDetails) {
      parsedTrack.categoryIds = attributes.topicDetails.relevantTopicIds;
    }
    return parsedTrack;
  };
  TrackYoutubeModel.prototype.initialize = function () {
    var _this = this;
    this._topics = tracks_youtube_topics_collection_1.TracksYoutubeTopicsCollection.getInstance();
    this._topics.once('add', this.setGenre.bind(this));
    this.categoryIds.on('add remove reset', function () {
      _this.setGenre();
    });
  };
  TrackYoutubeModel.prototype.toMiniJSON = function () {
    var obj = {};
    obj.provider = this.provider;
    obj.id = this.id;
    obj.title = this.title;
    obj.duration = this.duration;
    obj.image = this.image.toJSON();
    obj.user = this.artist.toJSON();
    obj.aspectRatio = this.aspectRatio;
    return obj;
  };
  __decorate([
    query_param_decorator_1.queryParam()
  ], TrackYoutubeModel.prototype, "part", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('hasDetails'),
    default_value_decorator_1.defaultValue(false)
  ], TrackYoutubeModel.prototype, "hasDetails", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('provider_id'),
    default_value_decorator_1.defaultValue('youtube')
  ], TrackYoutubeModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('videoId')
  ], TrackYoutubeModel.prototype, "videoId", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('user'),
    nested_decorator_1.nested()
  ], TrackYoutubeModel.prototype, "artist", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('image'),
    nested_decorator_1.nested()
  ], TrackYoutubeModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title')
  ], TrackYoutubeModel.prototype, "title", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('duration')
  ], TrackYoutubeModel.prototype, "duration", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('genre')
  ], TrackYoutubeModel.prototype, "genre", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('createdAt')
  ], TrackYoutubeModel.prototype, "createdAt", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('likes')
  ], TrackYoutubeModel.prototype, "likes", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('clicks')
  ], TrackYoutubeModel.prototype, "clicks", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('aspectRatio'),
    default_value_decorator_1.defaultValue(1)
  ], TrackYoutubeModel.prototype, "aspectRatio", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('categoryIds'),
    nested_decorator_1.nested()
  ], TrackYoutubeModel.prototype, "categoryIds", void 0);
  return TrackYoutubeModel;
}(youtube_proxy_model_1.YoutubeProxyModel));
exports.TrackYoutubeModel = TrackYoutubeModel;
