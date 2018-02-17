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
var abstract_image_1 = require("./abstract-image");
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var default_value_decorator_1 = require("../../backbone/decorators/default-value.decorator");
var ImageYoutubeModel = /** @class */ (function (_super) {
  __extends(ImageYoutubeModel, _super);

  function ImageYoutubeModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ImageYoutubeModel.prototype.getLargeSizeUrl = function () {
    return this.high.url;
  };
  ImageYoutubeModel.prototype.getMediumSizeUrl = function () {
    return this.medium.url;
  };
  ImageYoutubeModel.prototype.getSmallSizeUrl = function () {
    return this.default.url;
  };
  ImageYoutubeModel.prototype.getDefaultSizeUrl = function () {
    return this.default.url;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('default'),
    default_value_decorator_1.defaultValue({})
  ], ImageYoutubeModel.prototype, "default", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('medium'),
    default_value_decorator_1.defaultValue({})
  ], ImageYoutubeModel.prototype, "medium", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('high'),
    default_value_decorator_1.defaultValue({})
  ], ImageYoutubeModel.prototype, "high", void 0);
  return ImageYoutubeModel;
}(abstract_image_1.AbstractImageModel));
exports.ImageYoutubeModel = ImageYoutubeModel;
