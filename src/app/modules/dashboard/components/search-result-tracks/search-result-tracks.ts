import {Component, ContentChild, ElementRef, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {FilterFormComponent} from '../filter-form/filter-form';

@Component({
  selector: 'app-search-result-tracks',
  styleUrls: ['./search-result-tracks.scss'],
  templateUrl: './search-result-tracks.html'
})
export class SearchResultTracksComponent {
  private _playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  public showFilter = false;

  @Input()
  public tracks: ITracks<ITrack>;

  @Input()
  public canBeDeleted: boolean;

  constructor(private router: Router) {
  }

  public toggleFilter() {
    this.showFilter = !this.showFilter;
    if (!this.showFilter) {
      this.tracks.trigger('reset:filter');
    }
  }

  public gotoDetail(track: ITrack): void {
    const link = ['/tracks', track.id];
    this.router.navigate(link);
  }

  public addToQueue(track: ITrack) {
    this._playQueue.queue({track: track});
  }

  public getSize() {
    if (ClientDetector.isMobileDevice()) {
      return ImageSizes.Small;
    } else {
      return ImageSizes.Medium;
    }
  }
}
