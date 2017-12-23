import {YoutubeModel} from '../../shared/models/youtube';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {extend} from 'underscore';

export class TracksYoutubeCategory extends YoutubeModel {
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
