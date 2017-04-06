import {SoundcloudImageModel} from '../../../shared/models/soundcloud-image.model';
declare let MediaMetadata: any;

import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {throttle} from 'underscore';
import * as localforage from 'localforage';
import {Track} from '../../../tracks/models/track.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {CloudPlayerLogoService} from '../../../shared/services/cloud-player-logo.service';

@Component({
  selector: 'audio-player-controls',
  styles: [require('./audio-player-controls.style.scss')],
  template: require('./audio-player-controls.template.html')
})

export class AudioPlayerControlsComponent implements OnInit {

  private audio: HTMLAudioElement;
  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private timeTick: number;
  private duration: number;

  private hadError: boolean = false;

  private isBuffering: boolean = false;

  private humanReadableSecPipe: HumanReadableSecondsPipe;

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService) {
    this.audio = new Audio();
    this.playQueue.on('change:status', this.reactOnStatusChange, this);
    this.timeTick = 0;
    this.duration = 0;
    this.humanReadableSecPipe = new HumanReadableSecondsPipe();
    this.setAudioObjectEventListeners();
  }

  private setAudioObjectEventListeners() {
    this.audio.addEventListener('canplay', () => {
      this.duration = this.audio.duration;
      this.isBuffering = false;
    });

    let throttledTimeUpdater = throttle(() => {
      this.timeTick = this.audio.currentTime;
      if (this.playQueue.getCurrentItem()) {
        localforage.setItem('sc_current_track', {
          id: this.playQueue.getCurrentItem().get('track').id,
          currentTime: this.audio.currentTime,
          duration: this.audio.duration
        });
      }
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
      this.pauseTrack();
    });

    this.audio.addEventListener('playing', () => {
      this.hadError = false;
      this.cloudPlayerLogoService.play();
    });

    this.audio.addEventListener('waiting', () => {
      this.isBuffering = true;
    });
  }

  private initializeLastPlayingTrack(lastTrack: any) {
    let item: PlayQueueItem = this.playQueue.add({status: 'PAUSED', track: {id: lastTrack.id}}, {at: 0});
    item.get('track').fetch().then((track: Track) => {
      this.audio.src = track.getResourceUrl();
    });
    this.audio.currentTime = lastTrack.currentTime;
    this.timeTick = lastTrack.currentTime;
    this.duration = lastTrack.duration;
  }

  private setMobileMediaNotification(track: Track) {
    if ('mediaSession' in navigator) {
      let nv: any = navigator;
      let artwork: SoundcloudImageModel = track.get('artwork_url');
      nv.mediaSession.metadata = new MediaMetadata({
        title: track.get('title'),
        artist: track.get('user').get('username'),
        artwork: [
          {src: artwork.getDefaultSize(), sizes: '96x96', type: 'image/jpg'},
          {src: artwork.getDefaultSize(), sizes: '128x128', type: 'image/jpg'},
          {src: artwork.getDefaultSize(), sizes: '192x192', type: 'image/jpg'},
          {src: artwork.getImageByFormat('t300x300'), sizes: '256x256', type: 'image/jpg'},
          {src: artwork.getImageByFormat('crop'), sizes: '384x384', type: 'image/jpg'},
          {src: artwork.getLargeSize(), sizes: '512x512', type: 'image/jpg'},
        ]
      });
      // nv.mediaSession.setActionHandler('play', this.playTrack(this.playQueue.getCurrentItem()));
      // nv.mediaSession.setActionHandler('pause', this.pauseTrack());
      if (this.playQueue.hasPreviousItem()) {
        nv.mediaSession.setActionHandler('previoustrack', () => {
          this.previousTrack();
        });
      }
      if (this.playQueue.hasNextItem()) {
        nv.mediaSession.setActionHandler('nexttrack', () => {
          this.nextTrack();
        });
      }
    }
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

  private transformProgressBarValues = function (input: any) {
    return this.humanReadableSecPipe.transform(input, null);
  }.bind(this);

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  saveVolume(volume: number) {
    let roundedVolumeStr = (Math.round(volume * 10) / 10).toString();
    localforage.setItem('sc_volume', roundedVolumeStr);
  }

  playTrack(playQueueItem: PlayQueueItem|null): void {
    playQueueItem = playQueueItem || this.playQueue.getItem();
    if (playQueueItem) {
      playQueueItem.play();
    }
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
    this.pauseAudioPlayer();
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
      this.audio.load();
      this.audio.currentTime = currTime;
    }

    this.timeTick = this.audio.currentTime;

    this.audio.play();

    this.setMobileMediaNotification(item.get('track'));
  }

  pauseAudioPlayer(): void {
    this.audio.pause();
    this.isBuffering = false;
    this.cloudPlayerLogoService.pause();
  }

  stopAudioPlayer(): void {
    this.audio.pause();
    delete this.audio.src;
  }

}
