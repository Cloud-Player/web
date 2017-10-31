import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';
import {CoverSizes} from '../track-cover/track-cover.component';
import {ClientDetector} from '../../services/client-detector.service';

@Component({
  selector: 'track-list',
  styles: [require('./track-list.style.scss')],
  template: require('./track-list.template.html'),
  providers: [Tracks]
})
export class TrackListComponent {

  @Input() tracks: Tracks<Track>;

  @Input() canBeDeleted: boolean;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  constructor(private router: Router) {
  }

  gotoDetail(track: Track): void {
    let link = ['/tracks', track.id];
    this.router.navigate(link);
  }

  addToQueue(track: Track) {
    this.playQueue.queue({track: track});
  }

  getSize() {
    if (ClientDetector.isMobileDevice()) {
      return CoverSizes.Small;
    } else {
      return CoverSizes.Regular;
    }
  }
}
