import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {CoverSizes} from '../../../shared/components/track-cover/track-cover.component';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-play-queue',
  styleUrls: ['./playqueue.style.scss'],
  templateUrl: './playqueue.template.html'
})
export class PlayQueueComponent {
  playQueue: PlayQueue<PlayQueueItem>;
  coverSize = CoverSizes.Medium;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.playQueue = PlayQueue.getInstance();

    this.playQueue.on('add', (playQueueItem: PlayQueueItem) => {
      if (playQueueItem.isQueued()) {
        this.userAnalyticsService.trackEvent('queue_track', 'add', 'app-play-queue');
      }
    });
  }

  dropTrack = (dropData: {}) => {
    this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'app-play-queue');
    if (this.playQueue.length > 0) {
      this.playQueue.queue({track: dropData});
    } else {
      this.playQueue.addAndPlay({track: dropData});
    }
  }
}
