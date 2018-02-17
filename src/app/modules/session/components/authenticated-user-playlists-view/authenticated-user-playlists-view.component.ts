import {Component, OnInit} from '@angular/core';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {IPlaylistItems} from '../../../api/playlists/playlist-item/playlist-items.interface';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';
import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';

@Component({
  selector: 'app-authenticated-user-playlists-view',
  styleUrls: ['./authenticated-user-playlists-view.style.scss'],
  templateUrl: './authenticated-user-playlists-view.template.html'
})
export class AuthenticatedUserPlaylistsViewComponent implements OnInit {
  private _selectedAccount: IAuthenticatedUserAccount;
  private _playQueue: PlayQueue<PlayQueueItem>;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;

  constructor() {
    this.accounts = AuthenticatedUserModel.getInstance().accounts;
    this._playQueue = PlayQueue.getInstance();
  }

  public selectTab(tabPane: TabPaneComponent) {
    this._selectedAccount = this.accounts.getAccountForProvider(tabPane.id);

    if (this._selectedAccount && this._selectedAccount.playlists.length === 0) {
      this._selectedAccount.playlists.fetch();
    }
  }

  public playPlaylistItems(playlistItems: IPlaylistItems<IPlaylistItem>) {
    this._playQueue.reset();
    playlistItems.each((item: IPlaylistItem) => {
      this._playQueue.add({track: item.track});
    });

    this._playQueue.first().play();
  }

  public play(playlist: IPlaylist) {
    if (playlist.items.length > 0) {
      this.playPlaylistItems(playlist.items);
    } else {
      playlist.items.fetch().then(() => {
        this.playPlaylistItems(playlist.items);
      });
    }
  }

  ngOnInit(): void {
    this._selectedAccount = this.accounts.getAccountForProvider('cloudplayer');
  }
}
