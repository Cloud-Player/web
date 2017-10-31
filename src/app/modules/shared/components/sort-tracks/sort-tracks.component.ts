import {Component, Input} from '@angular/core';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';

@Component({
  selector: 'app-sort-tracks',
  styleUrls: ['./sort-tracks.style.scss'],
  templateUrl: './sort-tracks.template.html'
})
export class SortTracksComponent {

  @Input() tracks: Tracks<Track>;

}
