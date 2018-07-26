import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {AuthenticatedUserAccountsCollection} from '../../../api/authenticated-user/account/authenticated-user-accounts.collection';
import {TabPaneComponent} from '../../../shared/components/tab-pane/tab-pane';
import {ITrack} from '../../../api/tracks/track.interface';
import {IFavouriteTrackItems} from '../../../api/favourite-tracks/favourite-track-item/favourite-track-items.interface';
import {IFavouriteTrackItem} from '../../../api/favourite-tracks/favourite-track-item/favourite-track-item.interface';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {ExternalUserAuthenticator, ExternalUserConnectState} from '../../services/external-authenticator.class';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-favourite-tracks-view',
  styleUrls: ['./favorite-tracks-view.scss'],
  templateUrl: './favourite-tracks-view.html'
})

export class FavouriteTracksViewComponent implements OnInit, OnDestroy {
  private _selectedAccount: IAuthenticatedUserAccount;
  private _subscription: Subscription;
  public availableProviderMap = ProviderMap.map;
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;
  public tracks: Array<ITrack>;

  constructor(private externalUserAuthenticator: ExternalUserAuthenticator) {
    this.accounts = AuthenticatedUserModel.getInstance().accounts;
    this._subscription = new Subscription();
    this.tracks = [];
  }

  private setTracks(items: IFavouriteTrackItems<IFavouriteTrackItem>) {
    this.tracks = items.pluck('track');
  }

  private addSetTracksListener() {
    this._selectedAccount.favouriteTracks.items.on(
      'update reset',
      this.setTracks,
      this
    );
  }

  private removeSetTracksListener() {
    this.accounts.forEach((accountForProvider) => {
      accountForProvider.favouriteTracks.items.off(
        'update reset',
        this.setTracks,
        this
      );
    });
  }

  public selectTab(tabPane: TabPaneComponent) {
    this._selectedAccount = this.accounts.getAccountForProvider(tabPane.id);

    this.removeSetTracksListener();
    this.addSetTracksListener();

    if (this._selectedAccount) {
      this._selectedAccount.favouriteTracks.items.singletonFetch();
    }

    this.setTracks(this._selectedAccount.favouriteTracks.items);
  }

  public deleteTrack(track: ITrack) {
    if (this._selectedAccount) {
      const favItems = this._selectedAccount.favouriteTracks.items.filter((item: IFavouriteTrackItem) => {
        return item.track === track;
      });
      favItems.forEach((favItem) => {
        favItem.destroy();
      });
    }
  }

  public connect(account: IAuthenticatedUserAccount) {
    this.externalUserAuthenticator.connect(account);
  }

  public isSyncing(): boolean {
    if (this._selectedAccount) {
      return this._selectedAccount.favouriteTracks.items.isSyncing;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this._selectedAccount = this.accounts.getAccountForProvider('auxapp');
    const authSubscription = this.externalUserAuthenticator.getObservable()
      .pipe(
        filter(state => state === ExternalUserConnectState.Success)
      )
      .subscribe(() => {
        this._selectedAccount.favouriteTracks.items.singletonFetch();
      });
    this._subscription.add(authSubscription);
    this.addSetTracksListener();
  }

  ngOnDestroy(): void {
    this.removeSetTracksListener();
    this._subscription.unsubscribe();
  }
}
