import {User} from '../../users/models/user.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {map} from 'underscore';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Track} from '../../tracks/models/track.model';

export class Playlist extends SoundcloudModel {
  endpoint = '/playlists';

  @attributesKey('isPublic')
  @defaultValue(false)
  isPublic: boolean;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('user')
  @nested()
  user: User;

  @attributesKey('tracks')
  @nested()
  tracks: Tracks<Track>;

  @attributesKey('artwork_url')
  @nested()
  image: SoundcloudImageModel;

  parse(attrs: any) {
    attrs.isPublic = (attrs.sharing === 'public');
    delete attrs.sharing;

    if (!attrs.artwork_url && attrs.tracks.length > 0) {
      attrs.artwork_url = attrs.tracks[0].artwork_url;
    }

    return attrs;
  }

  compose(attrs: any) {
    return {
      playlist: {
        title: attrs.title,
        sharing: attrs.isPublic ? 'public' : 'private',
        tracks: map(this.tracks.toJSON(), (obj: any) => {
          return {id: obj.id};
        })
      }
    };
  }
}
