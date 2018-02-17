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
var attributes_key_decorator_1 = require("../../backbone/decorators/attributes-key.decorator");
var nested_decorator_1 = require("../../backbone/decorators/nested.decorator");
var AuthenticatedUserModel = /** @class */ (function (_super) {
  __extends(AuthenticatedUserModel, _super);

  function AuthenticatedUserModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.endpoint = '/user';
    return _this;
  }

  AuthenticatedUserModel.getInstance = function () {
    if (!AuthenticatedUserModel.instance) {
      AuthenticatedUserModel.instance = new AuthenticatedUserModel();
    }
    return AuthenticatedUserModel.instance;
  };
  AuthenticatedUserModel.prototype.fetch = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var id = this.id;
    this.set('id', 'me');
    var superCall = (_a = _super.prototype.fetch).apply.apply(_a, [this].concat(args));
    this.set('id', id);
    return superCall;
    var _a;
  };
  __decorate([
    attributes_key_decorator_1.attributesKey('accounts'),
    nested_decorator_1.nested()
  ], AuthenticatedUserModel.prototype, "accounts", void 0);
  return AuthenticatedUserModel;
}(cloud_player_model_1.CloudplayerModel));
exports.AuthenticatedUserModel = AuthenticatedUserModel;
