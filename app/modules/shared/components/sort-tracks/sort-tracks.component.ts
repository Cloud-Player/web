import {Component, Input} from '@angular/core';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';
import './sort-tracks.style.scss';

@Component({
  selector: 'sort-tracks',
  template: require('./sort-tracks.template.html'),
  styleUrls: ['/sort-tracks.style.css']
})
export class SortTracksComponent {

  @Input() tracks: Tracks<Track>;

}
