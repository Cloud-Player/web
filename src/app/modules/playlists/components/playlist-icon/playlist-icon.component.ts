import {Component, Input} from '@angular/core';

import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'app-play-list-icon',
  styleUrls: [ './playlist-icon.style.scss'],
  templateUrl: './playlist-icon.template.html'
})

export class PlayListIconComponent {

  @Input()
  playlist: Playlist;

  constructor() {
  }
}
