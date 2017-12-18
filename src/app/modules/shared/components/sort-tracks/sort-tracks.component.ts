import {Component, Input} from '@angular/core';
import {Tracks} from '../../../tracks/collections/tracks';
import {Track} from '../../../tracks/models/track';

@Component({
  selector: 'app-sort-tracks',
  styleUrls: ['./sort-tracks.style.scss'],
  templateUrl: './sort-tracks.template.html'
})
export class SortTracksComponent {

  @Input() tracks: Tracks<Track>;

}
