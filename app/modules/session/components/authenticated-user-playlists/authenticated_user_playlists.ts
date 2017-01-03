import {Component} from '@angular/core';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  moduleId: module.id,
  selector: 'authenticated-user-playlists',
  templateUrl: 'authenticated_user_playlists.html',
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
    this.user.on('change:authenticated', this.fetchPlaylist);
    this.fetchPlaylist();
  };

  save(): void {
    let newPlaylist = this.user.get('playlists').add(this.tmpPlaylist.toJSON());
    newPlaylist.save().then(() => {
      this.tmpPlaylist.clear();
    });
  }
}
