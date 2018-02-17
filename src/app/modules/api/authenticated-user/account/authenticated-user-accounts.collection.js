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
var dynamic_instance_decorator_1 = require("../../../backbone/decorators/dynamic-instance.decorator");
var authenticated_user_account_cloudplayer_model_1 = require("./authenticated-user-account-cloudplayer.model");
var authenticated_user_account_youtube_model_1 = require("./authenticated-user-account-youtube.model");
var authenticated_user_account_soundcloud_model_1 = require("./authenticated-user-account-soundcloud.model");
var accounts_collection_1 = require("../../account/accounts.collection");
var base_model_1 = require("../../../backbone/models/base.model");
var AuthenticatedUserAccountsCollection = /** @class */ (function (_super) {
  __extends(AuthenticatedUserAccountsCollection, _super);

  function AuthenticatedUserAccountsCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/account';
    _this.model = authenticated_user_account_soundcloud_model_1.AuthenticatedUserAccountSoundcloudModel;
    return _this;
  }

  AuthenticatedUserAccountsCollection.prototype.set = function (models, options) {
    if (options === void 0) {
      options = {};
    }
    if (models instanceof base_model_1.BaseModel && models.id && this.getAccountForProvider(models.provider)) {
      this.getAccountForProvider(models.provider).set(models.toJSON(), {merge: true});
    }
    return _super.prototype.set.call(this, models, options);
  };
  AuthenticatedUserAccountsCollection.prototype.initialize = function () {
    var _this = this;
    [
      authenticated_user_account_cloudplayer_model_1.AuthenticatedUserAccountCloudplayerModel,
      authenticated_user_account_soundcloud_model_1.AuthenticatedUserAccountSoundcloudModel,
      authenticated_user_account_youtube_model_1.AuthenticatedUserAccountYoutubeModel
    ].forEach(function (account) {
      var tmpAccountModel = new account({tmp: 1});
      _this.add(tmpAccountModel);
    });
  };
  __decorate([
    dynamic_instance_decorator_1.dynamicInstance({
      identifierKey: 'provider_id',
      identifierKeyValueMap: {
        cloudplayer: authenticated_user_account_cloudplayer_model_1.AuthenticatedUserAccountCloudplayerModel,
        youtube: authenticated_user_account_youtube_model_1.AuthenticatedUserAccountYoutubeModel,
        soundcloud: authenticated_user_account_soundcloud_model_1.AuthenticatedUserAccountSoundcloudModel
      }
    })
  ], AuthenticatedUserAccountsCollection.prototype, "model", void 0);
  return AuthenticatedUserAccountsCollection;
}(accounts_collection_1.AccountsCollection));
exports.AuthenticatedUserAccountsCollection = AuthenticatedUserAccountsCollection;
