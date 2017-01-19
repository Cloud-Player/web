import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {throttle} from 'underscore';
import * as localforage from 'localforage';
import {Track} from '../../../tracks/models/track.model';

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
      localforage.setItem('sc_current_track', {
        id: this.playQueue.getCurrentItem().get('track').id,
        currentTime: this.audio.currentTime,
        duration: this.audio.duration
      });
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

  private initializeLastPlayingTrack(lastTrack: any) {
    let item: PlayQueueItem = this.playQueue.add({status: 'PAUSED', track: {id: lastTrack.id}}, {at: 0, merge: true});
    item.get('track').fetch().then((track: Track) => {
      this.audio.src = track.getResourceUrl();
    });
    this.audio.currentTime = lastTrack.currentTime;
    this.timeTick = lastTrack.currentTime;
    this.duration = lastTrack.duration;
  }

  ngOnInit() {
    localforage.getItem('sc_volume').then((volume: number) => {
      if (volume) {
        this.audio.volume = volume;
      }
    });

    localforage.getItem('sc_current_track').then((currentTrack: any) => {
      if (currentTrack) {
        this.initializeLastPlayingTrack(currentTrack);
      }
    });

    window.addEventListener('playPauseTrackKeyPressed', this.togglePlayPause.bind(this));
    window.addEventListener('nextTrackKeyPressed', this.nextTrack.bind(this));
    window.addEventListener('previousTrackKeyPressed', this.previousTrack.bind(this));
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
    localforage.setItem('sc_volume', roundedVolumeStr);
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
    if (this.audio && this.audio.currentTime && this.audio.currentTime > 1) {
      this.timeTick = 0;
      this.playTrackFromPosition(0);
    } else {
      if (this.playQueue.hasPreviousItem()) {
        this.timeTick = 0;
        this.playTrack(this.playQueue.getPreviousItem());
      }
    }
  }

  nextTrack(): void {
    if (this.playQueue.hasNextItem()) {
      this.timeTick = 0;
      this.playTrack(this.playQueue.getNextItem());
    }
  }

  startAudioPlayer(item: PlayQueueItem): void {
    let currTime = this.audio.currentTime;

    if (this.audio.src !== item.get('track').getResourceUrl()) {
      this.audio.src = item.get('track').getResourceUrl();
      this.audio.currentTime = 0;
    }

    if (this.hadError) {
      this.audio.src = item.get('track').getResourceUrl();
      this.audio.currentTime = currTime;
    }

    this.timeTick = this.audio.currentTime;

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
