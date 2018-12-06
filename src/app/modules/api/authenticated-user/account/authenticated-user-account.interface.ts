import {IAccount} from '../../account/account.interface';
import {IPlaylist} from '../../playlists/playlist.interface';
import {ITracks} from '../../tracks/tracks.interface';
import {ITrack} from '../../tracks/track.interface';
import {IPlaylists} from '../../playlists/playlists.interface';
import {IFavouriteTracks} from '../../favourite-tracks/favourite-tracks.interface';

export interface IAuthenticatedUserAccount extends IAccount {
  loginUrl: string;
  playlists: IPlaylists<IPlaylist>;
  tracks: ITracks<ITrack>;
  favouriteTracks: IFavouriteTracks;
  connected: boolean;
  isConnected(): boolean;
}
