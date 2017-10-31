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
let ViewChangeLoaderComponent = class ViewChangeLoaderComponent {
    constructor(el, router, ngZone, renderer) {
        this.el = el;
        this.router = router;
        this.ngZone = ngZone;
        this.renderer = renderer;
        router.events.subscribe((event) => {
            this.navigationInterceptor(event);
        });
    }
    navigationInterceptor(event) {
        if (event instanceof router_1.NavigationStart) {
            this.showSpinner();
        }
        if (event instanceof router_1.NavigationEnd
            || event instanceof router_1.NavigationCancel
            || event instanceof router_1.NavigationError) {
            this.hideSpinner();
        }
    }
    showSpinner() {
        // We wanna run this function outside of Angular's zone to
        // bypass change detection
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        });
    }
    hideSpinner() {
        // We wanna run this function outside of Angular's zone to
        // bypass change detection,
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        });
    }
};
ViewChangeLoaderComponent = __decorate([
    core_1.Component({
        selector: 'view-change-loader',
        styles: [require('./view-change-loader.style.scss')],
        template: require('./view-change-loader.template.html'),
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, core_1.NgZone, core_1.Renderer])
], ViewChangeLoaderComponent);
exports.ViewChangeLoaderComponent = ViewChangeLoaderComponent;
//# sourceMappingURL=view-change-loader.component.js.map