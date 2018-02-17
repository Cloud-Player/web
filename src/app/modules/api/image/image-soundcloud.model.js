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
var abstract_image_1 = require("./abstract-image");
var ImageSoundcloudModel = /** @class */ (function (_super) {
  __extends(ImageSoundcloudModel, _super);

  function ImageSoundcloudModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ImageSoundcloudModel.prototype.getImageByFormat = function (format) {
    if (this.imageUrl) {
      return this.imageUrl.replace('-large', "-" + format);
    }
  };
  ImageSoundcloudModel.prototype.getLargeSizeUrl = function () {
    return this.getImageByFormat('t500x500');
  };
  ImageSoundcloudModel.prototype.getMediumSizeUrl = function () {
    return this.getImageByFormat('t300x300');
  };
  ImageSoundcloudModel.prototype.getSmallSizeUrl = function () {
    return this.getImageByFormat('small');
  };
  ImageSoundcloudModel.prototype.getDefaultSizeUrl = function () {
    return this.imageUrl;
  };
  ImageSoundcloudModel.prototype.toJSON = function () {
    return {
      id: this.imageUrl
    };
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('id')
  ], ImageSoundcloudModel.prototype, "imageUrl", void 0);
  return ImageSoundcloudModel;
}(abstract_image_1.AbstractImageModel));
exports.ImageSoundcloudModel = ImageSoundcloudModel;
