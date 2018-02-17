import {IArtist} from './artist.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';
import {ImageYoutubeModel} from '../image/image-youtube.model';

export class ArtistYoutubeModel extends YoutubeProxyModel implements IArtist {

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
  title: string;

  sync(method: string, model: any, options: any = {}) {
    const id = this.id;
    model.set(model.idAttribute, null);
    const sync = super.sync(method, model, options);
    model.set(model.idAttribute, id);
    return sync;
  }

  parse(attributes: any) {
    const parsedAccount: any = {
      id: attributes.id,
      title: attributes.title,
      image: attributes.image
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

  getAccountId(): string {
    return this.id;
  }
}
