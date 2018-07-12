import {Component, Input} from '@angular/core';
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
