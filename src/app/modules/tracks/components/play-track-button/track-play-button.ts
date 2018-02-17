import {Component, Input} from '@angular/core';
import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {ITrack} from '../../../api/tracks/track.interface';
import {ITracks} from '../../../api/tracks/tracks.interface';

@Component({
  selector: 'app-track-play-button',
  styleUrls: ['./track-play-button.scss'],
  templateUrl: './track-play-button.html'
})
export class TrackPlayButtonComponent {
  private _playQueue: PlayQueue<PlayQueueItem>;

  @Input()
  track: ITrack;

  @Input()
  tracks: ITracks<ITrack>;

  constructor() {
    this._playQueue = PlayQueue.getInstance();
  }

  isPlaying(): boolean {
    const playingItem = this._playQueue.getPlayingItem();
    return (playingItem && playingItem.track.id === this.track.id);
  }
}
