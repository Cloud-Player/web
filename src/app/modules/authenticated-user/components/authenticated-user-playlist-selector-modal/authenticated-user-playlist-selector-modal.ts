import {Component, Input, OnInit} from '@angular/core';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {Subscription} from 'rxjs/Subscription';
import {IModal, IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {IPlaylistItems} from '../../../api/playlists/playlist-item/playlist-items.interface';
import {IPlaylist} from '../../../api/playlists/playlist.interface';

@Component({
  selector: 'app-authenticated-user-playlist-selector-modal',
  styleUrls: ['./authenticated-user-playlist-selector-modal.scss'],
  templateUrl: './authenticated-user-playlist-selector-modal.html'
})
export class AuthenticatedUserPlaylistSelectorModalComponent implements OnInit, IModalComponent {
  private _subscription: Subscription;
  private _modal: IModal;
  public modalOptions: IModalOptions;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;
  public selectedAccount: IAuthenticatedUserAccount;

  @Input()
  track: ITrack;

  constructor() {
    this.accounts = AuthenticatedUserModel.getInstance().accounts;
    this._subscription = new Subscription();
    this.modalOptions = {
      title: 'Select a playlist',
      dismissible: true,
      secondaryAction: {
        text: 'Cancel'
      }
    };
  }

  public selectTab(tabPane: TabPaneComponent) {
    this.selectedAccount = this.accounts.getAccountForProvider(tabPane.id);

    if (this.selectedAccount && this.selectedAccount.playlists.length === 0) {
      this.selectedAccount.playlists.fetch();
    }
  }

  public addTrackTo(playlist: IPlaylist) {
    const playlistItem = playlist.items.add({track: this.track});
    playlistItem.save();
    this._modal.hide();
  }

  public getAccounts() {
    const accounts = [];
    if (this.track) {
      this.accounts.each((account) => {
        if (account.provider === this.track.provider || account.provider === 'cloudplayer') {
          accounts.push(account);
        }
      });
    }
    return accounts;
  }

  setModal(modal: IModal) {
    this._modal = modal;
  }

  ngOnInit(): void {
    this.selectedAccount = this.accounts.getAccountForProvider('cloudplayer');
  }
}
