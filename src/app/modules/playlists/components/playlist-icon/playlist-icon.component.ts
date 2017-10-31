import {Component, OnInit, Input} from '@angular/core';

import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'play-list-icon',
  styles: [ require('./playlist-icon.style.scss') ],
  template: require('./playlist-icon.template.html')
})

export class PlayListIconComponent {

  @Input()
  playlist: Playlist;

  constructor() {
  }
}
