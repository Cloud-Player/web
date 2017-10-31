import {Component} from '@angular/core';
import {AuthenticatedUserPlaylistsComponent} from '../authenticated-user-playlists/authenticated_user_playlists';

@Component({
  selector: 'app-authenticated-user-playlists-view',
  styleUrls: ['./authenticated-user-playlists-view.style.scss'],
  templateUrl: './authenticated-user-playlists-view.template.html'
})
export class AuthenticatedUserPlaylistsViewComponent extends AuthenticatedUserPlaylistsComponent {
}
