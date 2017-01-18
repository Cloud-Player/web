import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {map} from 'underscore';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';

@Injectable()
export class Playlist extends SoundcloudModel {
  endpoint = '/playlists';

  defaults() {
    return {
      title: '',
      isPublic: false
    };
  };

  nested() {
    return {
      user: User,
      artwork_url: SoundcloudImageModel,
      tracks: Tracks
    };
  };

  parse(attrs: any) {
    if (attrs.sharing === 'public') {
      attrs.isPublic = true;
    } else {
      attrs.isPublic = false;
    }
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
        tracks: map(this.get('tracks').toJSON(), (obj: any) => {
          return {id: obj.id};
        })
      }
    };
  }
}
