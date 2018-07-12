import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistAuxappModel} from '../../../api/playlists/playlist-auxapp.model';
import {PlaylistSoundcloudModel} from '../../../api/playlists/playlist-soundcloud.model';
import {PlaylistYoutubeModel} from '../../../api/playlists/playlist-youtube.model';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
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
    auxapp: PlaylistAuxappModel,
    soundcloud: PlaylistSoundcloudModel,
    youtube: PlaylistYoutubeModel
  };
  private authenticatedUser: AuthenticatedUserModel;
  public playlist: IPlaylist;
  public playlists: IPlaylists<IPlaylist>;
  public tracks: Array<ITrack>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userAnalyticsService: UserAnalyticsService) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  private fetchPlaylist() {
    this.playlist.singletonFetch().then(() => {
      this.playlist.items.fetch();
    });
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

  public deleteItem(item: IPlaylistItem) {
    item.destroy().then(() => {
      this.userAnalyticsService.trackEvent('playlist', 'delete_item', 'app-play-list-view');
    }, () => {
      this.userAnalyticsService.trackEvent('playlist', 'delete_item:error', 'app-play-list-view');
    });
  }

  public delete() {
    const userPlaylists = this.playlists;
    const indexOfPlaylist = userPlaylists.indexOf(this.playlist);
    let otherPlaylistId: number;

    this.playlist.destroy().then(() => {
      if (userPlaylists.at(indexOfPlaylist)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist).id;
      } else if (userPlaylists.at(indexOfPlaylist - 1)) {
        otherPlaylistId = userPlaylists.at(indexOfPlaylist - 1).id;
      }

      this.userAnalyticsService.trackEvent('playlist', 'delete', 'app-play-list-view');
      this.router.navigateByUrl('/me/playlists');
    }, () => {
      this.userAnalyticsService.trackEvent('playlist', 'delete:error', 'app-play-list-view');
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.setPlaylist(params.id, params.provider);
    });
    this.playlist.items.on('sync', this.setTracks.bind(this));
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
