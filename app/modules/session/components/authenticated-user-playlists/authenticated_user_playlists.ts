import {Component, ViewChild, ElementRef, EventEmitter} from '@angular/core';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'authenticated-user-playlists',
  styles: [require('./authenticated_user_playlists.style.scss')],
  template: require('./authenticated_user_playlists.template.html'),
})
export class AuthenticatedUserPlaylists {
  private session = Session.getInstance();

  private user = this.session.get('user');

  private valueChange = new EventEmitter();

  private isFetching: boolean = false;

  public isInCreationMode: boolean = false;

  public tmpPlaylist = new AuthenticatedUserPlaylist();

  constructor(private userAnalyticsService: UserAnalyticsService){
  }

  private fetchPlaylists(): void {
    if (this.user.get('authenticated') && !this.isFetching) {
      this.isFetching = true;
      this.user.get('playlists').fetch().then(()=>{
        this.isFetching = false;
        this.valueChange.emit();
      });
    }
  };

  ngOnInit(): void {
    this.user.on('change:authenticated', this.fetchPlaylists.bind(this));
    this.fetchPlaylists();
  };

  save(): void {
    let newPlaylist = this.user.get('playlists').add(this.tmpPlaylist.toJSON());
    newPlaylist.save().then(() => {
      this.tmpPlaylist.clear();
    });
  }

  dropTrack(dropData: {}, playlist: AuthenticatedUserPlaylist): void {
    this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'menu-playlist-bar');
    playlist.get('tracks').create(dropData);
  }

  cancel(): void {
    if (!this.tmpPlaylist.get('title') || this.tmpPlaylist.get('title').length < 1) {
      this.isInCreationMode = false;
    }
  }

  addNewPlaylist(): void {
    this.isInCreationMode = true;
  }

  createPlaylist(): void {
    this.userAnalyticsService.trackEvent('created_playlist', 'click', 'menu-playlist-bar');
    this.user.get('playlists').create(this.tmpPlaylist.toJSON(), {at: 0});
    this.isInCreationMode = false;
    this.tmpPlaylist.clear();
  }

  isAuthenticated(): boolean{
    return this.session.get('user').get('authenticated');
  }
}
