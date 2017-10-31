import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {SoundcloudImageModel} from '../../models/soundcloud-image.model';

export enum CoverSizes {
  Small,
  Medium,
  Regular,
  Large
}

@Component({
  selector: 'track-cover',
  styles: [require('./track-cover.style.scss')],
  template: require('./track-cover.template.html')
})

export class TrackCoverComponent {
  @Input()
  public track: Track;

  @Input()
  public size: CoverSizes;

  @Input()
  public animate: boolean = false;

  private getArtworkUrl(): string {
    if(this.track){
      let artwork: SoundcloudImageModel = this.track.get('artwork_url');
      let artworkUrl: string;
      switch (this.size) {
        case CoverSizes.Small:
          artworkUrl = artwork.getSmallSize();
          break;
        case CoverSizes.Medium:
          artworkUrl = artwork.getMediumSize();
          break;
        case CoverSizes.Large:
          artworkUrl = artwork.getLargeSize();
          break;
        case CoverSizes.Regular:
          artworkUrl = artwork.getDefaultSize();
          break;
      }
      return artworkUrl;
    }
  }
}
