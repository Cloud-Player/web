import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IFavouriteTracks} from '../../../api/favourite-tracks/favourite-tracks.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';
import {FavouriteTracksCloudplayerModel} from '../../../api/favourite-tracks/favourite-tracks-cloudplayer.model';
import {AuthenticatedUserAccountCloudplayerModel} from '../../../api/authenticated-user/account/authenticated-user-account-cloudplayer.model';
import {debounce} from 'underscore';
import {IFavouriteTrackItem} from '../../../api/favourite-tracks/favourite-track-item/favourite-track-item.interface';

@Component({
  selector: 'app-toggle-liked-track',
  styleUrls: ['./toggle-liked-track.scss'],
  templateUrl: './toggle-liked-track.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleLikedTrackComponent implements OnInit, OnDestroy {
  private _authenticatedUser: AuthenticatedUserModel;
  private _favouriteTracksPerProvider: Array<IFavouriteTracks>;
  private _cloudPlayerFavouriteTracks: FavouriteTracksCloudplayerModel;
  private _debouncedUpdate: Function;
  private _isDestroyed = false;

  @Input() track: ITrack;

  constructor(private userAnalyticsService: UserAnalyticsService, private cdr: ChangeDetectorRef) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this._debouncedUpdate = debounce(this.update, 10);
  }

  private update() {
    // The method is called debounced which can not be terminated. When the view is destroyed
    // the method might be called again even though the view is not available anymore
    if (!this._isDestroyed) {
      this.cdr.detectChanges();
    }
  }

  canLikeTrack(): boolean {
    return (
      this._authenticatedUser.accounts.getAccountForProvider('cloudplayer').isConnected() && //FIXME remove this after migration to new API
      this._authenticatedUser.canCreateCloudPlayerData()
    );
  }

  hasLikedTrack(): boolean {
    if (this._cloudPlayerFavouriteTracks) {
      return this._cloudPlayerFavouriteTracks.trackIsFavourited(this.track);
    }
    return false;
  }

  like(): void {
    if (!this.hasLikedTrack()) {
      this._favouriteTracksPerProvider.forEach((favouriteTracks: IFavouriteTracks) => {
        const favouriteTrack = favouriteTracks.items.add({
          track: this.track.clone()
        });
        favouriteTrack.save().then(() => {
          this.userAnalyticsService.trackEvent(
            'toggle_like',
            `${favouriteTrack.type}:like_${this.track.provider}`,
            'app-option-btn');
        }, () => {
          this.userAnalyticsService.trackEvent(
            'toggle_like',
            `${favouriteTrack.type}:like_error:${this.track.provider}`,
            'app-option-btn');
        });
      });
    }
  }

  dislike(): void {
    const favouriteTrack = <IFavouriteTrackItem>this._cloudPlayerFavouriteTracks.items.find((item: IPlaylistItem) => {
      return item.track.id === this.track.id;
    });
    if (favouriteTrack) {
      favouriteTrack.destroy().then(() => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrack.type}:dislike_${this.track.provider}`,
          'app-option-btn');
      }, () => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrack.type}:dislike_error:${this.track.provider}`,
          'app-option-btn');
      });
    }
  }

  toggleLike(): void {
    if (!this.hasLikedTrack()) {
      this.like();
    } else {
      this.dislike();
    }
  }

  canBeUsed(): boolean {
    return this._authenticatedUser.isConnectedWith3rdParty();
  }

  ngOnInit() {
    const providerAccount = this._authenticatedUser.accounts.getAccountForProvider(this.track.provider);
    const cloudplayerAccount = this._authenticatedUser.accounts.getAccountForProvider('cloudplayer');
    this._favouriteTracksPerProvider = [];
    if (providerAccount && providerAccount.isConnected()) {
      this._favouriteTracksPerProvider.push(providerAccount.favouriteTracks);
    }
    if (cloudplayerAccount && cloudplayerAccount instanceof AuthenticatedUserAccountCloudplayerModel) {
      this._cloudPlayerFavouriteTracks = cloudplayerAccount.favouriteTracks;
      this._favouriteTracksPerProvider.push(cloudplayerAccount.favouriteTracks);
    }
    this._cloudPlayerFavouriteTracks.items.on('add remove reset', this._debouncedUpdate, this);
  }

  ngOnDestroy() {
    this._isDestroyed = true;
    this._cloudPlayerFavouriteTracks.items.off('add remove reset', this._debouncedUpdate, this);
  }

}
