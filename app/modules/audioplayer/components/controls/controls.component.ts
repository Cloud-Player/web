import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  moduleId: module.id,
  selector: 'audio-player-controls',
  templateUrl: 'controls.template.html',
  styleUrls: ['controls.style.css']
})

export class PlayerControlsComponent {
  private audio: any;
  private playQueue: PlayQueue = PlayQueue.getInstance();

  constructor() {
    this.audio = new Audio();
    this.playQueue.on('change:status', this.reactOnStatusChange, this);
  }

  private reactOnStatusChange(track): void {
    switch (track.get('status')) {
      case 'PLAYING':
        this.startAudioPlayer(track);
        break;
      case 'STOPPED':
        this.stopAudioPlayer();
        break;
      case 'PAUSED':
        this.pauseAudioPlayer();
        break;
    }
  }

  playTrack(track: PlayQueueItem|null): void {
    track = track || this.playQueue.getTrack();

    track.play();
  }

  pauseTrack(): void {
    let track = this.playQueue.getPlayingTrack();
    if (track) {
      track.pause();
    }
  }

  previousTrack(): void {
    if (this.playQueue.getPreviousTrack()) {
      this.playTrack(this.playQueue.getPreviousTrack());
    }
  }

  nextTrack(): void {
    if (this.playQueue.getNextTrack()) {
      this.playTrack(this.playQueue.getNextTrack());
    }
  }

  startAudioPlayer(track: Track): void {
    if (this.audio.src !== track.getResourceUrl()) {
      this.audio.src = track.getResourceUrl();
    }
    this.audio.play();
  }

  pauseAudioPlayer(): void {
    this.audio.pause();
  }

  stopAudioPlayer(): void {
    this.audio.pause();
    delete this.audio.src;
  }

  setAudioPlayerVolume(volume: string): void {
    this.audio.volume = volume;
  }

}
