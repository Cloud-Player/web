import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {AuthenticatedUserPlaylistsYoutubeCollection} from '../playlist/authenticated-user-playlists-youtube.collection';
import {AuthenticatedUserPlaylistYoutubeModel} from '../playlist/authenticated-user-playlist-youtube.model';
import {AuthenticatedUserPlaylistAuxappModel} from '../playlist/authenticated-user-playlist-auxapp.model';
import {FavouriteTracksYoutubeModel} from '../../favourite-tracks/favourite-tracks-youtube.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AccountDeezerModel} from '../../account/account-deezer.model';
import {AuthenticatedUserPlaylistsDeezerCollection} from '../playlist/authenticated-user-playlists-deezer.collection';
import {AuthenticatedUserPlaylistDeezerModel} from '../playlist/authenticated-user-playlist-deezer.model';

export class AuthenticatedUserAccountDeezerModel
  extends AccountDeezerModel implements IAuthenticatedUserAccount {
  public loginUrl = `${this.hostName()}/deezer`;

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylistsDeezerCollection<AuthenticatedUserPlaylistDeezerModel>;

  @attributesKey('favouriteTracks')
  @nested()
  favouriteTracks: FavouriteTracksYoutubeModel;

  @attributesKey('connected')
  @defaultValue(false)
  connected: boolean;

  initialize(): void {
    if (this.id) {
      this.playlists.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.playlists.setEndpoint(this.id);
      //this.favouriteTracks.setEndpoint(this.id);
    });
  }

  parse(attrs: any) {
    if (attrs.items && attrs.items.length > 0) {
      return super.parse(attrs.items[0]);
    } else {
      if (attrs.image) {
        attrs.image = {
          small: {url: attrs.image.small},
          medium: {url: attrs.image.medium},
          high: {url: attrs.image.large}
        };
      }
      return attrs;
    }
  }

  createNewPlaylist(title: string, isPublic: boolean = false) {
    const playlist = new AuthenticatedUserPlaylistAuxappModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    this.playlists.add(playlist);
    return playlist.save();
  }

  isConnected() {
    return this.connected && !this.isNew();
  }
}
