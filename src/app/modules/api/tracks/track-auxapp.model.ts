import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {ITrack} from './track.interface';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';

export class TrackAuxappModel extends AuxappModel implements ITrack {
  type: 'Track';

  endpoint = '/tracks';

  @attributesKey('hasDetails')
  @defaultValue(false)
  hasDetails: boolean;

  @attributesKey('provider_id')
  @defaultValue('auxapp')
  provider: string;

  @attributesKey('artist')
  @nested()
  artist: ArtistAuxappModel;

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

  @attributesKey('supportsMobilePlayBack')
  @defaultValue(false)
  supportsMobilePlayBack: boolean;

  public toMiniJSON() {
    return {};
  }
}

