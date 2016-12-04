import {PlayQueueItem} from '../models/play_queue_item.model';
import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {Model} from 'backbone';
import {Track} from '../../tracks/models/track.model';

export class PlayQueue extends BaseCollection<Model> {
  private static instance: PlayQueue;

  model = PlayQueueItem;

  static getInstance(): PlayQueue {
    if (PlayQueue.instance) {
      return PlayQueue.instance;
    } else {
      PlayQueue.instance = new PlayQueue();
      PlayQueue.instance.add([
        {
          status: 'NULL',
          id: 130470654,
          stream_url: 'https://api.soundcloud.com/tracks/130470654/stream'
        },
        {
          status: 'NULL',
          id: 176755192,
          stream_url: 'https://api.soundcloud.com/tracks/176755192/stream'
        }
      ]);
      return PlayQueue.instance;
    }
  }

  comparator(item: PlayQueueItem) {
    return [item.get('priority'), item.get('position')];
  }

  getQueuedTracks(): array {
    return this.where({status: 'QUEUED'});
  }

  getPlayingTrack(): Track {
    return this.findWhere({status: 'PLAYING'});
  }

  getPausedTrack(): Track {
    return this.findWhere({status: 'PAUSED'});
  }

  getTrack(): Track {
    let queuedTracks = this.getQueuedTracks();
    if (queuedTracks.length > 0) {
      return queuedTracks[0];
    } else {
      let tracks = this.find((track) => {
        return track.isPaused() || track.isScheduled();
      });
      if (tracks && tracks.length > 0) {
        return tracks[0];
      } else {
        return tracks;
      }
    }
  }

  getNextTrack(): Track {

  }

  getPreviousTrack(): Track {

  }

  addAndPlay(track: Track) {
    let queueItem = this.add(track.toJSON());
    queueItem.play();
    return queueItem;
  }

  queue(track: PlayQueueItem|Object) {

  }

  initialize(): void {
    this.on('change:status', (track) => {
      if (track.isPlaying()) {
        this.where({status: 'PLAYING'}).forEach((playingTrack) => {
          if (playingTrack.id !== track.id) {
            playingTrack.stop();
          }
        });
      }

      if (track.isPaused()) {
        this.where({status: 'PAUSED'}).forEach((playingTrack) => {
          if (playingTrack.id !== track.id) {
            playingTrack.stop();
          }
        });
      }
    });
  }
}
