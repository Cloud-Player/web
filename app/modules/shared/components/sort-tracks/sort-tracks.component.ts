import {Component, Input} from '@angular/core';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';

@Component({
  moduleId: module.id,
  selector: 'sort-tracks',
  templateUrl: 'sort-tracks.template.html',
  styleUrls: ['sort-tracks.style.css']
})
export class SortTracksComponent {

  @Input() tracks: Tracks<Track>;

}
