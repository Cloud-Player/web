import {Component, Input, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {PlayQueue} from '../../collections/play-queue';
import {PlayQueueItem} from '../../models/play-queue-item';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {IDragAndDropData} from '../../../shared/services/drag-and-drop';

@Component({
  selector: 'app-play-queue',
  styleUrls: ['./playqueue.scss'],
  templateUrl: './playqueue.html'
})
export class PlayQueueComponent implements OnInit {
  coverSize = ImageSizes.Medium;

  @Input()
  public playQueue: PlayQueue<PlayQueueItem>;

  constructor(private userAnalyticsService: UserAnalyticsService) {
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

  ngOnInit() {
    this.playQueue.on('add', (playQueueItem: PlayQueueItem) => {
      if (playQueueItem.isQueued()) {
        this.userAnalyticsService.trackEvent('queue_track', 'add', 'app-play-queue');
      }
    });
  }
}
