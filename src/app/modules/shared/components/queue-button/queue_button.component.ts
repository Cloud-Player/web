import {Component, Input} from '@angular/core';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {PlayQueue} from '../../../player/collections/play-queue';
import {ITrack} from '../../../api/tracks/track.interface';
import {ITracks} from '../../../api/tracks/tracks.interface';

@Component({
  selector: 'app-queue-button',
  styleUrls: ['./queue_button.style.scss'],
  templateUrl: './queue_button.template.html'
})

export class QueueButtonComponent {

  @Input() track: ITrack;

  @Input() tracks: ITracks<ITrack>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  isQueued(): boolean {
    const queuedItems = this.playQueue.getQueuedItems();
    if (queuedItems && queuedItems.find((item: PlayQueueItem) => {
        return item.track.id === this.track.id;
      })) {
      return true;
    } else {
      return false;
    }
  }

  queue(): void {
    this.playQueue.queue({track: this.track});
  }
}
