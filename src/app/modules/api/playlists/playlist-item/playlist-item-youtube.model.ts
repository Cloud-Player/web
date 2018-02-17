import {TrackYoutubeModel} from '../../tracks/track-youtube.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {YoutubeProxyModel} from '../../youtube/youtube-proxy.model';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';

export class PlaylistItemYoutubeModel
  extends YoutubeProxyModel implements IPlaylistItem {
  private _playlistId: string;

  @queryParam()
  part = 'snippet';

  @attributesKey('order')
  order: number;

  @attributesKey('track')
  @nested()
  track: TrackYoutubeModel;

  setEndpoint(playlistId: string) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = `/playlistItems`;
    this._playlistId = playlistId;
  }

  parse(attributes: any) {
    const parsedPlaylistItem: any = {
      id: attributes.id
    };
    if (attributes.snippet) {
      parsedPlaylistItem.title = attributes.snippet.title;
      parsedPlaylistItem.order = attributes.snippet.order;
      if (attributes.snippet.resourceId) {
        parsedPlaylistItem.track = {
          snippet: attributes.snippet,
          id: attributes.snippet.resourceId.videoId || attributes.snippet.resourceId
        };
      }
    }
    return parsedPlaylistItem;
  }

  compose(attributes): any {
    return {
      snippet: {
        playlistId: this._playlistId,
        position: attributes.order,
        resourceId: {
          kind: 'youtube#video',
          videoId: attributes.track.id
        }
      }
    };
  }

  initialize() {
    this.order = this.collection.length;
  }
}
