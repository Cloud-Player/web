import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {throttle} from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'audio-player-controls',
  templateUrl: 'audio-player-controls.template.html',
  styleUrls: ['audio-player-controls.style.css']
})

export class AudioPlayerControlsComponent implements OnInit {

  private audio: HTMLAudioElement;
  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private timeTick: number;
  private duration: number;

  private hadError: boolean = false;

  private isBuffering: boolean = false;

  constructor() {
    this.audio = new Audio();
    this.playQueue.on('change:status', this.reactOnStatusChange, this);
    this.timeTick = 0;
    this.duration = 0;
    this.setAudioObjectEventListeners();
  }

  private setAudioObjectEventListeners() {
    this.audio.addEventListener('canplay', () => {
      this.duration = this.audio.duration;
      this.isBuffering = false;
    });

    let throttledTimeUpdater = throttle(() => {
      this.timeTick = this.audio.currentTime;
    }, 1000);

    this.audio.addEventListener('timeupdate', throttledTimeUpdater);

    this.audio.addEventListener('ended', () => {
      if (this.playQueue.hasNextItem()) {
        this.nextTrack();
      } else {
        this.playQueue.getCurrentItem().stop();
      }
    });

    this.audio.addEventListener('error', () => {
      this.hadError = true;
      if (this.playQueue.hasCurrentItem()) {
        this.playQueue.getCurrentItem().pause();
      }
    });

    this.audio.addEventListener('playing', () => {
      this.hadError = false;
    });

    this.audio.addEventListener('waiting', () => {
      this.isBuffering = true;
    });
  }

  ngOnInit() {
    let savedVolume = localStorage.getItem('sc_volume');
    if (savedVolume) {
      this.audio.volume = parseFloat(savedVolume);
    }

    window.addEventListener('playPauseTrackKeyPressed', this.togglePlayPause.bind(this));
    window.addEventListener('nextTrackKeyPressed', this.nextTrack.bind(this));
    window.addEventListener('previousTrackKeyPressed', this.previousTrack.bind(this));

    if (this.playQueue.getPlayingItem()) {
      this.startAudioPlayer(this.playQueue.getPlayingItem());
    }
  }


  private reactOnStatusChange(item: PlayQueueItem): void {
    switch (item.get('status')) {
      case 'PLAYING':
        this.startAudioPlayer(item);
        break;
      case 'STOPPED':
        this.stopAudioPlayer();
        break;
      case 'PAUSED':
        this.pauseAudioPlayer();
        break;
    }
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  saveVolume(volume: number) {
    let roundedVolumeStr = (Math.round(volume * 10) / 10).toString();
    localStorage.setItem('sc_volume', roundedVolumeStr);
  }

  playTrack(playQueueItem: PlayQueueItem|null): void {
    playQueueItem = playQueueItem || this.playQueue.getItem();
    playQueueItem.play();
  }

  playTrackFromPosition(newTimeSec: number): void {
    this.audio.currentTime = newTimeSec;
    this.playTrack(this.playQueue.getPlayingItem());
  }

  pauseTrack(): void {
    let track = this.playQueue.getPlayingItem();
    if (track) {
      track.pause();
    }
  }

  togglePlayPause(): void {
    let currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      if (currItem.isPlaying()) {
        currItem.pause();
      } else {
        currItem.play();
      }
    }
  }

  previousTrack(): void {
    if (this.playQueue.hasPreviousItem()) {
      this.timeTick = 0;
      this.playTrack(this.playQueue.getPreviousItem());
    }
  }

  nextTrack(): void {
    if (this.playQueue.hasNextItem()) {
      this.timeTick = 0;
      this.playTrack(this.playQueue.getNextItem());
    }
  }

  startAudioPlayer(item: PlayQueueItem): void {
    if (this.audio.src !== item.get('track').getResourceUrl()) {
      this.audio.src = item.get('track').getResourceUrl();
    }

    if (this.hadError) {
      let currTime = this.audio.currentTime;
      this.audio.src = item.get('track').getResourceUrl();
      this.audio.currentTime = currTime;
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

}
