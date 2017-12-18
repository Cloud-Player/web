import {Track} from '../models/track';
import {IModelConstructor} from '../../backbone/utils/interfaces';
import {Tracks} from './tracks';
import {TrackYoutube} from '../models/track-youtube';
import {YoutubeCollection} from '../../shared/collections/youtube';
import {Globals} from '../../../../globals';

export class TracksYoutube<TModel extends TrackYoutube> extends Tracks<TModel> {

  model: IModelConstructor = TrackYoutube;

  endpoint = '/search';

  private fetchVideoDetails() {
    const url = `${this.hostName()}/videos`;
    return this.request(url, 'GET', {
      params: {
        key: Globals.youtubeClientId,
        part: 'statistics,contentDetails,player',
        id: this.pluck('id').join(',')
      }
    }).then((rsp: any) => {
      this.add(rsp, {parse: true, merge: true});
      return this;
    });
  }

  hostName(): string {
    return YoutubeCollection.prototype.hostName.apply(this);
  }

  sync(...args) {
    this.queryParams.part = 'snippet';
    this.queryParams.type = 'video';
    this.queryParams.maxResults = 50;
    return YoutubeCollection.prototype.sync.apply(this, args);
  }

  parse(rsp: any) {
    return rsp.items || rsp;
  }

  fetch(...args) {
    return super.fetch.apply(this, args).then(() => {
      this.fetchVideoDetails();
    });
  }

}
