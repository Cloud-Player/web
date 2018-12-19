import {
  ChangeDetectorRef,
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
import {filter} from 'rxjs/internal/operators';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';
import {PlayqueueItemAuxappModel} from '../../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';

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
  private _loginToPlayAlertIsOpen = false;
  private _errorRetryInProgress = false;
  private _errorRetryTimeout: any;


  @ViewChild('playerContainer', {read: ViewContainerRef})
  private container: ViewContainerRef;

  @Input()
  public playQueue: PlayqueueAuxappModel;

  @Output()
  public playerStatusChange: EventEmitter<PlayerStatus> = new EventEmitter();

  public loginRequired = false;
  public accountForLogin: IAuthenticatedUserAccount;

  constructor(private resolver: ComponentFactoryResolver,
              private el: ElementRef,
              private fullScreenService: FullScreenService,
              private userAnalyticsService: UserAnalyticsService,
              private cdr: ChangeDetectorRef) {
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

  private handlePlayerStatusChange(newStatus: PlayerStatus, playQueueItem: PlayqueueItemAuxappModel) {
    switch (newStatus) {
      case PlayerStatus.Playing:
        this.userAnalyticsService.trackEvent(
          'player', `${this.playQueue.items.getCurrentItem().track.provider_id}:is_playing`, 'app-player-manager');
        playQueueItem.status = PlayQueueItemStatus.Playing;
        this._errorRetryCounter = 0;
        this._loginToPlayAlertIsOpen = false;
        break;
      case PlayerStatus.Paused:
        this.userAnalyticsService.trackEvent(
          'player', `${this.playQueue.items.getCurrentItem().track.provider_id}:paused`, 'app-player-manager');
        playQueueItem.status = PlayQueueItemStatus.Paused;
        break;
      case PlayerStatus.Stopped:
        playQueueItem.status = PlayQueueItemStatus.Stopped;
        break;
      case PlayerStatus.Ended:
        this.userAnalyticsService.trackEvent(
          'player', `${this.playQueue.items.getCurrentItem().track.provider_id}:ended`, 'app-player-manager');
        if (this.playQueue.items.hasNextItem()) {
          this.playQueue.items.getNextItem().play();
        } else {
          this.playQueue.items.getCurrentItem().stop();
        }
        break;
      case PlayerStatus.Error:
        this.userAnalyticsService.trackEvent(
          'player', `error:${this._activePlayer.instance.getError()}`, 'app-player-manager');
        const currentItem = this.playQueue.items.getCurrentItem();
        if (currentItem && currentItem.isPlaying()) {
          this.playQueue.items.getCurrentItem().pause();
          if (!this._errorRetryInProgress) {
            this.retryOnError();
          }
        }
        break;
      case PlayerStatus.LoginRequired:
        if (!this._loginToPlayAlertIsOpen) {
          if (this.playQueue.items.getCurrentItem()) {
            const currentUserAccounts = AuthenticatedUserModel.getInstance().accounts;
            const trackProvider = this.playQueue.items.getCurrentItem().track.provider_id;
            const accountForTrack = currentUserAccounts.getAccountForProvider(trackProvider);
            if (accountForTrack) {
              this.loginRequired = true;
              this.accountForLogin = accountForTrack;
            }
          }
        }
        break;
    }
    this._playerStatus = status;
    this.playerStatusChange.emit(newStatus);
    this.cdr.detectChanges();
  }

  private unBindListeners() {
    this._playerSubscriptions.unsubscribe();
    this._playerSubscriptions = new Subscription();
  }

  private retryOnError() {
    this._errorRetryInProgress = true;
    console.warn('RETRY AFTER ERROR');
    const currentItem = this.playQueue.items.getCurrentItem();
    const progress = currentItem.progress;

    if (currentItem.status === PlayQueueItemStatus.Playing) {
      this._errorRetryCounter = 0;
      this._errorRetryInProgress = false;
      return;
    }

    if (this._errorRetryCounter > 3) {
      console.error('[Player Manager] Error could not be resolved, play next track!');
      this._errorRetryInProgress = false;
      this.userAnalyticsService.trackEvent('player', 'error_resolve_timeout', 'app-player-manager');
      if (this.playQueue.items.hasNextItem()) {
        this.playQueue.items.getNextItem().play();
        this._errorRetryCounter = 0;
      }
      return;
    }
    this._errorRetryCounter++;
    if (this._activePlayer) {
      this._activePlayer.instance.deInitialize();
      this._activePlayer = null;
    }
    currentItem.play(progress).then(() => {
      if (this._errorRetryTimeout) {
        clearTimeout(this._errorRetryTimeout);
      }
      this._errorRetryCounter = 0;
      this._errorRetryInProgress = false;
      this.userAnalyticsService.trackEvent('player', 'resolved_player_error', 'app-player-manager');
    });

    this._errorRetryTimeout = setTimeout(() => {
      this.retryOnError();
    }, 1000);
  }

  private bindListeners(player: IPlayer): void {
    this.unBindListeners();

    this._playerSubscriptions.add(player.currentTimeChange
      .subscribe(ev => {
        ev.item.progress = ev.progress;
      })
    );

    this._playerSubscriptions.add(
      player.durationChange
        .subscribe((ev) => {
          ev.item.duration = ev.duration;
        })
    );

    this._playerSubscriptions.add(
      player.currentTimeChange
        .pipe(
          filter((ev) => {
            if (player.getDuration()) {
              return ev.progress >= (player.getDuration() - this._prepareTime);
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
          filter(ev => {
            if (player.getDuration() > this._fadeDuration) {
              return ev.progress >= player.getDuration() - this._fadeDuration;
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
        .subscribe((status) => {
          this.handlePlayerStatusChange(status.newStatus, status.item);
        })
    );

    const currentDuration = player.getDuration();
    const item = this.playQueue.items.get(player.playQueueItem);

    if (item && isNumber(currentDuration) && currentDuration > 0) {
      item.duration = player.getDuration();
    }
    this.handlePlayerStatusChange(player.getStatus(), player.playQueueItem);
  }

  private crossFade() {
    const currentPlayer = this._activePlayer;
    const nextPlayer = this._upcomingPlayer;

    if (nextPlayer &&
      nextPlayer.instance.supportsCrossfade &&
      nextPlayer.instance.isAbleToPlay()) {
      nextPlayer.instance.play().then(() => {
        nextPlayer.instance.setSize(PlayerFactory.getPlayerSize(nextPlayer.instance.playQueueItem.track));
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
      if (this._upcomingPlayer && this._upcomingPlayer.instance.playQueueItem.track.id === upcoming.track.id) {
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
          upcoming.track.provider_id === this._activePlayer.instance.playQueueItem.track.provider_id) {
          return;
        }
        this._upcomingPlayer = this._playerFactory.createPlayer(upcoming);
        this._upcomingPlayer.instance.setOpacity(0);
        this._upcomingPlayer.instance.setVolume(0);
        this._upcomingPlayer.instance.addClass('upcoming');
      }
    }
  }

  private setPlayQueueItemToStopped(playQueueItem: PlayqueueItemAuxappModel) {
    const item = this.playQueue.items.get(playQueueItem);
    if (item && playQueueItem.status === PlayQueueItemStatus.RequestedStop) {
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

    const playerSize = PlayerFactory.getPlayerSize(newPlayer.instance.playQueueItem.track);
    this.setHeight(playerSize.height);
    newPlayer.instance.setSize(playerSize);

    const item = newPlayer.instance.playQueueItem;
    this.playQueue.items.setPlayIndex(item);
    this.playQueue.items.stopItemsBeforeAndScheduleAfter(item);

    this.bindListeners(newPlayer.instance);

    this._activePlayer = newPlayer;
    this._upcomingPlayer = null;
  }

  private reusePlayer(existingPlayer: ComponentRef<IPlayer>, playQueueItem: PlayqueueItemAuxappModel, startTime?: number) {
    this.setPlayQueueItemToStopped(existingPlayer.instance.playQueueItem);
    existingPlayer.instance.updatePlayQueueItem(playQueueItem).then(() => {
      this.activatePlayer(existingPlayer, this._upcomingPlayer, startTime);
    });
  }

  private removePlayer(player: ComponentRef<IPlayer>) {
    this.setPlayQueueItemToStopped(player.instance.playQueueItem);
    player.instance.removeClass('upcoming');
    player.instance.removeClass('active');
    this._playerFactory.destroyPlayer(player);
  }

  private startPlayerFor(playQueueItem: PlayqueueItemAuxappModel, startTime: number = 0) {
    const activePlayer: ComponentRef<IPlayer> = this._activePlayer;
    const nextPlayer: ComponentRef<IPlayer> = this._upcomingPlayer;

    if (activePlayer && activePlayer.instance.playQueueItem.track.id === playQueueItem.track.id) {
      /*
       * 1. PlayQueueItem track id is the one from current player -> just trigger play
       */
      activePlayer.instance.pause();
      activePlayer.instance.updatePlayQueueItem(playQueueItem);
      this.playQueue.items.setPlayIndex(playQueueItem);
      this.playQueue.items.stopItemsBeforeAndScheduleAfter(playQueueItem);
      activePlayer.instance.setVolume(this._volume);
      activePlayer.instance.play(startTime);
      activePlayer.instance.addClass('active');
      activePlayer.instance.setOpacity(null);
    } else if (nextPlayer && nextPlayer.instance.playQueueItem.track.id === playQueueItem.track.id && nextPlayer.instance.isAbleToPlay()) {
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

    if (activePlayer && playQueueItem !== activePlayer.instance.playQueueItem) {
      activePlayer.instance.playQueueItem = playQueueItem;
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
        this.loginRequired = false;
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
      const playerSize = PlayerFactory.getPlayerSize(this._activePlayer.instance.playQueueItem.track);
      this._activePlayer.instance.setSize(playerSize);
      this.setHeight(playerSize.height);
    }
    if (this._upcomingPlayer) {
      this._upcomingPlayer.instance.setSize(PlayerFactory.getPlayerSize(this._upcomingPlayer.instance.playQueueItem.track));
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

  public setInHeadlessMode(isHeadless: boolean, canAutoplay = true) {
    if (this._playerFactory.isInHeadlessMode() !== isHeadless) {
      this._playerFactory.setInHeadlessMode(isHeadless);
      const currentItem = this.playQueue.items.getCurrentItem();
      if (currentItem) {
        const player = this._playerFactory.createPlayer(this.playQueue.items.getCurrentItem());
        const startPlayer = currentItem.isPlaying() && canAutoplay;
        this.activatePlayer(player, this._activePlayer, currentItem.progress, startPlayer);
      }
    }
  }

  public onLoginChange(isLoggedIn) {
    if (isLoggedIn) {
      this.loginRequired = false;
      this._loginToPlayAlertIsOpen = false;

      setTimeout(() => {
        if (this.playQueue.items.getCurrentItem()) {
          if (this._activePlayer) {
            this._playerFactory.destroyPlayer(this._activePlayer, true);
            this._activePlayer = null;
          }
          this.playQueue.items.getCurrentItem().play(0);
        }
      }, 3000);
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

    this.playQueue.items.on('reset', () => {
      if (this._activePlayer) {
        this.removePlayer(this._activePlayer);
        this._activePlayer = null;
      }
      if (this._upcomingPlayer) {
        this.removePlayer(this._upcomingPlayer);
        this._upcomingPlayer = null;
      }
      this.loginRequired = false;
      this.setHeight(0);
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
