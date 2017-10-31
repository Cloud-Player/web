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
const comments_collection_1 = require('../../collections/comments.collection');
const h_readable_seconds_pipe_1 = require('../../../shared/pipes/h-readable-seconds.pipe');
let UserCommentsComponent = class UserCommentsComponent {
    constructor() {
        this._commentsMap = {};
        this._queueItemAliceTimeSecs = 5;
        this.visibleCommentLines = 0;
        this.canShowMoreComments = true;
        this._humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
        this.commentsQueue = new comments_collection_1.Comments();
    }
    _setCommentsTimeMap(comments) {
        this._commentsMap = {};
        this.commentsQueue.reset();
        comments.each((comment) => {
            let secs = Math.round(comment.get('timestamp') / 1000);
            if (this._commentsMap[secs]) {
                this._commentsMap[secs].push(comment);
            }
            else {
                this._commentsMap[secs] = [comment];
            }
        });
    }
    cleanUpHandler(currentTime) {
        var removeQueueItems = this.commentsQueue.filter((commentQueueItem) => {
            return (commentQueueItem.get('timestamp') / 1000) + this._queueItemAliceTimeSecs < currentTime;
        });
        removeQueueItems.forEach((item) => {
            this.commentsQueue.remove(item);
        });
    }
    get currentTime() {
        return this._currentTime;
    }
    set currentTime(val) {
        this._currentTime = Math.round(val);
        if (this._commentsMap[this._currentTime]) {
            this._commentsMap[this._currentTime].forEach((comment) => {
                if (this.visibleCommentLines < 9) {
                    this.commentsQueue.push(comment);
                }
            });
        }
        this.cleanUpHandler(val);
    }
    get comments() {
        return this.comments;
    }
    set comments(comments) {
        if (this._comments) {
            this._comments.off('update', this._setCommentsTimeMap, this);
        }
        this._comments = comments;
        this._setCommentsTimeMap(this._comments);
        this._comments.on('update', this._setCommentsTimeMap, this);
    }
    updateVisibleLines(val) {
        this.visibleCommentLines += val;
        if (val > 0 && !this.canShowMoreComments) {
            this.canShowMoreComments = this.visibleCommentLines < 15;
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], UserCommentsComponent.prototype, "currentTime", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', comments_collection_1.Comments)
], UserCommentsComponent.prototype, "comments", null);
UserCommentsComponent = __decorate([
    core_1.Component({
        selector: 'user-comments',
        styles: [require('./user-comments.style.scss')],
        template: require('./user-comments.template.html')
    }), 
    __metadata('design:paramtypes', [])
], UserCommentsComponent);
exports.UserCommentsComponent = UserCommentsComponent;
//# sourceMappingURL=user-comments.component.js.map