import {Component, Input} from '@angular/core';
import {ITrack} from '../../../../api/tracks/track.interface';
import {PlayqueueAuxappModel} from '../../../../api/playqueue/playqueue-auxapp.model';

@Component({
  selector: 'app-add-to-queue-option',
  styleUrls: ['./add-to-queue-option.scss'],
  templateUrl: './add-to-queue-option.html'
})
export class AddToQueueOptionComponent {

  private _playQueue: PlayqueueAuxappModel;

  @Input()
  public track: ITrack;

  constructor() {
    this._playQueue = PlayqueueAuxappModel.getInstance();
  }

  public isQueued() {
    const playQueueItem = this._playQueue.items.getItemByTrackId(this.track.id);
    if (playQueueItem) {
      return playQueueItem.isQueued();
    } else {
      return false;
    }
  }

  public addToQueue() {
    this._playQueue.items.queue({track: this.track.clone()});
  }

  public removeFromQueue() {
    const playQueueItem = this._playQueue.items.getItemByTrackId(this.track.id);
    if (playQueueItem) {
      playQueueItem.unQueue();
    }
  }
}
