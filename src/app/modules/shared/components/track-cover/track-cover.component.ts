import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track';
import {ImageSizes} from '../../src/image-sizes.enum';

@Component({
  selector: 'app-track-cover',
  styleUrls: ['./track-cover.style.scss'],
  templateUrl: './track-cover.template.html'
})

export class TrackCoverComponent {
  @Input()
  public track: Track;

  @Input()
  public size: ImageSizes;

  @Input()
  public animate = false;

  public getArtworkUrl(): string {
    if (this.track) {
      return this.track.image.getImageBySize(this.size);
    }
  }
}
