import {Component, Input} from '@angular/core';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';

@Component({
  selector: 'app-sort-tracks',
  styleUrls: ['./sort-tracks.style.scss'],
  templateUrl: './sort-tracks.template.html'
})
export class SortTracksComponent {

  @Input() tracks: ITracks<ITrack>;

}
