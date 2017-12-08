import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {PlayQueue} from '../../../player/collections/play-queue';

@Component({
  selector: 'app-queue-button',
  styleUrls: ['./queue_button.style.scss'],
  templateUrl: './queue_button.template.html'
})

export class QueueButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

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
