import {Playlist} from '../models/playlist.model';
import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../main/collections/soundcloud.collection';
import {Model} from 'backbone';

@Injectable()
export class Playlists extends SoundcloudCollection<Model> {
  endpoint = '/playlists';
  model = Playlist;
}
