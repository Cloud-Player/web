declare let MediaMetadata: any;

import {Component, Input, OnInit} from '@angular/core';
import {PlayQueueItemStatus} from '../../enums/playqueue-item-status';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {Track} from '../../../tracks/models/track.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {SoundcloudImageModel} from '../../../shared/models/soundcloud-image.model';

@Component({
  selector: 'app-audio-player-controls',
  styleUrls: ['./audio-player-controls.style.scss'],
  templateUrl: './audio-player-controls.template.html'
})

export class AudioPlayerControlsComponent implements OnInit {
  public playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();
  public currentItem: PlayQueueItem = new PlayQueueItem();

  @Input()
  public isBuffering: boolean;

  constructor(private humanReadableSecPipe: HumanReadableSecondsPipe, private userAnalyticsService: UserAnalyticsService) {
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
      if (this.playQueue.hasPreviousItem()) {
        nv.mediaSession.setActionHandler('previoustrack', () => {
          this.userAnalyticsService.trackEvent('previous_track_chrome_mob', 'click', 'app-audio-player-controls-cmp');
          this.previous();
        });
      }
      if (this.playQueue.hasNextItem()) {
        nv.mediaSession.setActionHandler('nexttrack', () => {
          this.userAnalyticsService.trackEvent('next_track_chrome_mob', 'click', 'app-audio-player-controls-cmp');
          this.next();
        });
      }
    }
  }

  public play(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      currItem.play();
      this.userAnalyticsService.trackEvent('play_track', 'click', 'app-audio-player-controls-cmp');
    }
  }

  public pause(): void {
    const currItem = this.playQueue.getPlayingItem();
    if (currItem) {
      currItem.pause();
      this.userAnalyticsService.trackEvent('pause_track', 'click', 'app-audio-player-controls-cmp');
    }
  }

  public togglePlayPause(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      if (currItem.isPlaying()) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  public previous(): void {
    const playingItem = this.playQueue.getPlayingItem();
    if (playingItem && playingItem.progress > 3) {
      playingItem.restart();
      this.userAnalyticsService.trackEvent('restart_track', 'click', 'app-audio-player-controls-cmp');
    } else if (this.playQueue.hasPreviousItem()) {
      this.playQueue.getPreviousItem().play();
      this.userAnalyticsService.trackEvent('previous_track', 'click', 'app-audio-player-controls-cmp');
    }
  }

  public next(): void {
    if (this.playQueue.hasNextItem()) {
      this.playQueue.getNextItem().play();
      this.userAnalyticsService.trackEvent('next_track', 'click', 'app-audio-player-controls-cmp');
    }
  }

  public transformProgressBarValues = (input: string) => {
    return this.humanReadableSecPipe.transform(input, null);
  }

  public playTrackFromPosition(from: number) {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      currItem.seekTo(from);
    }
  }

  ngOnInit(): void {
    this.playQueue.on('change:status', (model: PlayQueueItem, status: PlayQueueItemStatus) => {
      if (status === PlayQueueItemStatus.Playing) {
        this.currentItem = this.playQueue.getCurrentItem();
        this.setMobileMediaNotification(this.currentItem.track);
      }
    });

    this.playQueue.on('add', () => {
      const currentItem = this.playQueue.getCurrentItem();
      if (currentItem) {
        this.currentItem = this.playQueue.getCurrentItem();
      }
    });

    window.addEventListener('playPauseTrackKeyPressed', this.togglePlayPause.bind(this));
    window.addEventListener('nextTrackKeyPressed', this.next.bind(this));
    window.addEventListener('previousTrackKeyPressed', this.previous.bind(this));
  }

}
