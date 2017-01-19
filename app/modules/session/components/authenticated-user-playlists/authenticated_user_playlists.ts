import {Component} from '@angular/core';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  selector: 'authenticated-user-playlists',
  styles: [ require('./authenticated-user-playlists.style.scss') ],
  template: require('./authenticated_user_playlists.html'),
})
export class AuthenticatedUserPlaylists {
  private session = Session.getInstance();

  private user = this.session.get('user');

  private tmpPlaylist = new AuthenticatedUserPlaylist();

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
}
