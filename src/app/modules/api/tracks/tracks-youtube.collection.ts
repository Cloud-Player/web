import {TrackYoutubeModel} from './track-youtube.model';
import {YoutubeProxyCollection} from '../youtube/youtube-proxy.collection';
import {ITrackModelConstructor} from './track.interface';
import {ITracks} from './tracks.interface';
import {debounce} from 'underscore';

export class TracksYoutubeCollection<TModel extends TrackYoutubeModel>
  extends YoutubeProxyCollection<TModel> implements ITracks<TModel> {

  model: ITrackModelConstructor = TrackYoutubeModel;

  endpoint = '/search';

  queryParams: {
    [key: string]: string | number | boolean
  } = {
    q: <any>null,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: true,
    maxResults: 50
  };

  constructor(...args) {
    super(...args);
    const debouncedFetchDetails = debounce(this.fetchVideoDetails.bind(this), 100);
    this.on('update reset add', debouncedFetchDetails, this);
  }

  public static getTrackDetails(trackIds: Array<string>): Promise<any> {
    const url = `${TracksYoutubeCollection.prototype.hostName.call(this)}/proxy/youtube/videos`;

    if (trackIds.length === 0) {
      return Promise.resolve({items: []});
    } else {
      return TracksYoutubeCollection.prototype.request.call(this, url, 'GET', {
        params: {
          part: 'statistics,contentDetails,player,topicDetails,snippet',
          id: trackIds.join(',')
        }
      });
    }
  }

  private fetchVideoDetails() {
    const videoIds = [];

    this.each((item: TrackYoutubeModel) => {
      if (!item.hasDetails) {
        videoIds.push(item.id);
      }
    });

    return TracksYoutubeCollection.getTrackDetails(videoIds).then((rsp: any) => {
      this.add(rsp, {parse: true, merge: true});
      return this;
    });
  }
}
