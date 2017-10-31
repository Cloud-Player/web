import {Injectable} from '@angular/core';
import {Track} from '../../tracks/models/track.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {AuthenticatedUserPlaylistTrack} from '../models/authenticated_user_playlist_track.model';

export class AuthenticatedUserPlaylistTracks<TModel extends Track> extends Tracks<TModel> {
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
