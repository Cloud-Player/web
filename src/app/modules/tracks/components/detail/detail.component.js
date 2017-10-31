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
const common_1 = require('@angular/common');
const track_model_1 = require('../../models/track.model');
let TracksDetailComponent = class TracksDetailComponent {
    constructor(track, route, location) {
        this.track = track;
        this.route = route;
        this.location = location;
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            let id = +params['id'];
            this.track.set('id', id);
            this.track.fetch();
        });
    }
    goBack() {
        this.location.back();
    }
    save() {
        this.track.save(null, { wait: true })
            .then(() => this.goBack());
    }
};
TracksDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-track-detail',
        styles: [require('./detail.style.scss')],
        template: require('./detail.template.html'),
        providers: [track_model_1.Track]
    }), 
    __metadata('design:paramtypes', [track_model_1.Track, router_1.ActivatedRoute, common_1.Location])
], TracksDetailComponent);
exports.TracksDetailComponent = TracksDetailComponent;
//# sourceMappingURL=detail.component.js.map