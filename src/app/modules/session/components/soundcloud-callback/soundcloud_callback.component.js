"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const session_model_1 = require('../../models/session.model');
let SoundcloudCallbackComponent = class SoundcloudCallbackComponent {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.session = session_model_1.Session.getInstance();
    }
    ;
    ngOnInit() {
        this.session.get('user').on('change:authenticated', () => {
            this.router.navigate(['/']);
        });
        this.route.queryParams.forEach((params) => {
            this.session.set({
                access_token: params.access_token,
                expires_on: params.expires_on,
                refresh_token: params.refresh_token
            });
        });
    }
    ;
};
SoundcloudCallbackComponent = __decorate([
    core_1.Component({
        selector: 'soundcloud-callback',
        styles: [require('./soundcloud_callback.style.scss')],
        template: require('./soundcloud_callback.template.html')
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
], SoundcloudCallbackComponent);
exports.SoundcloudCallbackComponent = SoundcloudCallbackComponent;
//# sourceMappingURL=soundcloud_callback.component.js.map