import {PlayQueueItem} from '../../models/play-queue-item';
import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayQueue} from '../../collections/play-queue';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {AbstractImageModel} from '../../../api/image/abstract-image';

declare let MediaMetadata: any;

@Component({
  selector: 'app-player-controls',
  styleUrls: ['./player-controls.scss'],
  templateUrl: './player-controls.html'
})
export class PlayerControlsComponent implements OnInit {
  public currentItem: PlayQueueItem = new PlayQueueItem();

  @Input()
  public isBuffering: boolean;

  @Input()
  public playQueue: PlayQueue<PlayQueueItem>;

  constructor(private humanReadableSecPipe: HumanReadableSecondsPipe,
              private userAnalyticsService: UserAnalyticsService,
              private el: ElementRef,
              public fullScreenService: FullScreenService) {
  }

  private setMobileMediaNotification(track: ITrack) {
    if ('mediaSession' in navigator) {
      const nv: any = navigator;
      const artwork: AbstractImageModel = track.image;
      const fallbackImg = 'assets/meta/icons/ios/apple-icon-180x180.png';
      nv.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist.getFullName(),
        artwork: [
          {src: artwork.getSmallSizeUrl() || fallbackImg, sizes: '96x96', type: 'image/jpg'},
          {src: artwork.getSmallSizeUrl() || fallbackImg, sizes: '128x128', type: 'image/jpg'},
          {src: artwork.getMediumSizeUrl() || fallbackImg, sizes: '192x192', type: 'image/jpg'},
          {src: artwork.getMediumSizeUrl() || fallbackImg, sizes: '256x256', type: 'image/jpg'},
          {src: artwork.getLargeSizeUrl() || fallbackImg, sizes: '384x384', type: 'image/jpg'},
          {src: artwork.getLargeSizeUrl() || fallbackImg, sizes: '512x512', type: 'image/jpg'}
        ]
      });
      if (this.playQueue.hasPreviousItem()) {
        nv.mediaSession.setActionHandler('previoustrack', () => {
          this.userAnalyticsService.trackEvent('previous_track_chrome_mob', 'click', 'app-player-controls-cmp');
          this.previous();
        });
      }
      if (this.playQueue.hasNextItem()) {
        nv.mediaSession.setActionHandler('nexttrack', () => {
          this.userAnalyticsService.trackEvent('next_track_chrome_mob', 'click', 'app-player-controls-cmp');
          this.next();
        });
      }
    }
  }

  private enteredFullScreen() {
    this.userAnalyticsService.trackEvent('fullscreen', 'entered', 'app-player-controls-cmp');
    this.el.nativeElement.classList.add('full-screen');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('full-screen');
  }

  public play(): void {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      currItem.play(currItem.progress);
      this.userAnalyticsService.trackEvent('play_track', 'click', 'app-player-controls-cmp');
    }
  }

  public pause(): void {
    const currItem = this.playQueue.getPlayingItem();
    if (currItem) {
      currItem.pause();
      this.userAnalyticsService.trackEvent('pause_track', 'click', 'app-player-controls-cmp');
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
      this.userAnalyticsService.trackEvent('restart_track', 'click', 'app-player-controls-cmp');
    } else if (this.playQueue.hasPreviousItem()) {
      this.playQueue.getPreviousItem().play();
      this.userAnalyticsService.trackEvent('previous_track', 'click', 'app-player-controls-cmp');
    }
  }

  public next(): void {
    if (this.playQueue.hasNextItem()) {
      this.playQueue.getNextItem().play();
      this.userAnalyticsService.trackEvent('next_track', 'click', 'app-player-controls-cmp');
    }
  }

  public transformProgressBarValues = (input: string) => {
    return this.humanReadableSecPipe.transform(input, null);
  };

  public playTrackFromPosition(from: number) {
    const currItem = this.playQueue.getCurrentItem();
    if (currItem) {
      currItem.seekTo(from);
    }
  }

  public toggleFullScreen() {
    if (!this.fullScreenService.isInFullScreen()) {
      this.userAnalyticsService.trackEvent('fullscreen', 'request', 'app-player-controls-cmp');
      this.fullScreenService.enter();
    } else {
      this.fullScreenService.leave();
    }
  }

  ngOnInit(): void {
    this.playQueue.on('change:status', (model: PlayQueueItem, status: PlayQueueItemStatus) => {
      if (status === PlayQueueItemStatus.RequestedPlaying) {
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

    this.fullScreenService.getObservable()
      .filter(eventType => eventType === FullScreenEventType.Enter)
      .subscribe(this.enteredFullScreen.bind(this));

    this.fullScreenService.getObservable()
      .filter(eventType => eventType === FullScreenEventType.Leave)
      .subscribe(this.leftFullScreen.bind(this));
  }

}
