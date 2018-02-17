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
var cloud_player_collection_1 = require("../cloud-player/cloud-player.collection");
var cloud_player_model_1 = require("../cloud-player/cloud-player.model");
var YoutubeProxyCollection = /** @class */ (function (_super) {
  __extends(YoutubeProxyCollection, _super);

  function YoutubeProxyCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = cloud_player_model_1.CloudplayerModel;
    return _this;
  }

  YoutubeProxyCollection.prototype.basePath = function () {
    return '/proxy/youtube';
  };
  YoutubeProxyCollection.prototype.parse = function (attributes) {
    return attributes.items || attributes;
  };
  return YoutubeProxyCollection;
}(cloud_player_collection_1.CloudplayerCollection));
exports.YoutubeProxyCollection = YoutubeProxyCollection;
