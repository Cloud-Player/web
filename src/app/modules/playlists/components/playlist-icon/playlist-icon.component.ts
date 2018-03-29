import {Component, Input} from '@angular/core';
import {IPlaylist} from '../../../api/playlists/playlist.interface';

@Component({
  selector: 'app-play-list-icon',
  styleUrls: ['./playlist-icon.style.scss'],
  templateUrl: './playlist-icon.template.html'
})

export class PlayListIconComponent {

  @Input()
  playlist: IPlaylist;

  constructor() {
  }
}
