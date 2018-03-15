import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {Subscription} from 'rxjs/Subscription';
import {IModal, IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {ExternalUserAuthenticator} from '../../services/external-authenticator.class';
import {ModalService} from '../../../shared/services/modal';
import {AuthenticatedUserPlaylistFormComponent} from '../authenticated-user-form-component/authenticated-user-playlist-form';
import {Modal} from '../../../shared/src/modal-factory.class';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-authenticated-user-playlist-selector-modal',
  styleUrls: ['./authenticated-user-playlist-selector-modal.scss'],
  templateUrl: './authenticated-user-playlist-selector-modal.html'
})
export class AuthenticatedUserPlaylistSelectorModalComponent implements OnInit, OnChanges, IModalComponent {
  private _subscription: Subscription;
  private _modal: IModal;
  private _createNewPlaylistModal: Modal<AuthenticatedUserPlaylistFormComponent>;
  public modalOptions: IModalOptions;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;
  public selectedAccount: IAuthenticatedUserAccount;
  public applicableAccounts: Array<IAuthenticatedUserAccount>;

  @Input()
  track: ITrack;

  constructor(private externalUserAuthenticator: ExternalUserAuthenticator,
              private modalService: ModalService,
              private userAnalyticsService: UserAnalyticsService) {
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
    playlistItem.save().then(
      () => {
        this.userAnalyticsService.trackEvent(
          'playlist',
          `${playlistItem.type}:add:${this.track.provider}`,
          'app-authenticated-user-playlist-selector-modal');
      }, () => {
        this.userAnalyticsService.trackEvent(
          'playlist',
          `${playlistItem.type}:add_error:${this.track.provider}`,
          'app-authenticated-user-playlist-selector-modal');
      }
    );
    this._modal.hide();
  }

  public setAccounts() {
    this.applicableAccounts = [];
    if (this.track) {
      this.accounts.each((account) => {
        if (
          account.provider === this.track.provider || account.provider === 'cloudplayer'
        ) {
          this.applicableAccounts.push(account);
        }
      });
    }
  }

  public connect() {
    this.externalUserAuthenticator.connect(this.selectedAccount)
      .then(this.selectedAccount.playlists.fetch);
  }

  public createNewPlaylist() {
    this._createNewPlaylistModal.getInstance().account = this.selectedAccount;
    this._createNewPlaylistModal.getInstance().setPlaylistFromProvider(this.selectedAccount.provider);
    this._createNewPlaylistModal.open();
  }

  ngOnInit(): void {
    this.selectedAccount = this.accounts.getAccountForProvider('cloudplayer');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.track) {
      this.setAccounts();
    }
  }

  setModal(modal: IModal) {
    this._modal = modal;
  }

  modalOnOpen(): void {
    this._createNewPlaylistModal = this.modalService.createModal(AuthenticatedUserPlaylistFormComponent);
  }

  modalOnClose(): void {
    this._createNewPlaylistModal.destroy();
  }
}
