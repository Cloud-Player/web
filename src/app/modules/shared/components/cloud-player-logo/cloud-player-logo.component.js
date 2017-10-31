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
const cloud_player_logo_service_1 = require('../../services/cloud-player-logo.service');
let CloudPlayerLogoComponent = class CloudPlayerLogoComponent {
    constructor(cloudPlayerLogoService) {
        this.cloudPlayerLogoService = cloudPlayerLogoService;
        this.animate = false;
        cloudPlayerLogoService.logoState$.subscribe((status) => {
            if (status === 'PAUSE') {
                this.pause();
            }
            else if (status === 'PLAY') {
                this.play();
            }
        });
    }
    ngOnInit() {
        this.svgObject.nativeElement.addEventListener('load', () => {
            let svgObj = this.svgObject.nativeElement;
            let content = svgObj.contentDocument;
            this.mainAnimation = content.querySelectorAll('.main-animation');
            this.iconAnimationToPlay = content.querySelectorAll('.icon-animation-to-play');
            this.iconAnimationToPause = content.querySelectorAll('.icon-animation-to-pause');
        }, false);
    }
    play() {
        if (this.mainAnimation && this.animate) {
            this.mainAnimation.forEach((el) => {
                el.beginElement(el.getCurrentTime());
            });
            this.iconAnimationToPause.forEach((el) => {
                el.beginElement();
            });
        }
    }
    pause() {
        if (this.mainAnimation && this.animate) {
            this.mainAnimation.forEach((el) => {
                el.endElement();
            });
            this.iconAnimationToPlay.forEach((el) => {
                el.beginElement();
            });
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], CloudPlayerLogoComponent.prototype, "animate", void 0);
__decorate([
    core_1.ViewChild('svgObject'), 
    __metadata('design:type', core_1.ElementRef)
], CloudPlayerLogoComponent.prototype, "svgObject", void 0);
CloudPlayerLogoComponent = __decorate([
    core_1.Component({
        selector: 'cloud-player-logo',
        styles: [require('./cloud-player-logo.style.scss')],
        template: require('./cloud-player-logo.template.html'),
    }), 
    __metadata('design:paramtypes', [cloud_player_logo_service_1.CloudPlayerLogoService])
], CloudPlayerLogoComponent);
exports.CloudPlayerLogoComponent = CloudPlayerLogoComponent;
//# sourceMappingURL=cloud-player-logo.component.js.map