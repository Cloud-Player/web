import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistCloudplayerModel} from '../../../api/playlists/playlist-cloudplayer.model';
import {PlaylistSoundcloudModel} from '../../../api/playlists/playlist-soundcloud.model';
import {PlaylistYoutubeModel} from '../../../api/playlists/playlist-youtube.model';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAccount} from '../../../api/account/account.interface';
import {IPlaylists} from '../../../api/playlists/playlists.interface';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {IPlaylistItems} from '../../../api/playlists/playlist-item/playlist-items.interface';
import {IPlaylistItem} from '../../../api/playlists/playlist-item/playlist-item.interface';

@Component({
  selector: 'app-play-list-view',
  styleUrls: ['./playlist-view.style.scss'],
  templateUrl: './playlist-view.template.html'
})

export class PlayListViewComponent implements OnInit, OnDestroy {
  private _providerPlaylistModelMap = {
    cloudplayer: PlaylistCloudplayerModel,
    soundcloud: PlaylistSoundcloudModel,
    youtube: PlaylistYoutubeModel
  };
  private authenticatedUser: AuthenticatedUserModel;
  public playlist: IPlaylist;
  public playlists: IPlaylists<IPlaylist>;
  public isInEditMode = false;
  public tracks: Array<ITrack>;

  constructor(private route: ActivatedRoute, private router: Router, private userAnalyticsService: UserAnalyticsService) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  private fetchPlaylist() {
    if (this.playlist.items.length === 0) {
      this.playlist.fetch().then(() => {
        if (this.playlist.items.length === 0) {
          this.playlist.items.fetch();
        }
      });
    }
  }

  private setTracks(items: IPlaylistItems<IPlaylistItem>) {
    this.tracks = items.pluck('track');
  }

  private setPlaylist(playlistId: string, provider: string) {
    const account = this.authenticatedUser.accounts.getAccountForProvider(provider);
    this.playlists = account.playlists;
    const authenticatedUserPlaylist = <IPlaylist>this.playlists.get(playlistId);
    if (authenticatedUserPlaylist) {
      this.playlist = authenticatedUserPlaylist;
    } else {
      this.playlist =
        new this._providerPlaylistModelMap[provider](
          {id: playlistId}
        );
    }
    this.playlist.items.on(
      'update reset',
      this.setTracks,
      this
    );
    this.fetchPlaylist();
    this.setTracks(this.playlist.items);
  }

  public save() {
    this.playlist.save();
    this.isInEditMode = false;
  }

  public cancel() {
    this.playlist.fetch();
    this.isInEditMode = false;
  }

  public destroy() {
    const userPlaylists = this.playlists;
    const indexOfPlaylist = userPlaylists.indexOf(this.playlist);
    let otherPlaylistId: number;

    this.playlist.destroy().then(() => {
      if (userPlaylists.at(indexOfPlaylist)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist).id;
      } else if (userPlaylists.at(indexOfPlaylist - 1)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist - 1).id;
      }

      this.userAnalyticsService.trackEvent('destroyed_playlist', 'click', 'user-playlist-cmp');

      if (otherPlaylistId) {
        this.router.navigate(['../', otherPlaylistId], {relativeTo: this.route});
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.setPlaylist(params.id, params.provider);
    });
  }

  ngOnDestroy(): void {
    if (this.playlist) {
      this.playlist.items.off(
        'update reset',
        this.setTracks,
        this
      );
    }
  }

}