import {Component, Input} from '@angular/core';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';

@Component({
  selector: 'app-search-result-tracks',
  styleUrls: ['./search-result-tracks.scss'],
  templateUrl: './search-result-tracks.html'
})
export class SearchResultTracksComponent {
  public showFilter = false;

  @Input()
  public tracks: ITracks<ITrack>;

  constructor() {
  }

  public toggleFilter() {
    this.showFilter = !this.showFilter;
    if (!this.showFilter) {
      this.tracks.trigger('reset:filter');
    }
  }

  public getSize() {
    if (ClientDetector.isMobileDevice()) {
      return ImageSizes.Small;
    } else {
      return ImageSizes.Medium;
    }
  }
}
