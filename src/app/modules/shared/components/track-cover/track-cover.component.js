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
const track_model_1 = require('../../../tracks/models/track.model');
(function (CoverSizes) {
    CoverSizes[CoverSizes["Small"] = 0] = "Small";
    CoverSizes[CoverSizes["Medium"] = 1] = "Medium";
    CoverSizes[CoverSizes["Regular"] = 2] = "Regular";
    CoverSizes[CoverSizes["Large"] = 3] = "Large";
})(exports.CoverSizes || (exports.CoverSizes = {}));
var CoverSizes = exports.CoverSizes;
let TrackCoverComponent = class TrackCoverComponent {
    constructor() {
        this.animate = false;
    }
    getArtworkUrl() {
        if (this.track) {
            let artwork = this.track.get('artwork_url');
            let artworkUrl;
            switch (this.size) {
                case CoverSizes.Small:
                    artworkUrl = artwork.getSmallSize();
                    break;
                case CoverSizes.Medium:
                    artworkUrl = artwork.getMediumSize();
                    break;
                case CoverSizes.Large:
                    artworkUrl = artwork.getLargeSize();
                    break;
                case CoverSizes.Regular:
                    artworkUrl = artwork.getDefaultSize();
                    break;
            }
            return artworkUrl;
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', track_model_1.Track)
], TrackCoverComponent.prototype, "track", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TrackCoverComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TrackCoverComponent.prototype, "animate", void 0);
TrackCoverComponent = __decorate([
    core_1.Component({
        selector: 'track-cover',
        styles: [require('./track-cover.style.scss')],
        template: require('./track-cover.template.html')
    }), 
    __metadata('design:paramtypes', [])
], TrackCoverComponent);
exports.TrackCoverComponent = TrackCoverComponent;
//# sourceMappingURL=track-cover.component.js.map