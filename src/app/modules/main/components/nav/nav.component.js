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
const session_model_1 = require('../../../session/models/session.model');
const auth_service_1 = require('../../../shared/services/auth.service');
const client_detector_service_1 = require('../../../shared/services/client-detector.service');
let NavComponent = class NavComponent {
    constructor(authService) {
        this.authService = authService;
        this.toggleState = 'in';
        this.imgUrl = 'https://a-v2.sndcdn.com/assets/images/header/cloud@2x-e5fba4.png';
        this.session = session_model_1.Session.getInstance();
        this.user = this.session.get('user');
    }
    toggle() {
        this.toggleState = this.toggleState === 'out' ? 'in' : 'out';
    }
    connect() {
        this.authService.connect();
    }
    disconnect() {
        this.authService.disconnect();
    }
    setAuthenticated(user) {
        if (user.get('authenticated')) {
            user.fetch().then(() => {
                this.isAuthenticated = true;
                user.get('likes').fetch();
            });
        }
        else {
            this.isAuthenticated = false;
        }
    }
    ;
    ngOnInit() {
        this.session.get('user').on('change:authenticated', (user) => {
            this.setAuthenticated(user);
        });
        if (this.session.isValid()) {
            this.setAuthenticated(this.session.get('user'));
        }
    }
    ;
    showDesktopAppEntry() {
        let os = client_detector_service_1.ClientDetector.getOs(), client = client_detector_service_1.ClientDetector.getClient();
        return (client.name !== client_detector_service_1.ClientNames.Electron &&
            ((os.name === client_detector_service_1.OsNames.MacOs && os.version > 0) || (os.name === client_detector_service_1.OsNames.Windows && os.version >= 7)));
    }
};
NavComponent = __decorate([
    core_1.Component({
        selector: 'nav-sidebar',
        styles: [require('./nav.style.scss')],
        template: require('./nav.template.html')
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map