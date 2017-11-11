
declare let MediaMetadata: any;

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem, Status} from '../../models/play_queue_item.model';
import {throttle} from 'underscore';
import * as localforage from 'localforage';
import {Track} from '../../../tracks/models/track.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {CloudPlayerLogoService} from '../../../shared/services/cloud-player-logo.service';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {SoundcloudImageModel} from '../../../shared/models/soundcloud-image.model';


@Component({
  selector: 'app-audio-player-controls',
  styleUrls: ['./audio-player-controls.style.scss'],
  templateUrl: './audio-player-controls.template.html'
})

export class AudioPlayerControlsComponent implements OnInit {
  private hadError = false;
  private humanReadableSecPipe: HumanReadableSecondsPipe;

  playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();
  isBuffering = false;
  timeTick: number;
  duration: number;
  audio: HTMLAudioElement;

  @Output() currentTimeChange = new EventEmitter();

  public transformProgressBarValues = function (input: any) {
    return this.humanReadableSecPipe.transform(input, null);
  }.bind(this);

  constructor(private cloudPlayerLogoService: CloudPlayerLogoService, private userAnalyticsService: UserAnalyticsService) {
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

    const throttledTimeUpdater = throttle(() => {
      this.timeTick = this.audio.currentTime;
      if (this.playQueue.getCurrentItem()) {
        localforage.setItem('sc_current_track', {
          id: this.playQueue.getCurrentItem().track.id,
          currentTime: this.audio.currentTime,
          duration: this.audio.duration
        });
        this.currentTimeChange.emit(this.audio.currentTime);
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
      this.userAnalyticsService.trackEvent('playback_err', 'click', 'app-audio-player-cmp');
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
    const item: PlayQueueItem = this.playQueue.add({status: Status.Paused, track: {id: lastTrack.id}}, {at: 0});
    item.track.fetch().then((track: Track) => {
      this.audio.src = track.getResourceUrl();
    });
    this.audio.currentTime = lastTrack.currentTime;
    this.timeTick = lastTrack.currentTime;
    this.duration = lastTrack.duration;
  }

  private setMobileMediaNotification(track: Track) {
    if ('mediaSession' in navigator) {
      const nv: any = navigator;
      const artwork: SoundcloudImageModel = track.image;
      nv.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.user.username,
        artwork: [
          {src: artwork.getDefaultSize(), sizes: '96x96', type: 'image/jpg'},
          {src: artwork.getDefaultSize(), sizes: '128x128', type: 'image/jpg'},
          {src: artwork.getDefaultSize(), sizes: '192x192', type: 'image/jpg'},
          {src: artwork.getImageByFormat('t300x300'), sizes: '256x256', type: 'image/jpg'},
          {src: artwork.getImageByFormat('crop'), sizes: '384x384', type: 'image/jpg'},
          {src: artwork.getLargeSize(), sizes: '512x512', type: 'image/jpg'},
        ]
      });
      this.userAnalyticsService.trackEvent('set_notification_chrome_mob', 'click', 'app-audio-player-cmp');
      if (this.playQueue.hasPreviousItem()) {
        nv.mediaSession.setActionHandler('previoustrack', () => {
          this.userAnalyticsService.trackEvent('previous_track_chrome_mob', 'click', 'app-audio-player-cmp');
          this.previousTrack();
        });
      }
      if (this.playQueue.hasNextItem()) {
        this.userAnalyticsService.trackEvent('next_track_chrome_mob', 'click', 'app-audio-player-cmp');
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
    switch (item.status) {
      case Status.Playing:
        this.startAudioPlayer(item);
        break;
      case Status.Stopped:
        this.stopAudioPlayer();
        break;
      case Status.Paused:
        this.pauseAudioPlayer();
        break;
    }
  }

  // setVolume(volume: number) {
  //   this.audio.volume = volume;
  // }
  //
  // saveVolume(volume: number) {
  //   const roundedVolumeStr = (Math.round(volume * 10) / 10).toString();
  //   localforage.setItem('sc_volume', roundedVolumeStr);
  // }

  playTrack(playQueueItem: PlayQueueItem | null): void {
    this.userAnalyticsService.trackEvent('play_track', 'click', 'app-audio-player-cmp');
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
    this.userAnalyticsService.trackEvent('pause_track', 'click', 'app-audio-player-cmp');
    const track = this.playQueue.getPlayingItem();
    if (track) {
      track.pause();
    }
    this.pauseAudioPlayer();
  }

  togglePlayPause(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      if (currItem.isPlaying()) {
        currItem.pause();
      } else {
        currItem.play();
      }
    }
  }

  previousTrack(): void {
    this.userAnalyticsService.trackEvent('next_track', 'click', 'app-audio-player-cmp');
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
    this.userAnalyticsService.trackEvent('previous_track', 'click', 'app-audio-player-cmp');
    if (this.playQueue.hasNextItem()) {
      this.timeTick = 0;
      this.playTrack(this.playQueue.getNextItem());
    }
  }

  startAudioPlayer(item: PlayQueueItem): void {
    const currTime = this.audio.currentTime;

    if (this.audio.src !== item.track.getResourceUrl()) {
      this.audio.src = item.track.getResourceUrl();
      this.audio.currentTime = 0;
    }

    if (this.hadError) {
      this.audio.src = item.track.getResourceUrl();
      this.audio.load();
      this.audio.currentTime = currTime;
    }

    if (item.track.comments.length === 0) {
      item.track.comments.fetch();
    }

    this.timeTick = this.audio.currentTime;

    this.audio.play();

    this.setMobileMediaNotification(item.track);
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
