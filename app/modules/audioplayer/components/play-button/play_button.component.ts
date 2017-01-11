import {Component, Input} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
  selector: 'audio-player-play-button',
  template: require('./play_button.template.html'),
  styleUrls: ['./play_button.style.scss']
})

export class PlayButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  addToPlayQueue(): void {
    this.playQueue.add({track: this.track});
  }

  play(): void {
    this.playQueue.filter((model) => {
      return !model.isQueued();
    }).forEach((model) => {
      this.playQueue.remove(model);
    });

    if (this.tracks) {
      this.tracks.forEach((track: Track) => {
        this.playQueue.add({track: track});
      });
    }

    let playQueueItem = this.playQueue.add({track: this.track});
    playQueueItem.play();
  }
}
