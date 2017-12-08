import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {CoverSizes} from '../track-cover/track-cover.component';
import {ClientDetector} from '../../services/client-detector.service';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {PlayQueue} from '../../../player/collections/play-queue';

@Component({
  selector: 'app-track-list',
  styleUrls: ['./track-list.style.scss'],
  templateUrl: './track-list.template.html'
})
export class TrackListComponent {

  @Input() tracks: Tracks<Track>;

  @Input() canBeDeleted: boolean;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  constructor(private router: Router) {
  }

  gotoDetail(track: Track): void {
    const link = ['/tracks', track.id];
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
