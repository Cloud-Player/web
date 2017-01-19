import {Component} from '@angular/core';
import {AuthenticatedUserPlaylists} from '../authenticated-user-playlists/authenticated_user_playlists';

@Component({
  moduleId: module.id,
  selector: 'authenticated-user-playlists-view',
  templateUrl: 'authenticated-user-playlists-view.template.html',
  styleUrls: ['authenticated-user-playlists-view.style.css']
})
export class AuthenticatedUserPlaylistsViewComponent extends AuthenticatedUserPlaylists {
}
