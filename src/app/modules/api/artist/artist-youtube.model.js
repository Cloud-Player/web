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
var ArtistYoutubeModel = /** @class */ (function (_super) {
  __extends(ArtistYoutubeModel, _super);

  function ArtistYoutubeModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/channels';
    _this.queryParams = {
      mine: true,
      part: 'snippet'
    };
    return _this;
  }

  ArtistYoutubeModel.prototype.sync = function (method, model, options) {
    if (options === void 0) {
      options = {};
    }
    var id = this.id;
    model.set(model.idAttribute, null);
    var sync = _super.prototype.sync.call(this, method, model, options);
    model.set(model.idAttribute, id);
    return sync;
  };
  ArtistYoutubeModel.prototype.parse = function (attributes) {
    var parsedAccount = {
      id: attributes.id
    };
    if (attributes.snippet) {
      parsedAccount.title = attributes.snippet.title;
      parsedAccount.image = attributes.snippet.thumbnails;
    }
    return parsedAccount;
  };
  ArtistYoutubeModel.prototype.getFullName = function () {
    return this.title;
  };
  ArtistYoutubeModel.prototype.getAccountId = function () {
    return this.id;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('provider'),
    default_value_decorator_1.defaultValue('youtube')
  ], ArtistYoutubeModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('image'),
    nested_decorator_1.nested()
  ], ArtistYoutubeModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('title')
    //@defaultValue('abc')
  ], ArtistYoutubeModel.prototype, "title", void 0);
  return ArtistYoutubeModel;
}(youtube_proxy_model_1.YoutubeProxyModel));
exports.ArtistYoutubeModel = ArtistYoutubeModel;
