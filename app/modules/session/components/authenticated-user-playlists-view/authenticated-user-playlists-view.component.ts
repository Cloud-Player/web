import {Component} from '@angular/core';
import {AuthenticatedUserPlaylists} from '../authenticated-user-playlists/authenticated_user_playlists';

@Component({
  selector: 'authenticated-user-playlists-view',
  template: require('./authenticated-user-playlists-view.template.html'),
  styles: [require('./authenticated-user-playlists-view.style.scss')]
})
export class AuthenticatedUserPlaylistsViewComponent extends AuthenticatedUserPlaylists {
}
