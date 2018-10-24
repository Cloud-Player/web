import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from '../tracks/track-youtube.model';
import {TracksYoutubeCollection} from '../tracks/tracks-youtube.collection';
import {PlaylistDeezerModel} from '../playlists/playlist-deezer.model';
import {PlaylistsDeezerCollection} from '../playlists/playlists-deezer.collection';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';

export class AccountDeezerModel extends AuxappModel implements IAccount {
  @attributesKey('provider')
  @defaultValue('deezer')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsDeezerCollection<PlaylistDeezerModel>;

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
