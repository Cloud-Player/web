import {Component, Input} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  moduleId: module.id,
  selector: 'audio-player-play-button',
  templateUrl: 'play_button.template.html',
  styleUrls: ['play_button.style.css']
})

export class PlayButtonComponent {

  @Input() track: Track;

  private playingItem: PlayQueueItem;
  private playQueue: PlayQueue = PlayQueue.getInstance();

  add(): void {
    this.playQueue.add(this.track.toJSON());
  }

  play(): void {
    this.playingItem = this.playQueue.addAndPlay(this.track);
  }

  pause(): void {
    if (this.trackIsCurrentlyPlaying()) {
      this.playQueue.getPlayingTrack().pause();
    }
  }

  trackIsCurrentlyPlaying(): boolean {
    let currentlyPlaying = this.playQueue.getPlayingTrack();

    return currentlyPlaying && currentlyPlaying.id === this.track.id;
  }

  canPlay(): boolean {
    return !this.trackIsCurrentlyPlaying();
  }

  canPause(): boolean {
    return this.trackIsCurrentlyPlaying();
  }

}
