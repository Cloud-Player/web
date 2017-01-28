import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {map} from 'underscore';
import {SoundcloudImageModel} from '../../main/models/soundcloud-image.model';

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
      tracks: Tracks,
      artwork_url: SoundcloudImageModel
    };
  };

  parse(attrs: any) {
    if (attrs.sharing === 'public') {
      attrs.isPublic = true;
    } else {
      attrs.isPublic = false;
    }
    if (!attrs.artwork_url && attrs.tracks.length > 0) {
      attrs.artwork_url = attrs.tracks[0].artwork_url;
    }
    delete attrs.sharing;
    return attrs;
  }

  compose(args: any) {
    return {
      playlist: {
        title: args.title,
        sharing: args.isPublic ? 'public' : 'private',
        tracks: map(this.get('tracks').toJSON(), (obj: any) => {
          return {id: obj.id};
        })
      }
    };
  }

}
