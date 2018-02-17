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
var soundcloud_proxy_model_1 = require("../soundcloud/soundcloud-proxy.model");
var AccountSoundcloudModel = /** @class */ (function (_super) {
  __extends(AccountSoundcloudModel, _super);

  function AccountSoundcloudModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/users';
    return _this;
  }

  AccountSoundcloudModel.prototype.getFullName = function () {
    return this.fullName || this.username;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('provider'),
    default_value_decorator_1.defaultValue('soundcloud')
  ], AccountSoundcloudModel.prototype, "provider", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('avatar_url'),
    nested_decorator_1.nested()
  ], AccountSoundcloudModel.prototype, "image", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('username'),
    default_value_decorator_1.defaultValue('')
  ], AccountSoundcloudModel.prototype, "username", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('full_name'),
    default_value_decorator_1.defaultValue('')
  ], AccountSoundcloudModel.prototype, "fullName", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('playlists'),
    nested_decorator_1.nested()
  ], AccountSoundcloudModel.prototype, "playlists", void 0);
  __decorate([
    attributes_key_decorator_1.attributesKey('tracks'),
    nested_decorator_1.nested()
  ], AccountSoundcloudModel.prototype, "tracks", void 0);
  return AccountSoundcloudModel;
}(soundcloud_proxy_model_1.SoundcloudProxyModel));
exports.AccountSoundcloudModel = AccountSoundcloudModel;
