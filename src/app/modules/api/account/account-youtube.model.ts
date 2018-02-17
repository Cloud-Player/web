import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from '../tracks/track-youtube.model';
import {TracksYoutubeCollection} from '../tracks/tracks-youtube.collection';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';
import {PlaylistsYoutubeCollection} from '../playlists/playlists-youtube.collection';
import {PlaylistYoutubeModel} from '../playlists/playlist-youtube.model';
import {ImageYoutubeModel} from '../image/image-youtube.model';

export class AccountYoutubeModel extends YoutubeProxyModel implements IAccount {

  endpoint = '/channels';

  queryParams: {
    [key: string]: string | number | boolean
  } = {
    mine: true,
    part: 'snippet'
  };

  @attributesKey('provider')
  @defaultValue('youtube')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageYoutubeModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsYoutubeCollection<PlaylistYoutubeModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksYoutubeCollection<TrackYoutubeModel>;

  sync(method: string, model: any, options: any = {}) {
    const id = this.id;
    model.set(model.idAttribute, null);
    const sync = super.sync(method, model, options);
    model.set(model.idAttribute, id);
    return sync;
  }

  parse(attributes: any) {
    const parsedAccount: any = {
      id: attributes.id
    };

    if (attributes.snippet) {
      parsedAccount.title = attributes.snippet.title;
      parsedAccount.image = attributes.snippet.thumbnails;
    }

    return parsedAccount;
  }

  getFullName(): string {
    return this.title;
  }
}
