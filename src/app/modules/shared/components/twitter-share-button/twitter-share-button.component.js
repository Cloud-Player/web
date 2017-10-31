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
let TwitterShareButtonComponent = class TwitterShareButtonComponent {
    constructor(el) {
        this.el = el;
        this.click = new core_1.EventEmitter();
    }
    build() {
        window.twttr.widgets.createShareButton('https://cloud-player.io', document.querySelector('.twitter-share-button'), {
            via: 'cldplayer',
            size: 'large',
            text: 'Check out this free music player'
        });
    }
    initTwitterJsSdk() {
        return new Promise((resolve, reject) => {
            const twitterElId = 'twitterJsSdk';
            const twitterScriptEl = document.getElementById(twitterElId);
            if (twitterScriptEl) {
                resolve();
            }
            else {
                let js;
                const scripts = document.getElementsByTagName('script')[0];
                js = document.createElement('script');
                js.id = twitterElId;
                js.src = '//platform.twitter.com/widgets.js';
                scripts.parentNode.insertBefore(js, twitterScriptEl);
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
        this.initTwitterJsSdk().then(() => {
            this.build();
            this.initClickListener();
        });
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TwitterShareButtonComponent.prototype, "click", void 0);
TwitterShareButtonComponent = __decorate([
    core_1.Component({
        selector: 'twitter-share-button',
        styles: [require('./twitter-share-button.style.scss')],
        template: require('./twitter-share-button.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], TwitterShareButtonComponent);
exports.TwitterShareButtonComponent = TwitterShareButtonComponent;
//# sourceMappingURL=twitter-share-button.component.js.map