import {Injectable} from '@angular/core';
import {Track} from '../../tracks/models/track';
import {Tracks} from '../../tracks/collections/tracks';
import {AuthenticatedUserPlaylistTrack} from '../models/authenticated_user_playlist_track.model';
import {TracksSoundcloud} from '../../tracks/collections/tracks-soundcloud';
import {TrackSoundcloud} from '../../tracks/models/track-soundcloud';

export class AuthenticatedUserPlaylistTracks<TModel extends TrackSoundcloud> extends TracksSoundcloud<TModel> {
  model: any = AuthenticatedUserPlaylistTrack;

  queryParams = <any>{};

  parse(attrs: any) {
    return attrs.tracks;
  }

  create(track: TModel): TModel {
    this.add(track);
    this.triggerSave(track);
    return track;
  }

  triggerSave(track: Track) {
    this.trigger('save', track, this);
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/me/playlists/${playlistId}`;
  }
}
