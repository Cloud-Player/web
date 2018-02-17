import {Component, ElementRef, Input} from '@angular/core';
import {Comments} from '../../collections/comments.collection';
import {Comment} from '../../models/comment.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';

@Component({
  selector: 'app-user-comments',
  styleUrls: ['./user-comments.style.scss'],
  templateUrl: './user-comments.template.html'
})

export class UserCommentsComponent {
  private _currentTime: number;
  private _commentsMap: any = {};
  private _comments: Comments<Comment>;
  private _humanReadableSecPipe: HumanReadableSecondsPipe;
  private _queueItemAliceTimeSecs = 5;
  private _bigComments = false;
  private _smallCommentsFont = '300 12px Raleway';
  private _bigCommentsFont = '300 20px Raleway';

  public visibleCommentLines = 0;
  public commentsQueue: Comments<Comment>;
  public canShowMoreComments = true;
  public font = this._smallCommentsFont;
  public maxWidth = 288;

  constructor(private el: ElementRef) {
    this._humanReadableSecPipe = new HumanReadableSecondsPipe();
    this.commentsQueue = new Comments();
  }

  private _setCommentsTimeMap(comments: Comments<Comment>): void {
    this._commentsMap = {};
    this.commentsQueue.reset();
    comments.each((comment: Comment) => {
      const secs = Math.round(comment.timestamp / 1000);
      if (this._commentsMap[secs]) {
        this._commentsMap[secs].push(comment);
      } else {
        this._commentsMap[secs] = [comment];
      }
    });
  }

  private cleanUpHandler(currentTime: number) {
    const removeQueueItems = this.commentsQueue.filter((commentQueueItem: Comment) => {
      return (commentQueueItem.timestamp / 1000) + this._queueItemAliceTimeSecs < currentTime;
    });
    removeQueueItems.forEach((item) => {
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
        if (this.visibleCommentLines < 9) {
          this.commentsQueue.push(comment);
        }
      });
    }
    this.cleanUpHandler(val);
  }

  @Input()
  get bigComments(): boolean {
    return this._bigComments;
  }

  set bigComments(val: boolean) {
    if (val) {
      this.font = this._bigCommentsFont;
      this.el.nativeElement.classList.add('big-comments');
      this.maxWidth = screen.width - 100;
    } else {
      this.font = this._smallCommentsFont;
      this.el.nativeElement.classList.remove('big-comments');
      this.maxWidth = 288;
    }
    this._bigComments = val;
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

  public updateVisibleLines(val: number) {
    this.visibleCommentLines += val;
    if (val > 0 && !this.canShowMoreComments) {
      this.canShowMoreComments = this.visibleCommentLines < 15;
    }
  }
}
