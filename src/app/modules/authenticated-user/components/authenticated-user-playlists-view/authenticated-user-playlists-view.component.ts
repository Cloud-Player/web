import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {IPlaylistItems} from '../../../api/playlists/playlist-item/playlist-items.interface';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';
import {ExternalUserAuthenticator, ExternalUserConnectState} from '../../services/external-authenticator.class';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';

@Component({
  selector: 'app-authenticated-user-playlists-view',
  styleUrls: ['./authenticated-user-playlists-view.style.scss'],
  templateUrl: './authenticated-user-playlists-view.template.html'
})
export class AuthenticatedUserPlaylistsViewComponent implements OnInit, OnDestroy {
  private _playQueue: PlayqueueAuxappModel;
  private _subscription: Subscription;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;
  public selectedAccount: IAuthenticatedUserAccount;

  constructor(private externalUserAuthenticator: ExternalUserAuthenticator) {
    this.accounts = AuthenticatedUserModel.getInstance().accounts;
    this._playQueue = PlayqueueAuxappModel.getInstance();
    this._subscription = new Subscription();
  }

  public selectTab(tabPane: TabPaneComponent) {
    this.selectedAccount = this.accounts.getAccountForProvider(tabPane.id);

    if (this.selectedAccount && this.selectedAccount.playlists.length === 0) {
      this.selectedAccount.playlists.fetch();
    }
  }

  public playPlaylistItems(playlistItems: IPlaylistItems<IPlaylistItem>) {
    this._playQueue.items.reset();
    playlistItems.each((item: IPlaylistItem) => {
      this._playQueue.items.add({track: item.track});
    });

    this._playQueue.items.first().play();
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

  public connect(account: IAuthenticatedUserAccount) {
    this.externalUserAuthenticator.connect(account);
  }

  public canCreatePlaylist() {
    if (this.selectedAccount) {
      return this.selectedAccount.provider === 'auxapp';
    }
  }

  ngOnInit(): void {
    this.selectedAccount = this.accounts.getAccountForProvider('auxapp');
    const authSubscription = this.externalUserAuthenticator.getObservable()
      .pipe(
        filter(state => state === ExternalUserConnectState.Success)
      )
      .subscribe(() => {
        this.selectedAccount.playlists.fetch();
      });
    this._subscription.add(authSubscription);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
