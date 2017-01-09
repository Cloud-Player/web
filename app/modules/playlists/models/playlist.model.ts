import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {map} from 'underscore';

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
      tracks: Tracks
    };
  };

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
