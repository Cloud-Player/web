import {Component, ViewChild, ElementRef} from '@angular/core';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  selector: 'authenticated-user-playlists',
  styles: [require('./authenticated_user_playlists.style.scss')],
  template: require('./authenticated_user_playlists.template.html'),
})
export class AuthenticatedUserPlaylists {
  private session = Session.getInstance();

  private user = this.session.get('user');

  public isInCreationMode: boolean = false;

  public tmpPlaylist = new AuthenticatedUserPlaylist();

  private fetchPlaylist(): void {
    if (this.user.get('authenticated')) {
      this.user.get('playlists').fetch();
    }
  };

  ngOnInit(): void {
    this.user.on('change:authenticated', this.fetchPlaylist.bind(this));
    this.fetchPlaylist();
  };

  save(): void {
    let newPlaylist = this.user.get('playlists').add(this.tmpPlaylist.toJSON());
    newPlaylist.save().then(() => {
      this.tmpPlaylist.clear();
    });
  }

  dropTrack(dropData: {}, playlist: AuthenticatedUserPlaylist, event: DragEvent): void {
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
    this.user.get('playlists').create(this.tmpPlaylist.toJSON(), {at: 0});
    this.isInCreationMode = false;
    this.tmpPlaylist.clear();
  }

  isAuthenticated(): boolean{
    return this.session.get('user').get('authenticated');
  }
}
