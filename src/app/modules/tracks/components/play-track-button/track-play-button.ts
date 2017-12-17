import {Component, Input} from '@angular/core';
import {Track} from '../../models/track';
import {Tracks} from '../../collections/tracks';
import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';

@Component({
  selector: 'app-track-play-button',
  styleUrls: ['./track-play-button.scss'],
  templateUrl: './track-play-button.html'
})
export class TrackPlayButtonComponent {
  private _playQueue: PlayQueue<PlayQueueItem>;

  @Input()
  track: Track;

  @Input()
  tracks: Tracks<Track>;

  constructor() {
    this._playQueue = PlayQueue.getInstance();
  }

  isPlaying(): boolean {
    const playingItem = this._playQueue.getPlayingItem();
    return (playingItem && playingItem.track.id === this.track.id);
  }
}
