import {Component, Input, OnInit} from '@angular/core';
import {Comments} from '../../collections/comments.collection';
import {Comment} from '../../models/comment.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';

@Component({
  selector: 'comments',
  styles: [require('./comments.style.scss')],
  template: require('./comments.template.html')
})

export class CommentsComponent {
  private _currentTime: number;
  private _commentsMap: any = {};
  private _comments: Comments<Comment>;
  private _humanReadableSecPipe: HumanReadableSecondsPipe;
  private _queueItemAliceTimeSecs: number = 5;

  public visibleCommentLines: number = 0;
  public commentsQueue: Comments<Comment>;
  public canShowMoreComments = true;

  constructor() {
    this._humanReadableSecPipe = new HumanReadableSecondsPipe();
    this.commentsQueue = new Comments();
  }

  private _setCommentsTimeMap(comments: Comments<Comment>): void {
    this._commentsMap = {};
    this.commentsQueue.reset();
    comments.each((comment: Comment) => {
      let secs = Math.round(comment.get('timestamp') / 1000);
      if (this._commentsMap[secs]) {
        this._commentsMap[secs].push(comment);
      } else {
        this._commentsMap[secs] = [comment];
      }
    });
  }

  private cleanUpHandler(currentTime: number) {
    var removeQueueItems = this.commentsQueue.filter((commentQueueItem: Comment) => {
      return (commentQueueItem.get('timestamp') / 1000) + this._queueItemAliceTimeSecs < currentTime;
    });
    removeQueueItems.forEach((item)=>{
      this.commentsQueue.remove(item);
    });
  }

  @Input()
  get currentTime(): number {
    return this._currentTime;
  }

  set currentTime(val: number) {
    this._currentTime = Math.round(val);
    if (this._commentsMap[this._currentTime]) {
      this._commentsMap[this._currentTime].forEach((comment: Comment) => {
        if(this.visibleCommentLines<9){
          this.commentsQueue.push(comment);
        }
      });
    }
    this.cleanUpHandler(val);
  }

  @Input()
  get comments(): Comments<Comment> {
    return this.comments;
  }

  set comments(comments: Comments<Comment>) {
    if (this._comments) {
      this._comments.off('update', this._setCommentsTimeMap, this);
    }
    this._comments = comments;
    this._setCommentsTimeMap(this._comments);
    this._comments.on('update', this._setCommentsTimeMap, this);
  }

  public updateVisibleLines(val: number){
    this.visibleCommentLines += val;
    if(val>0 && !this.canShowMoreComments){
      this.canShowMoreComments =  this.visibleCommentLines<15;
    }
  }
}
