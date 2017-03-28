import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';

@Component({
  selector: 'track-cover',
  styles: [require('./track-cover.style.scss')],
  template: require('./track-cover.template.html')
})

export class TrackCoverComponent {
  @Input()
  public track: Track;
}
