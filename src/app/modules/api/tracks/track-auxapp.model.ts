import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {ITrack} from './track.interface';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';

export class TrackAuxappModel extends AuxappModel implements ITrack {
  type: 'Track';

  endpoint = '/track';

  @attributesKey('hasDetails')
  @defaultValue(false)
  hasDetails: boolean;

  @attributesKey('provider_id')
  @defaultValue('auxapp')
  provider_id: string;

  @attributesKey('account')
  @nested()
  artist: ArtistAuxappModel;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  title: string;

  @attributesKey('duration')
  duration: number;

  @attributesKey('genres')
  genre: Array<string>;

  @attributesKey('created')
  createdAt: number;

  @attributesKey('favourite_count')
  likes: number;

  @attributesKey('play_count')
  clicks: number;

  @attributesKey('aspect_ratio')
  @defaultValue(1)
  aspectRatio: number;

  @attributesKey('external_link')
  externalLink: string;

  @attributesKey('supportsMobilePlayBack')
  @defaultValue(true)
  supportsMobilePlayBack: boolean;

  public toMiniJSON() {
    const obj: any = {};
    obj.provider_id = this.provider_id;
    obj.id = this.id;
    obj.title = this.title;
    obj.duration = this.duration;
    obj.image = this.image.toJSON();
    obj.account = this.artist.toJSON();
    obj.aspect_ratio = this.aspectRatio;
    obj.external_link = this.externalLink;
    obj.created = this.createdAt;
    return obj;
  }

  public getGenreString() {
    return this.genre.slice(0, 3).join(', ');
  }

  clone() {
    return new TrackAuxappModel(this.toMiniJSON());
  }
}

