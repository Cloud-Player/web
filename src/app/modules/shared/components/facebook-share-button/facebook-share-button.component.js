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
let FacebookShareButtonComponent = class FacebookShareButtonComponent {
    constructor(el) {
        this.el = el;
        this.click = new core_1.EventEmitter();
    }
    initFacebookJsSdk() {
        return new Promise((resolve, reject) => {
            const facebookElId = 'facebookJsSdk';
            const facebookScriptEl = document.getElementById(facebookElId);
            if (facebookScriptEl) {
                resolve();
            }
            else {
                let js;
                const scripts = document.getElementsByTagName('script')[0];
                js = document.createElement('script');
                js.id = facebookElId;
                js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=146645615953816';
                scripts.parentNode.insertBefore(js, facebookScriptEl);
                js.onload = () => {
                    resolve();
                };
            }
        });
    }
    ;
    initClickListener() {
        let fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
        let monitor = setInterval(() => {
            if (!fbIframe) {
                fbIframe = this.el.nativeElement.querySelectorAll('iframe')[0];
            }
            let activeEl = document.activeElement;
            if (activeEl === fbIframe) {
                clearInterval(monitor);
                this.click.emit();
            }
        }, 1000);
    }
    ngOnInit() {
        this.initFacebookJsSdk().then(() => {
            this.initClickListener();
        });
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], FacebookShareButtonComponent.prototype, "click", void 0);
FacebookShareButtonComponent = __decorate([
    core_1.Component({
        selector: 'facebook-share-button',
        styles: [require('./facebook-share-button.style.scss')],
        template: require('./facebook-share-button.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], FacebookShareButtonComponent);
exports.FacebookShareButtonComponent = FacebookShareButtonComponent;
//# sourceMappingURL=facebook-share-button.component.js.map