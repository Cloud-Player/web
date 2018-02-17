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
var account_soundcloud_model_1 = require("./account-soundcloud.model");
var account_youtube_model_1 = require("./account-youtube.model");
var dynamic_instance_decorator_1 = require("../../backbone/decorators/dynamic-instance.decorator");
var cloud_player_collection_1 = require("../cloud-player/cloud-player.collection");
var account_cloudplayer_model_1 = require("./account-cloudplayer.model");
var AccountsCollection = /** @class */ (function (_super) {
  __extends(AccountsCollection, _super);

  function AccountsCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = null;
    return _this;
  }

  AccountsCollection.prototype.getAccountForProvider = function (provider) {
    return this.find(function (account) {
      return account.provider === provider;
    });
  };
  __decorate([
    dynamic_instance_decorator_1.dynamicInstance({
      identifierKey: 'provider_id',
      identifierKeyValueMap: {
        cloudplayer: account_cloudplayer_model_1.AccountCloudplayerModel,
        youtube: account_youtube_model_1.AccountYoutubeModel,
        soundcloud: account_soundcloud_model_1.AccountSoundcloudModel
      }
    })
  ], AccountsCollection.prototype, "model", void 0);
  return AccountsCollection;
}(cloud_player_collection_1.CloudplayerCollection));
exports.AccountsCollection = AccountsCollection;
