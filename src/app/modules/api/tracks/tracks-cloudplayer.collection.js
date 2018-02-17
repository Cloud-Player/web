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
var track_cloudplayer_model_1 = require("./track-cloudplayer.model");
var cloud_player_collection_1 = require("../cloud-player/cloud-player.collection");
var TracksCloudplayerCollection = /** @class */ (function (_super) {
  __extends(TracksCloudplayerCollection, _super);

  function TracksCloudplayerCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = track_cloudplayer_model_1.TrackCloudplayerModel;
    _this.endpoint = '/tracks';
    _this.queryParams = {};
    return _this;
  }

  return TracksCloudplayerCollection;
}(cloud_player_collection_1.CloudplayerCollection));
exports.TracksCloudplayerCollection = TracksCloudplayerCollection;
