import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IFavouriteTracks} from '../../../api/favourite-tracks/favourite-tracks.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';
import {FavouriteTracksAuxappModel} from '../../../api/favourite-tracks/favourite-tracks-auxapp.model';
import {AuthenticatedUserAccountAuxappModel} from '../../../api/authenticated-user/account/authenticated-user-account-auxapp.model';
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
  private _auxappFavouriteTracks: FavouriteTracksAuxappModel;
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
      this._authenticatedUser.accounts.getAccountForProvider('auxapp').isConnected()
    );
  }

  hasLikedTrack(): boolean {
    if (this._auxappFavouriteTracks) {
      return this._auxappFavouriteTracks.trackIsFavourited(this.track);
    }
    return false;
  }

  like(): void {
    if (!this.hasLikedTrack() && this._auxappFavouriteTracks) {
      const favouriteTrack = this._auxappFavouriteTracks.items.add({
        track: this.track.clone()
      });
      favouriteTrack.save().then(() => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrack.type}:like_${this.track.provider_id}`,
          'app-option-btn');
      }, () => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrack.type}:like_error:${this.track.provider_id}`,
          'app-option-btn');
      });
    }
  }

  dislike(): void {
    const favouriteTrackItem = <IFavouriteTrackItem>this._auxappFavouriteTracks.items.find((item: IPlaylistItem) => {
      return item.track.id === this.track.id;
    });
    if (favouriteTrackItem && !favouriteTrackItem.isNew()) {
      favouriteTrackItem.destroy().then(() => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrackItem.type}:dislike_${this.track.provider_id}`,
          'app-option-btn');
      }, () => {
        this.userAnalyticsService.trackEvent(
          'toggle_like',
          `${favouriteTrackItem.type}:dislike_error:${this.track.provider_id}`,
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

  ngOnInit() {
    const auxappAccount = this._authenticatedUser.accounts.getAccountForProvider('auxapp');
    if (auxappAccount && auxappAccount instanceof AuthenticatedUserAccountAuxappModel) {
      this._auxappFavouriteTracks = auxappAccount.favouriteTracks;
    }
    this._auxappFavouriteTracks.items.on('add remove reset', this._debouncedUpdate, this);
    this._authenticatedUser.accounts.getAccountForProvider('auxapp').on('change:connected', this._debouncedUpdate, this);
  }

  ngOnDestroy() {
    this._isDestroyed = true;
    this._auxappFavouriteTracks.items.off('add remove reset', this._debouncedUpdate, this);
  }

}
