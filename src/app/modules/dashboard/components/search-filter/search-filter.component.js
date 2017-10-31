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
const base_collection_1 = require('../../../backbone/collections/base.collection');
const h_readable_seconds_pipe_1 = require('../../../shared/pipes/h-readable-seconds.pipe');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let SearchFilterComponent = class SearchFilterComponent {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.showFilterForm = false;
        this.transformProgressBarValues = function (input) {
            return this.humanReadableSecPipe.transform(input / 1000, null);
        }.bind(this);
        this.humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
    }
    toggleFilterForm() {
        if (this.showFilterForm) {
            this.userAnalyticsService.trackEvent('close_filter_form', 'click', 'search-filter-cmp');
            this.showFilterForm = false;
        }
        else {
            this.userAnalyticsService.trackEvent('open_filter_form', 'click', 'search-filter-cmp');
            this.showFilterForm = true;
        }
    }
    transformDuration(input = '') {
        return this.humanReadableSecPipe.transform(input, null);
    }
    reFetch(changedAttr) {
        this.collection.fetch({ reset: true });
        this.userAnalyticsService.trackEvent(`filter_${changedAttr}`, 'click', 'search-filter-cmp');
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', base_collection_1.BaseCollection)
], SearchFilterComponent.prototype, "collection", void 0);
SearchFilterComponent = __decorate([
    core_1.Component({
        selector: 'search-filter',
        styles: [require('./search-filter.style.scss')],
        template: require('./search-filter.template.html'),
        animations: [
            core_1.trigger('visibilityChanged', [
                core_1.state('true', core_1.style({ height: '*', marginBottom: '15px', padding: '15px', })),
                core_1.state('false', core_1.style({ height: 0, marginBottom: 0, padding: 0, display: 'none' })),
                core_1.state('void', core_1.style({ height: 0, marginBottom: 0, padding: 0, display: 'none' })),
                core_1.transition('* => *', core_1.animate('200ms ease-in-out'))
            ])
        ]
    }), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], SearchFilterComponent);
exports.SearchFilterComponent = SearchFilterComponent;
//# sourceMappingURL=search-filter.component.js.map