import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {AbstractImageModel} from '../../../api/image/abstract-image';
import {filter} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {SessionsCollection} from '../../../api/authenticated-user/sessions/sessions.collection';
import {SessionModel} from '../../../api/authenticated-user/sessions/session.model';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';

declare let MediaMetadata: any;

@Component({
  selector: 'app-player-controls',
  styleUrls: ['./player-controls.scss'],
  templateUrl: './player-controls.html'
})
export class PlayerControlsComponent implements OnInit {
  private _docTitle: string;
  public sessions: SessionsCollection<SessionModel>;
  public currentItem: PlayqueueItemAuxappModel = new PlayqueueItemAuxappModel();
  private _pollTimeInterval;

  @Input()
  public isBuffering: boolean;

  @Input()
  public playQueue: PlayqueueAuxappModel;

  @Input()
  public volume = 100;

  @Input()
  public isInHeadlessMode: boolean;

  @Output()
  public volumeChange: EventEmitter<number>;

  @Output()
  public isInHeadlessModeChange: EventEmitter<boolean>;

  constructor(private humanReadableSecPipe: HumanReadableSecondsPipe,
              private userAnalyticsService: UserAnalyticsService,
              private el: ElementRef,
              private cdr: ChangeDetectorRef,
              public fullScreenService: FullScreenService) {
    this.volumeChange = new EventEmitter<number>();
    this.isInHeadlessModeChange = new EventEmitter<boolean>();
    this.sessions = AuthenticatedUserModel.getInstance().getAuxappAccount().sessions;
    this.currentItem = new PlayqueueItemAuxappModel();
  }

  private setMobileMediaNotification(track: ITrack) {
    if ('mediaSession' in navigator) {
      const nv: any = navigator;
      const artwork: AbstractImageModel = track.image;
      const fallbackImg = '/assets/meta/icons/ios/apple-icon-180x180.png';
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
      if (this.playQueue.items.hasPreviousItem()) {
        nv.mediaSession.setActionHandler('previoustrack', () => {
          this.userAnalyticsService.trackEvent('chrome_mob', 'previous_track', 'app-player-controls-cmp');
          this.previous();
        });
      }
      if (this.playQueue.items.hasNextItem()) {
        nv.mediaSession.setActionHandler('nexttrack', () => {
          this.userAnalyticsService.trackEvent('chrome_mob', 'next_track', 'app-player-controls-cmp');
          this.next();
        });
      }
    }
  }

  private setBrowserTitle(playQueueItem?: PlayqueueItemAuxappModel) {
    if (playQueueItem.isPlaying()) {
      document.title = playQueueItem.track.title;
    } else {
      document.title = this._docTitle;
    }
  }

  private enteredFullScreen() {
    this.userAnalyticsService.trackEvent('player_ctrls', 'entered_fullscreen', 'app-player-controls-cmp');
    this.el.nativeElement.classList.add('full-screen');
  }

  private leftFullScreen() {
    this.el.nativeElement.classList.remove('full-screen');
  }

  public play(): void {
    const currItem = this.playQueue.items.getCurrentItem();
    if (currItem) {
      currItem.play(currItem.progress);
      this.userAnalyticsService.trackEvent('player_ctrls', 'play', 'app-player-controls-cmp');
    }
  }

  public pause(): void {
    const currItem = this.playQueue.items.getPlayingItem();
    if (currItem) {
      currItem.pause();
      this.userAnalyticsService.trackEvent('player_ctrls', 'pause', 'app-player-controls-cmp');
    }
  }

  public togglePlayPause(): void {
    const currItem = this.playQueue.items.getCurrentItem();
    if (currItem) {
      if (currItem.isPlaying()) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  public toggleHeadlessMode() {
    this.isInHeadlessMode = !this.isInHeadlessMode;
    this.isInHeadlessModeChange.emit(this.isInHeadlessMode);
  }

  public previous(): void {
    const playingItem = this.playQueue.items.getPlayingItem();
    if (playingItem && playingItem.progress > 3) {
      playingItem.restart();
      this.userAnalyticsService.trackEvent('player_ctrls', 'restart_track', 'app-player-controls-cmp');
    } else if (this.playQueue.items.hasPreviousItem()) {
      this.playQueue.items.getPreviousItem().play();
      this.userAnalyticsService.trackEvent('player_ctrls', 'previous_track', 'app-player-controls-cmp');
    }
  }

  public next(): void {
    if (this.playQueue.items.hasNextItem()) {
      this.playQueue.items.getNextItem().play();
      this.userAnalyticsService.trackEvent('player_ctrls', 'next_track', 'app-player-controls-cmp');
    }
  }

  public transformProgressBarValues = (input: string) => {
    return this.humanReadableSecPipe.transform(input, null);
  };

  public playTrackFromPosition(from: number) {
    const currItem = this.playQueue.items.getCurrentItem();
    if (currItem) {
      currItem.seekTo(from);
      currItem.save();
    }
  }

  public toggleFullScreen() {
    if (!this.fullScreenService.isInFullScreen()) {
      this.fullScreenService.enter();
    } else {
      this.fullScreenService.leave();
    }
  }

  public toggleShuffle() {
    if (this.playQueue.items.isShuffled()) {
      this.playQueue.items.deShuffle();
      this.userAnalyticsService.trackEvent('player_ctrls', 'deshuffle', 'app-player-controls-cmp');
    } else {
      this.playQueue.items.shuffle();
      this.userAnalyticsService.trackEvent('player_ctrls', 'shuffle', 'app-player-controls-cmp');
    }
  }

  public toggleLoop() {
    if (this.playQueue.items.isLooped()) {
      this.playQueue.items.setLoopPlayQueue(false);
      this.userAnalyticsService.trackEvent('player_ctrls', 'disable_loop', 'app-player-controls-cmp');
    } else {
      this.playQueue.items.setLoopPlayQueue(true);
      this.userAnalyticsService.trackEvent('player_ctrls', 'enable_loop', 'app-player-controls-cmp');
    }
  }

  public setVolume(volume: number) {
    this.volumeChange.emit(volume);
  }

  ngOnInit(): void {
    this._docTitle = document.title;
    this.playQueue.items.on('update change:status', (model: PlayqueueItemAuxappModel, status: PlayQueueItemStatus) => {
      if (status === PlayQueueItemStatus.Playing || status === PlayQueueItemStatus.Paused) {
        this.currentItem = this.playQueue.items.getCurrentItem();
        this.setMobileMediaNotification(this.currentItem.track);
        this.setBrowserTitle(this.currentItem);
      }
      if (model instanceof PlayqueueItemAuxappModel && model.isPaused() && this._pollTimeInterval) {
        clearTimeout(this._pollTimeInterval);
      }
    });

    this.playQueue.items.on('add sync', () => {
      const currentItem = this.playQueue.items.getCurrentItem();
      if (currentItem) {
        this.currentItem = this.playQueue.items.getCurrentItem();
      }
    });

    this.playQueue.items.on('reset', () => {
      this.currentItem = new PlayqueueItemAuxappModel();
      this.cdr.detectChanges();
    });

    this.fullScreenService.getObservable()
      .pipe(
        filter(eventType => eventType === FullScreenEventType.Enter)
      )
      .subscribe(this.enteredFullScreen.bind(this));

    this.fullScreenService.getObservable()
      .pipe(
        filter(eventType => eventType === FullScreenEventType.Leave)
      )
      .subscribe(this.leftFullScreen.bind(this));
  }

}
