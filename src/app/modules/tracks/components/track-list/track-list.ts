import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {PlayQueue} from '../../../player/collections/play-queue';
import {Tracks} from '../../collections/tracks';
import {Track} from '../../models/track';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';

@Component({
  selector: 'app-track-list',
  styleUrls: ['./track-list.scss'],
  templateUrl: './track-list.html'
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
      return ImageSizes.Small;
    } else {
      return ImageSizes.Medium;
    }
  }
}
