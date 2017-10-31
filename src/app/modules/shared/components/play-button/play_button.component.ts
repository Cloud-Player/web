import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';

@Component({
  selector: 'play-button',
  styles: [require('./play_button.style.scss')],
  template: require('./play_button.template.html')
})

export class PlayButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  isPlaying(): boolean {
    let playingItem = this.playQueue.getPlayingItem();
    return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
  }
}
