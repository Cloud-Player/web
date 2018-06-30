import {Component, Input} from '@angular/core';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {IPlaylistItems} from '../../../api/playlists/playlist-item/playlist-items.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';

@Component({
  selector: 'app-sort-playlist-items',
  styleUrls: ['./sort-playlist-items.scss'],
  templateUrl: './sort-playlist-items.html'
})
export class SortPlaylistItemsComponent {

  @Input() playlistItems: IPlaylistItems<IPlaylistItem>;

}
