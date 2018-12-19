import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {Subscription} from 'rxjs';
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
export class AuthenticatedUserPlaylistSelectorModalComponent implements OnInit, IModalComponent {
  private _subscription: Subscription;
  private _modal: IModal;
  private _createNewPlaylistModal: Modal<AuthenticatedUserPlaylistFormComponent>;
  public modalOptions: IModalOptions;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;
  public selectedAccount: IAuthenticatedUserAccount;
  public applicableAccounts: Array<IAuthenticatedUserAccount>;
  public account: IAuthenticatedUserAccount;

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

  public addTrackTo(playlist: IPlaylist) {
    const playlistItem = playlist.items.add({track: this.track.clone()});
    playlistItem.save().then(
      () => {
        this.userAnalyticsService.trackEvent(
          'playlist',
          `${playlistItem.type}:add:${this.track.provider_id}`,
          'app-authenticated-user-playlist-selector-modal');
      }, () => {
        this.userAnalyticsService.trackEvent(
          'playlist',
          `${playlistItem.type}:add_error:${this.track.provider_id}`,
          'app-authenticated-user-playlist-selector-modal');
      }
    );
    this._modal.hide();
  }

  public createNewPlaylist() {
    this._createNewPlaylistModal.getInstance().account = this.account;
    this._createNewPlaylistModal.getInstance().setPlaylistFromProvider(this.account.provider);
    this._createNewPlaylistModal.open();
  }

  ngOnInit(): void {
    this.account = this.accounts.getAccountForProvider('auxapp');
    this.account.playlists.fetch();
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
