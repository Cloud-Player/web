import {Component, Input} from '@angular/core';
import {ITrack} from '../../../api/tracks/track.interface';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';

@Component({
  selector: 'app-queue-button',
  styleUrls: ['./queue_button.style.scss'],
  templateUrl: './queue_button.template.html'
})

export class QueueButtonComponent {

  @Input() track: ITrack;

  @Input() tracks: ITracks<ITrack>;

  private playQueue: PlayqueueAuxappModel = PlayqueueAuxappModel.getInstance();

  isQueued(): boolean {
    const queuedItems = this.playQueue.items.getQueuedItems();
    if (queuedItems && queuedItems.find((item: PlayqueueItemAuxappModel) => {
        return item.track.id === this.track.id;
      })) {
      return true;
    } else {
      return false;
    }
  }

  queue(): void {
    this.playQueue.items.queue({track: this.track});
  }
}
