import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';
import './play_button.style.scss';

@Component({
  selector: 'play-button',
  template: require('./play_button.template.html'),
  styleUrls: ['/play_button.style.css']
})

export class PlayButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  isPlaying(): boolean {
    let playingItem = this.playQueue.getPlayingItem();
    return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
  }

  play(): void {
    this.playQueue.filter((model) => {
      return !model.isQueued();
    }).forEach((model) => {
      this.playQueue.remove(model);
    });

    if (this.tracks) {
      this.tracks.forEach((track: Track) => {
        if (!this.playQueue.get(track)) {
          this.playQueue.add({track: track});
        }
      });
    }

    let playQueueItem = this.playQueue.add({track: this.track});
    playQueueItem.play();
  }

  pause(): void {
    if (this.isPlaying()) {
      PlayQueue.getInstance().getPlayingItem().pause();
    }
  }
}
