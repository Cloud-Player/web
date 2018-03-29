import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {extend} from 'underscore';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';

export class TracksYoutubeCategoryModel extends YoutubeProxyModel {
  endpoint = '/videoCategories';

  @attributesKey('title')
  title: string;

  parse(attributes) {
    const parsedTrack: any = {
      id: attributes.id
    };

    if (attributes.snippet) {
      extend(parsedTrack, attributes.snippet);
    }

    return parsedTrack;
  }
}
