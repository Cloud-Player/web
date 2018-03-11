import {Component, Input} from '@angular/core';
import {ITrack} from '../../../../api/tracks/track.interface';
import {PlayQueue} from '../../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../../player/models/play-queue-item';
import {ITracks} from '../../../../api/tracks/tracks.interface';

@Component({
  selector: 'app-shuffle-play-option',
  styleUrls: ['./shuffle-play-option.scss'],
  templateUrl: './shuffle-play-option.html'
})
export class ShufflePlayOptionComponent {

  private _playQueue: PlayQueue<PlayQueueItem>;

  @Input()
  public track: ITrack;

  @Input()
  public tracks: ITracks<ITrack>;

  constructor() {
    this._playQueue = PlayQueue.getInstance();
  }

  public shufflePlay() {
    this._playQueue.resetQueue();

    if (this.tracks) {
      this.tracks.forEach((track: ITrack, index) => {
        if (!this._playQueue.get(track.id)) {
          this._playQueue.add({track: track});
        }
      });
    }

    this._playQueue.shuffle();

    const addedTrack = this._playQueue.get(this.track.id);
    const newPlayQueueItem = new PlayQueueItem({track: this.track});
    if (addedTrack) {
      newPlayQueueItem.indexBeforeShuffle = addedTrack.indexBeforeShuffle;
      this._playQueue.remove(addedTrack, {silent: true});
    }

    this._playQueue.add(newPlayQueueItem, {at: 0}).play();
  }
}
