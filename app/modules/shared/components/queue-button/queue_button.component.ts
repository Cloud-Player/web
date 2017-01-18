import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';
import './queue_button.style.scss';

@Component({
  selector: 'queue-button',
  template: require('./queue_button.template.html'),
  styleUrls: ['/queue_button.style.css']
})

export class QueueButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  isQueued(): boolean {
    let queuedItems = this.playQueue.getQueuedItems();
    if (queuedItems && queuedItems.find((item: PlayQueueItem) => {
        return item.get('track').get('id') === this.track.id;
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
