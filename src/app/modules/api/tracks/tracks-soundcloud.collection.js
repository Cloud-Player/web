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
var soundcloud_proxy_collection_1 = require("../soundcloud/soundcloud-proxy.collection");
var track_soundcloud_model_1 = require("./track-soundcloud.model");
var TracksSoundcloudCollection = /** @class */ (function (_super) {
  __extends(TracksSoundcloudCollection, _super);

  function TracksSoundcloudCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = track_soundcloud_model_1.TrackSoundcloudModel;
    _this.endpoint = '/tracks';
    _this.queryParams = {
      q: null,
      limit: 200,
      'duration[from]': 1000
    };
    return _this;
  }

  TracksSoundcloudCollection.getTrackDetails = function (trackIds) {
    var url = TracksSoundcloudCollection.prototype.hostName.call(this) + "/proxy/soundcloud/tracks";
    if (trackIds.length === 0) {
      return Promise.resolve([]);
    }
    else {
      return TracksSoundcloudCollection.prototype.request.call(this, url, 'GET', {
        params: {
          ids: trackIds.join(',')
        }
      });
    }
  };
  return TracksSoundcloudCollection;
}(soundcloud_proxy_collection_1.SoundcloudProxyCollection));
exports.TracksSoundcloudCollection = TracksSoundcloudCollection;
