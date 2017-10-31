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
const base_collection_1 = require('../../collections/base.collection');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let CollectionSortComponent = class CollectionSortComponent {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.sortDesc = true;
    }
    isSorted() {
        return this.collection &&
            ((this.collection.comparator === this.comparator) ||
                (!this.comparator && !this.collection.comparator));
    }
    sort() {
        if (this.comparator) {
            if (this.collection.length < 2) {
                return;
            }
            if (this.collection.comparator !== this.comparator) {
                this.collection.sortOrder = null;
                this.collection.comparator = this.comparator;
            }
            if (!this.collection.sortOrder || this.collection.sortOrder === 'ASC') {
                this.collection.sortDescending();
                this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_desc`, 'click', 'app-collection-sort-cmp');
            }
            else {
                this.collection.sortAscending();
                this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_asc`, 'click', 'app-collection-sort-cmp');
            }
        }
        else if (this.collection.comparator) {
            this.collection.comparator = null;
            this.collection.fetch();
            this.userAnalyticsService.trackEvent('sort_reset', 'click', 'app-collection-sort-cmp');
        }
    }
    ngOnInit() {
        this.collection.on('sync', () => {
            if (this.isSorted() && this.comparator) {
                this.collection.sortDescending();
            }
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata('design:type', base_collection_1.BaseCollection)
], CollectionSortComponent.prototype, "collection", void 0);
__decorate([
    core_1.Input(),
    __metadata('design:type', String)
], CollectionSortComponent.prototype, "comparator", void 0);
__decorate([
    core_1.Input(),
    __metadata('design:type', String)
], CollectionSortComponent.prototype, "label", void 0);
CollectionSortComponent = __decorate([
    core_1.Component({
        selector: 'app-collection-sort',
        styles: [require('./collection-sort.style.scss')],
        template: require('./collection-sort.template.html')
    }),
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], CollectionSortComponent);
exports.CollectionSortComponent = CollectionSortComponent;
//# sourceMappingURL=app-collection-sort.component.js.map
