import {Component, Input} from '@angular/core';
import {ITrack} from '../../../../api/tracks/track.interface';
import {PlayQueue} from '../../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../../player/models/play-queue-item';

@Component({
  selector: 'app-add-to-queue-option',
  styleUrls: ['./add-to-queue-option.scss'],
  templateUrl: './add-to-queue-option.html'
})
export class AddToQueueOptionComponent {

  private _playQueue: PlayQueue<PlayQueueItem>;

  @Input()
  public track: ITrack;

  constructor() {
    this._playQueue = PlayQueue.getInstance();
  }

  public addToQueue() {
    this._playQueue.queue({track: this.track});
  }
}
