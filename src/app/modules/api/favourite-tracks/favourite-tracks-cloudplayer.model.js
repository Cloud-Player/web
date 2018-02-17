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
var cloud_player_model_1 = require("../cloud-player/cloud-player.model");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var FavouriteTracksCloudplayerModel = /** @class */ (function (_super) {
  __extends(FavouriteTracksCloudplayerModel, _super);

  function FavouriteTracksCloudplayerModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/favourite/cloudplayer';
    return _this;
  }

  FavouriteTracksCloudplayerModel.prototype.parse = function (attributes) {
    delete attributes.items;
    return attributes;
  };
  FavouriteTracksCloudplayerModel.prototype.fetch = function () {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var id = this.id;
    this.set('id', 'mine');
    var superCall = (_a = _super.prototype.fetch).apply.apply(_a, [this].concat(args)).then(function () {
      _this.items.fetch();
      return _this;
    });
    this.set('id', id);
    return superCall;
    var _a;
  };
  FavouriteTracksCloudplayerModel.prototype.initialize = function () {
    var _this = this;
    this._favouriteTracksMap = {};
    this.items.on('add', function (item) {
      _this._favouriteTracksMap[item.track.id] = item.track;
    });
    this.items.on('remove', function (item) {
      delete _this._favouriteTracksMap[item.track.id];
    });
    this.items.on('reset', function (item) {
      _this._favouriteTracksMap = {};
    });
    this.on('change:id', function () {
      _this.items.endpoint = _this.endpoint + "/" + _this.id + "/item";
    });
  };
  FavouriteTracksCloudplayerModel.prototype.trackIsFavourited = function (track) {
    return !!this._favouriteTracksMap[track.id];
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('items'),
    nested_decorator_1.nested()
  ], FavouriteTracksCloudplayerModel.prototype, "items", void 0);
  return FavouriteTracksCloudplayerModel;
}(cloud_player_model_1.CloudplayerModel));
exports.FavouriteTracksCloudplayerModel = FavouriteTracksCloudplayerModel;
