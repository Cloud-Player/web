import {Component, EventEmitter, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {Playlists} from '../../../playlists/collections/playlists.collection';
import {Playlist} from '../../../playlists/models/playlist.model';
import {AuthenticatedUserPlaylistTrack} from '../../models/authenticated_user_playlist_track.model';
import {ToastModel} from '../../../shared/models/toast';
import {ToastService} from '../../../shared/services/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';

@Component({
  selector: 'app-authenticated-user-playlists',
  styleUrls: ['./authenticated_user_playlists.style.scss'],
  templateUrl: './authenticated_user_playlists.template.html'
})
export class AuthenticatedUserPlaylistsComponent implements OnInit {
  private session = Session.getInstance();

  private valueChange = new EventEmitter();

  private isFetching = false;

  public user = this.session.user;

  public isInCreationMode = false;

  public tmpPlaylist = new AuthenticatedUserPlaylist();

  public dropTrack = (dropData: any, playlist: AuthenticatedUserPlaylist): void => {
    if (dropData.provider === 'SOUNDCLOUD') {
      this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'menu-playlist-bar');
      playlist.tracks.create(new AuthenticatedUserPlaylistTrack(dropData));
    } else {
      const toast = new ToastModel();
      toast.type = ToastTypes.Info;
      toast.message = 'You can not drag a YouTube track into SoundCloud playlist';
      this.toastService.addToast(toast);
      this.userAnalyticsService.trackEvent('drop_track_err', 'drag-and-drop', 'menu-playlist-bar');
    }
  }

  constructor(private userAnalyticsService: UserAnalyticsService, private toastService: ToastService) {
  }

  private fetchPlaylists(): void {
    if (this.user.authenticated && !this.isFetching) {
      this.isFetching = true;
      this.user.playlists.fetch().then(() => {
        this.isFetching = false;
        this.valueChange.emit();
      });
    }
  }

  ngOnInit(): void {
    this.user.on('change:authenticated', this.fetchPlaylists.bind(this));
    this.fetchPlaylists();
  }

  save(): void {
    const newPlaylist = this.user.playlists.add(this.tmpPlaylist.toJSON());
    newPlaylist.save().then(() => {
      this.tmpPlaylist.clear();
    });
  }


  cancel(): void {
    if (!this.tmpPlaylist.title || this.tmpPlaylist.title.length < 1) {
      this.isInCreationMode = false;
    }
  }

  addNewPlaylist(): void {
    this.isInCreationMode = true;
  }

  createPlaylist(): void {
    this.userAnalyticsService.trackEvent('created_playlist', 'click', 'menu-playlist-bar');
    this.user.playlists.create(this.tmpPlaylist.toJSON(), <any>{at: 0});
    this.isInCreationMode = false;
    this.tmpPlaylist.clear();
  }

  isAuthenticated(): boolean {
    return this.session.user.authenticated;
  }
}
