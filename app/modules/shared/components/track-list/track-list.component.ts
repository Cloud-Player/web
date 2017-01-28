import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
  selector: 'track-list',
  styles: [ require('./track-list.style.scss') ],
  template: require('./track-list.template.html'),
  providers: [Tracks]
})
export class TrackListComponent {

  @Input() tracks: Tracks<Track>;

  @Input() canBeDeleted: boolean;

  constructor(private router: Router) { }

  gotoDetail(track: Track): void {
    let link = ['/tracks', track.id];
    this.router.navigate(link);
  }

}
