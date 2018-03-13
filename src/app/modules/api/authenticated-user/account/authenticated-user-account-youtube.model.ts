import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {AccountYoutubeModel} from '../../account/account-youtube.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {AuthenticatedUserPlaylistsYoutubeCollection} from '../playlist/authenticated-user-playlists-youtube.collection';
import {AuthenticatedUserPlaylistYoutubeModel} from '../playlist/authenticated-user-playlist-youtube.model';
import {AuthenticatedUserPlaylistCloudplayerModel} from '../playlist/authenticated-user-playlist-cloudplayer.model';
import {FavouriteTracksYoutubeModel} from '../../favourite-tracks/favourite-tracks-youtube.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserAccountYoutubeModel
  extends AccountYoutubeModel implements IAuthenticatedUserAccount {
  public loginUrl = `${this.hostName()}/youtube`;

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylistsYoutubeCollection<AuthenticatedUserPlaylistYoutubeModel>;

  @attributesKey('favouriteTracks')
  @nested()
  favouriteTracks: FavouriteTracksYoutubeModel;

  @attributesKey('connected')
  @defaultValue(false)
  connected: boolean;

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
    const playlist = new AuthenticatedUserPlaylistCloudplayerModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    this.playlists.add(playlist);
    return playlist.save();
  }

  isConnected(){
    return this.connected && !this.isNew();
  }
}
