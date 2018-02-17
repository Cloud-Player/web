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
var base_model_1 = require("../../backbone/models/base.model");
var image_sizes_enum_1 = require("./image-sizes.enum");
var AbstractImageModel = /** @class */ (function (_super) {
  __extends(AbstractImageModel, _super);

  function AbstractImageModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AbstractImageModel.prototype.getImageBySize = function (size) {
    switch (size) {
      case image_sizes_enum_1.ImageSizes.Large:
        return this.getLargeSizeUrl();
      case image_sizes_enum_1.ImageSizes.Medium:
        return this.getMediumSizeUrl();
      case image_sizes_enum_1.ImageSizes.Small:
        return this.getSmallSizeUrl();
      default:
        return this.getDefaultSizeUrl();
    }
  };
  return AbstractImageModel;
}(base_model_1.BaseModel));
exports.AbstractImageModel = AbstractImageModel;
