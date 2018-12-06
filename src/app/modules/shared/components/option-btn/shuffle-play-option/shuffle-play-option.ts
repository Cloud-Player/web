import {Component, Input} from '@angular/core';
import {ITrack} from '../../../../api/tracks/track.interface';
import {ITracks} from '../../../../api/tracks/tracks.interface';
import {PlayqueueItemAuxappModel} from '../../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {PlayqueueAuxappModel} from '../../../../api/playqueue/playqueue-auxapp.model';

@Component({
  selector: 'app-shuffle-play-option',
  styleUrls: ['./shuffle-play-option.scss'],
  templateUrl: './shuffle-play-option.html'
})
export class ShufflePlayOptionComponent {

  private _playQueue: PlayqueueAuxappModel;

  @Input()
  public track: ITrack;

  @Input()
  public tracks: ITracks<ITrack>;

  constructor() {
    this._playQueue = PlayqueueAuxappModel.getInstance();
  }

  public shufflePlay() {
    this._playQueue.destroy();

    if (this.tracks) {
      this.tracks.forEach((track: ITrack, index) => {
        if (!this._playQueue.items.getItemByTrackId(track.id)) {
          this._playQueue.items.add({track: track});
        }
      });
    }

    this._playQueue.items.shuffle();

    const addedTrack = this._playQueue.items.getItemByTrackId(this.track.id);
    const newPlayQueueItem = new PlayqueueItemAuxappModel({track: this.track});
    if (addedTrack) {
      newPlayQueueItem.indexBeforeShuffle = addedTrack.indexBeforeShuffle;
      this._playQueue.items.remove(addedTrack, {silent: true});
    }

    this._playQueue.items.add(newPlayQueueItem, {at: 0}).play();
  }
}
