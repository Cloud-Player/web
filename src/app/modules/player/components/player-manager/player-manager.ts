import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerStatus} from '../../src/player-status.enum';
import {IPlayer} from '../../src/player.interface';
import {PlayQueueItemStatus} from '../../src/playqueue-item-status.enum';
import {PlayerFactory} from '../../src/player-factory.class';
import {isNumber} from 'underscore';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {EaseService} from '../../../shared/services/ease.service';
import {FullScreenEventType, FullScreenService} from '../../../shared/services/fullscreen.service';
import {ITrack} from '../../../api/tracks/track.interface';
import {filter} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';

@Component({
  selector: 'app-player-manager',
  styleUrls: ['./player-manager.scss'],
  templateUrl: './player-manager.html'
})
export class PlayerManagerComponent implements OnInit {
  private _fadeDuration = 5;
  private _prepareTime = 30;
  private _volume = 1;
  private _errorRetryCounter = 0;
  private _playerStatus;
  private _playerSubscriptions;
  private _playerFactory: PlayerFactory;
  private _activePlayer: ComponentRef<IPlayer>;
  private _upcomingPlayer: ComponentRef<IPlayer>;
  private _sizeBeforeFullScreen: number = PlayerFactory.playerWidth;

  @ViewChild('playerContainer', {read: ViewContainerRef})
  private container: ViewContainerRef;

  @Input()
  public playQueue: PlayqueueAuxappModel;

  @Output()
  public playerStatusChange: EventEmitter<PlayerStatus> = new EventEmitter();

  constructor(private resolver: ComponentFactoryResolver,
              private el: ElementRef,
              private fullScreenService: FullScreenService,
              private userAnalyticsService: UserAnalyticsService) {
    this._playerSubscriptions = new Subscription();
    this._playerFactory = new PlayerFactory(this.resolver);
  }

  private setHeight(height: number) {
    const playerCtrlEl = this.el.nativeElement.querySelector('.player-controller');
    if (playerCtrlEl) {
      playerCtrlEl.style.height = `${height}px`;
    } else {
      console.warn('[PlayerManager:setHeight] No player controller element was found');
    }
  }

  private handlePlayerStatusChange(newStatus: PlayerStatus) {
    switch (newStatus) {
      case PlayerStatus.Playing:
        this.userAnalyticsService.trackEvent('player', `${this.playQueue.items.getCurrentItem().track.provider}:is_playing`, 'app-player-manager');
        this.playQueue.items.getCurrentItem().status = PlayQueueItemStatus.Playing;
        this._errorRetryCounter = 0;
        break;
      case PlayerStatus.Paused:
        this.userAnalyticsService.trackEvent('player', `${this.playQueue.items.getCurrentItem().track.provider}:paused`, 'app-player-manager');
        this.playQueue.items.getCurrentItem().status = PlayQueueItemStatus.Paused;
        break;
      case PlayerStatus.Stopped:
        this.playQueue.items.getCurrentItem().status = PlayQueueItemStatus.Stopped;
        break;
      case PlayerStatus.Ended:
        this.userAnalyticsService.trackEvent('player', `${this.playQueue.items.getCurrentItem().track.provider}:ended`, 'app-player-manager');
        if (this.playQueue.items.hasNextItem()) {
          this.playQueue.items.getNextItem().play();
        } else {
          this.playQueue.items.getCurrentItem().stop();
        }
        break;
      case PlayerStatus.Error:
        this.userAnalyticsService.trackEvent('player', `error:${this._activePlayer.instance.getError()}`, 'app-player-manager');
        const currentItem = this.playQueue.items.getCurrentItem();
        if (currentItem && currentItem.isPlaying()) {
          this.playQueue.items.getCurrentItem().pause();
          this.retryOnError();
        }
        break;
    }
    this._playerStatus = status;
    this.playerStatusChange.emit(newStatus);
  }

  private unBindListeners() {
    this._playerSubscriptions.unsubscribe();
    this._playerSubscriptions = new Subscription();
  }

  private retryOnError() {
    const currentItem = this.playQueue.items.getCurrentItem();
    const progress = currentItem.progress;
    if (this._errorRetryCounter > 2) {
      this.userAnalyticsService.trackEvent('player', 'error_resolve_timeout', 'app-player-manager');
      return;
    }
    this._errorRetryCounter++;
    if (this._activePlayer) {
      this._activePlayer.instance.deInitialize();
      this._activePlayer = null;
    }
    currentItem.play(progress).then(() => {
      this.userAnalyticsService.trackEvent('player', 'resolved_player_error', 'app-player-manager');
    });
  }

  private bindListeners(player: IPlayer): void {
    this.unBindListeners();

    this._playerSubscriptions.add(player.currentTimeChange
      .subscribe(currentTime => {
        this.playQueue.items.getItemByTrackId(player.track.id).progress = currentTime;
      })
    );

    this._playerSubscriptions.add(
      player.currentTimeChange
        .pipe(
          filter((currentTime: number) => {
            if (player.getDuration()) {
              return currentTime >= (player.getDuration() - this._prepareTime);
            }
          })
        )
        .subscribe(currentTime => {
          this.prepareNextPlayer();
        })
    );

    const crossFadeSubscription = this._playerSubscriptions.add(
      player.currentTimeChange
        .pipe(
          filter(currentTime => {
            if (player.getDuration() > this._fadeDuration) {
              return currentTime >= player.getDuration() - this._fadeDuration;
            } else {
              return false;
            }
          })
        )
        .subscribe(() => {
          crossFadeSubscription.unsubscribe();
          this.crossFade();
        })
    );

    this._playerSubscriptions.add(
      player.statusChange
        .subscribe((status: PlayerStatus) => {
          this.handlePlayerStatusChange(status);
        })
    );

    this._playerSubscriptions.add(
      player.durationChange
        .subscribe(() => {
          this.playQueue.items.getItemByTrackId(player.track.id).duration = player.getDuration();
        })
    );

    const currentDuration = player.getDuration();
    if (isNumber(currentDuration) && currentDuration > 0) {
      this.playQueue.items.getItemByTrackId(player.track.id).duration = player.getDuration();
    }
    this.handlePlayerStatusChange(player.getStatus());
  }

  private crossFade() {
    const currentPlayer = this._activePlayer;
    const nextPlayer = this._upcomingPlayer;

    if (nextPlayer &&
      nextPlayer.instance.supportsCrossfade &&
      nextPlayer.instance.isAbleToPlay()) {
      nextPlayer.instance.play().then(() => {
        nextPlayer.instance.setSize(PlayerFactory.getPlayerSize(nextPlayer.instance.track));
        nextPlayer.instance.setVolume(this._volume);
        nextPlayer.instance.fadeIn(this._fadeDuration * 1000);
        currentPlayer.instance.fadeOut(this._fadeDuration * 1000);
        EaseService.easeInCirc(0, 1, (this._fadeDuration - 1) * 1000)
          .subscribe((value: number) => {
            nextPlayer.instance.setOpacity(value);
          });
      });
    }
  }

  private prepareNextPlayer() {
    const upcoming: PlayqueueItemAuxappModel = this.playQueue.items.getNextItem();

    if (upcoming) {
      if (this._upcomingPlayer && this._upcomingPlayer.instance.track.id === upcoming.track.id) {
        // Player is already prepared for the next track so do nothig
        return;
      } else {
        if (this._upcomingPlayer) {
          // Upcoming track has been changed so remove the previous prepared player
          this.removePlayer(this._upcomingPlayer);
        }

        // In case provider does not support multiple player instances like Mixcloud do not initialise a new instance
        if (this._activePlayer &&
          !this._activePlayer.instance.supportsMultiplePlayerInstances &&
          upcoming.track.provider === this._activePlayer.instance.track.provider) {
          return;
        }
        this._upcomingPlayer = this._playerFactory.createPlayer(upcoming);
        this._upcomingPlayer.instance.setOpacity(0);
        this._upcomingPlayer.instance.setVolume(0);
        this._upcomingPlayer.instance.addClass('upcoming');
      }
    }
  }

  private setPlayQueueItemToStopped(track: ITrack) {
    const playQueueItem = this.playQueue.items.getItemByTrackId(track.id);
    if (playQueueItem && playQueueItem.status === PlayQueueItemStatus.RequestedStop) {
      playQueueItem.status = PlayQueueItemStatus.Stopped;
    }
  }

  private activatePlayer(newPlayer: ComponentRef<IPlayer>, oldPlayer?: ComponentRef<IPlayer>, startTime?: number, canPlay: boolean = true) {
    this.unBindListeners();

    if (oldPlayer) {
      this.removePlayer(oldPlayer);
    }

    if (canPlay) {
      newPlayer.instance.setVolume(this._volume);
      if (newPlayer.instance.getStatus() !== PlayerStatus.Playing) {
        newPlayer.instance.play(startTime);
      }
    } else {
      newPlayer.instance.setVolume(0);
      newPlayer.instance.seekTo(startTime);
    }

    newPlayer.instance.addClass('active');
    newPlayer.instance.removeClass('upcoming');
    newPlayer.instance.setOpacity(null);

    const playerSize = PlayerFactory.getPlayerSize(newPlayer.instance.track);
    this.setHeight(playerSize.height);
    newPlayer.instance.setSize(playerSize);

    this.bindListeners(newPlayer.instance);

    this._activePlayer = newPlayer;
    this._upcomingPlayer = null;
  }

  private reusePlayer(existingPlayer: ComponentRef<IPlayer>, playQueueItem: PlayqueueItemAuxappModel, startTime?: number) {
    this.setPlayQueueItemToStopped(existingPlayer.instance.track);
    existingPlayer.instance.updateTrack(playQueueItem.track).then(() => {
      this.activatePlayer(existingPlayer, this._upcomingPlayer, startTime);
    });
  }

  private removePlayer(player: ComponentRef<IPlayer>) {
    this.setPlayQueueItemToStopped(player.instance.track);
    player.instance.removeClass('upcoming');
    player.instance.removeClass('active');
    this._playerFactory.destroyPlayer(player);
  }

  private startPlayerFor(playQueueItem: PlayqueueItemAuxappModel, startTime: number = 0) {
    const activePlayer: ComponentRef<IPlayer> = this._activePlayer;
    const nextPlayer: ComponentRef<IPlayer> = this._upcomingPlayer;

    if (activePlayer && activePlayer.instance.track.id === playQueueItem.track.id) {
      /*
       * 1. PlayQueueItem track id is the one from current player -> just trigger play
       */
      activePlayer.instance.setVolume(this._volume);
      activePlayer.instance.play(startTime);
      activePlayer.instance.addClass('active');
    } else if (nextPlayer && nextPlayer.instance.track.id === playQueueItem.track.id && nextPlayer.instance.isAbleToPlay()) {
      /*
       * 2. NextPlayer for PlayQueueTrack does exist and is able to play so start that one
       */
      this.activatePlayer(nextPlayer, activePlayer, startTime);
    } else if (activePlayer && this._playerFactory.canReusePlayer(activePlayer, playQueueItem)) {
      /*
       * 3. Existing player does exist and can be reused
       */
      this.reusePlayer(activePlayer, playQueueItem, startTime);
    } else {
      /*
       * 4. Create a new player
       */
      const newPlayer = this._playerFactory.createPlayer(playQueueItem);
      this.activatePlayer(newPlayer, activePlayer, startTime);
    }
  }

  private pausePlayer() {
    if (this._activePlayer) {
      this._activePlayer.instance.pause();
    }

    // In case pause is triggered during the crossfade progress
    // make sure that the upcoming player ist stopped so it starts from the beginning when
    if (this._upcomingPlayer) {
      this._upcomingPlayer.instance.stop();
    }
  }

  private stopPlayer() {
    if (this._activePlayer) {
      this._activePlayer.instance.stop();
    }
  }

  private reactOnPlayQueueChange(item: PlayqueueItemAuxappModel): void {
    switch (item.status) {
      case PlayQueueItemStatus.RequestedPlaying:
        this.startPlayerFor(item, item.progress);
        break;
      case PlayQueueItemStatus.RequestedSeek:
        if (this._activePlayer) {
          this._activePlayer.instance.seekTo(item.seekToSeconds);
        } else {
          this.startPlayerFor(item, item.progress);
        }
        break;
      case PlayQueueItemStatus.RequestedStop:
        if (item === this.playQueue.items.getCurrentItem()) {
          this.stopPlayer();
        }
        break;
      case PlayQueueItemStatus.RequestedPause:
        if (item === this.playQueue.items.getCurrentItem()) {
          this.pausePlayer();
        }
        break;
    }
  }

  private updatePlayerWidth(width: number) {
    PlayerFactory.playerWidth = width;
    if (this._activePlayer) {
      const playerSize = PlayerFactory.getPlayerSize(this._activePlayer.instance.track);
      this._activePlayer.instance.setSize(playerSize);
      this.setHeight(playerSize.height);
    }
    if (this._upcomingPlayer) {
      this._upcomingPlayer.instance.setSize(PlayerFactory.getPlayerSize(this._upcomingPlayer.instance.track));
    }
  }

  private enteredFullScreen() {
    this._sizeBeforeFullScreen = PlayerFactory.playerWidth;
    this.updatePlayerWidth(screen.width);
  }

  private leftFullScreen() {
    this.updatePlayerWidth(this._sizeBeforeFullScreen);
  }

  public hasActivePlayer(): boolean {
    return !!this._activePlayer;
  }

  public setVolume(volume) {
    if (this._activePlayer) {
      this._activePlayer.instance.setVolume(volume);
    }
    if (this._upcomingPlayer) {
      this._upcomingPlayer.instance.setVolume(volume);
    }
    this._volume = volume;
  }

  public seekActivePlayerTrackTo(seekTo: number) {
    if (this._activePlayer) {
      this._activePlayer.instance.seekTo(seekTo);
    }
  }

  public isInHeadlessMode(): boolean {
    return this._playerFactory.isInHeadlessMode();
  }

  public setInHeadlessMode(isHeadless: boolean) {
    this._playerFactory.setInHeadlessMode(isHeadless);
    const currentItem = this.playQueue.items.getCurrentItem();
    if (currentItem) {
      const player = this._playerFactory.createPlayer(this.playQueue.items.getCurrentItem());
      this.activatePlayer(player, this._activePlayer, currentItem.progress, currentItem.isPlaying());
    }
  }

  ngOnInit(): void {
    this._playerFactory.setContainer(this.container);

    this.playQueue.items.setLoopPlayQueue(true);
    this.playQueue.items.on('change:status', this.reactOnPlayQueueChange, this);
    this.playQueue.items.on('sync', () => {
      const firstPlayQueueItem = this.playQueue.items.getCurrentItem();
      if (!this._activePlayer && firstPlayQueueItem) {
        const firstPlayer = this._playerFactory.createPlayer(firstPlayQueueItem);
        this.activatePlayer(firstPlayer, this._activePlayer, firstPlayQueueItem.progress, false);
      }
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
