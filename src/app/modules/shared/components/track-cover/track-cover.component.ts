import {Component, Input} from '@angular/core';
import {ImageSizes} from '../../src/image-sizes.enum';
import {ITrack} from '../../../api/tracks/track.interface';

@Component({
  selector: 'app-track-cover',
  styleUrls: ['./track-cover.style.scss'],
  templateUrl: './track-cover.template.html'
})

export class TrackCoverComponent {
  @Input()
  public track: ITrack;

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
