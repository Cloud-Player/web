import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {CoverSizes} from '../../../shared/components/track-cover/track-cover.component';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'play-queue',
  styles: [ require('./playqueue.style.scss') ],
  template: require('./playqueue.template.html')
})
export class PlayQueueComponent {
  private playQueue: PlayQueue<PlayQueueItem>;

  private coverSize = CoverSizes.Medium;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.playQueue = PlayQueue.getInstance();

    this.playQueue.on('add',(playQueueItem: PlayQueueItem)=>{
      if(playQueueItem.isQueued()){
        this.userAnalyticsService.trackEvent('queue_track', 'add', 'play-queue');
      }
    })
  }

  dropTrack = (dropData: {}) => {
    this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'play-queue');
    if(this.playQueue.length>0){
      this.playQueue.queue({track: dropData});
    } else {
      this.playQueue.addAndPlay({track: dropData});
    }
  }
}
