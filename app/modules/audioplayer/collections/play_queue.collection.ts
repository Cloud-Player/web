import {PlayQueueItem} from '../models/play_queue_item.model';
import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {Model} from 'backbone';
import {Track} from '../../tracks/models/track.model';

export class PlayQueue extends BaseCollection<Model> {
  private static instance: PlayQueue;

  private playIndex = 0;

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
        },
        {
          status: 'NULL',
          id: 176724778271555192,
          stream_url: 'https://api.soundcloud.com/tracks/247782715/stream'
        }
      ]);
      return PlayQueue.instance;
    }
  }

  static comparator(item: PlayQueueItem): Array<any> {
    return [item.get('priority'), item.get('position')];
  }

  getQueuedTracks(): Track {
    return this.where({status: 'QUEUED'});
  }

  getPlayingTrack(): Track {
    return this.findWhere({status: 'PLAYING'});
  }

  getPausedTrack(): Track {
    return this.findWhere({status: 'PAUSED'});
  }

  getTrack(): Track {
    let pausedTrack = this.getPausedTrack();
    if (pausedTrack) {
      console.log(pausedTrack);
      return pausedTrack;
    }
    let queuedTracks = this.getQueuedTracks();
    if (queuedTracks.length > 0) {
      return queuedTracks[0];
    } else {
      let tracks = this.find((track) => {
        return track.isScheduled();
      });
      if (tracks && tracks.length > 0) {
        return tracks[0];
      } else {
        return tracks;
      }
    }
  }

  getDuration(): number {
    // console.log('jojo' + this.getPlayingTrack().get('duration'));
    // return this.getPlayingTrack().get('duration');
  }

  hasNextTrack(): boolean {
    return this.playIndex < this.length - 1;
  }

  hasPreviousTrack(): boolean {
    return this.playIndex > 0;
  }

  getNextTrack(): Track {
    if (this.hasNextTrack()) {
      return this.at(this.playIndex + 1);
    }
  }

  getPreviousTrack(): Track {
    if (this.hasPreviousTrack()) {
      return this.at(this.playIndex - 1);
    }
  }

  addAndPlay(track: Track): PlayQueueItem {
    let queueItem: PlayQueueItem = this.add(track.toJSON());
    queueItem.play();
    return queueItem;
  }

  queue(track: PlayQueueItem|Object) {

  }

  initialize(): void {
    this.on('change:status', (track: PlayQueueItem) => {
      if (track.isPlaying()) {
        this.where({status: 'PLAYING'}).forEach((playingTrack) => {
          if (playingTrack.id !== track.id) {
            playingTrack.stop();
          }
        });
        this.playIndex = this.indexOf(track);
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
