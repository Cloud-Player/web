import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {PlayQueue} from '../../collections/play-queue';
import {PlayQueueItem} from '../../models/play-queue-item';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {DragAndDropService, DragAndDropStates, IDragAndDropData} from '../../../shared/services/drag-and-drop';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-play-queue',
  styleUrls: ['./playqueue.scss'],
  templateUrl: './playqueue.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayQueueComponent implements OnInit {
  private _subscriptions: Subscription;

  public coverSize = ImageSizes.Medium;
  public showDragAndDropHelp = false;

  @Input()
  public playQueue: PlayQueue<PlayQueueItem>;

  constructor(private el: ElementRef,
              private userAnalyticsService: UserAnalyticsService,
              private dragAndDropService: DragAndDropService,
              private cdr: ChangeDetectorRef) {
    this._subscriptions = new Subscription();
  }

  public drop(dragAndDrop: IDragAndDropData) {
    this.userAnalyticsService.trackEvent(
      'drop_track',
      'drag-and-drop',
      'app-play-queue'
    );
    if (this.playQueue.length > 0) {
      this.playQueue.queue({track: dragAndDrop.dragData});
    } else {
      this.playQueue.addAndPlay({track: dragAndDrop.dragData});
    }
  }

  private onDragStart() {
    this.el.nativeElement.classList.add('drag-in-progress');
    this.showDragAndDropHelp = true;
  }

  private onDragEnd() {
    this.el.nativeElement.classList.remove('drag-in-progress');
    this.showDragAndDropHelp = false;
  }

  private update() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.playQueue.on('add', (playQueueItem: PlayQueueItem) => {
      if (playQueueItem.isQueued()) {
        this.userAnalyticsService.trackEvent('queue_track', 'add', 'app-play-queue');
      }
    });
    this._subscriptions.add(
      this.dragAndDropService
        .getObservable()
        .subscribe(ev => {
          if (ev === DragAndDropStates.DragStart) {
            this.onDragStart();
          } else {
            this.onDragEnd();
          }
        })
    );
    this.playQueue.on('add remove reset change:status', this.update, this);
  }
}
