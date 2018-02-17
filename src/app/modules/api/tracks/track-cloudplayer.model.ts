import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {ITrack} from './track.interface';
import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {ArtistCloudplayerModel} from '../artist/artist-cloudplayer.model';

export class TrackCloudplayerModel extends CloudplayerModel implements ITrack {
  type: 'Track';

  endpoint = '/tracks';

  isLikeable = true;

  @attributesKey('hasDetails')
  @defaultValue(false)
  hasDetails: boolean;

  @attributesKey('provider_id')
  @defaultValue('cloudplayer')
  provider: string;

  @attributesKey('artist')
  @nested()
  artist: ArtistCloudplayerModel;

  @attributesKey('image')
  @nested()
  image: ImageSoundcloudModel;

  @attributesKey('title')
  title: string;

  @attributesKey('duration')
  duration: number;

  @attributesKey('genre')
  genre: string;

  @attributesKey('createdAt')
  createdAt: number;

  @attributesKey('likes')
  likes: number;

  @attributesKey('clicks')
  clicks: number;

  @attributesKey('aspectRatio')
  @defaultValue(1)
  aspectRatio: number;

  public toMiniJSON() {
    return {};
  }
}

