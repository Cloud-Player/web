import {Observable} from 'rxjs';
import {ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNumber, isString, throttle} from 'underscore';
import {PlayerStatus} from './player-status.enum';
import {EaseService} from '../../shared/services/ease.service';
import {IPlayerOptions, IPlayerSize, IPlayerUpdates} from './player.interface';
import {ITrack} from '../../api/tracks/track.interface';
import {filter} from 'rxjs/internal/operators';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';

export abstract class AbstractPlayer implements IPlayerUpdates, OnInit {
  private _duration: number;
  private _currentTime: number;
  private _volume: number;
  private _status: PlayerStatus;
  private _ableToPlay: boolean;
  private _initialised = false;
  private _initialisePromise: Promise<any>;
  private _subscriptionsPerState = {};
  private _viewReadyPromise: Promise<any>;
  private _viewReadyResolver: Function;
  private _ngOnInitCompleted = false;
  private _playerIsInitialised = false;
  private _playerSdkIsInitialised = false;
  private _allowedToPlay = false;
  private _initialiseCallbacks: Function[] = [];
  private _size: IPlayerSize = {width: 0, height: 0};
  private _error: string;
  private _throttledTimeUpdate = throttle(this.emitTimeChange.bind(this), 900);
  private _forcePlayStart = false;
  private _forcePlayStartTry = 0;
  private _seekTo = null;
  private _initialTrackDuration = 0;
  private _playQueueItem: PlayqueueItemAuxappModel;

  protected track: ITrack;

  // @Input()
  // public track: ITrack;

  @Input()
  public set playQueueItem(playQueueItem: PlayqueueItemAuxappModel) {
    this.updatePlayQueueItem(playQueueItem);
  }

  public get playQueueItem() {
    return this._playQueueItem;
  }

  @Output()
  public durationChange: EventEmitter<{ duration: number, item: PlayqueueItemAuxappModel }> = new EventEmitter();

  @Output()
  public currentTimeChange: EventEmitter<{ progress: number, item: PlayqueueItemAuxappModel }> = new EventEmitter();

  @Output()
  public statusChange: EventEmitter<{ newStatus: PlayerStatus, item: PlayqueueItemAuxappModel }> = new EventEmitter();

  public isHeadlessPlayer = false;

  protected abstract initialisePlayerSDK(): Promise<any>;

  protected abstract initialisePlayer(options?: IPlayerOptions): Promise<any>;

  protected abstract deInitialisePlayer(): void;

  protected abstract bindListeners(): void;

  protected abstract unBindListeners(): void;

  protected abstract setPlayerVolume(volume: number): void;

  protected abstract setPlayerSize(size: IPlayerSize): void;

  protected abstract startPlayer(): void;

  protected abstract pausePlayer(): void;

  protected abstract stopPlayer(): void;

  protected abstract seekPlayerTo(to: number): void;

  protected abstract preloadTrack(track: ITrack, startTime?: number): void;

  protected abstract getPlayerEl(): ElementRef;

  constructor() {
    this.setStatus(PlayerStatus.NotInitialised);
    this._viewReadyPromise = new Promise((resolve) => {
      this._viewReadyResolver = resolve;
    });
  }

  protected checkLoginByTrackDuration(trackDuration: number, playerDuration: any) {
    const playerDurationNum = parseInt(playerDuration, 10);
    if (!trackDuration || !playerDuration || !this._currentTime || this._currentTime < 1) {
      return;
    }
    if (trackDuration && playerDurationNum && playerDurationNum < (trackDuration - 10)) {
      this.setAllowedToPlay(false);
      this.setAbleToPlay(false);
      this.pausePlayer();
      this.setStatus(PlayerStatus.LoginRequired);
    }
  }

  protected setDuration(duration: number) {
    if (isNumber(duration) && duration > 0) {
      this._duration = duration;
      this.durationChange.emit({duration: duration, item: this.playQueueItem});
    }
  }

  public getDuration(): number {
    return this._duration;
  }

  private emitTimeChange(time: number) {
    this.currentTimeChange.emit({progress: time, item: this.playQueueItem});
  }

  protected setCurrentTime(currentTime: number): void {
    if (isNumber(currentTime) && currentTime > 0) {
      this._currentTime = currentTime;
      this.emitTimeChange(currentTime);
    }
  }

  public getCurrentTime(): number {
    return this._currentTime;
  }

  protected setStatus(status: PlayerStatus) {
    if (!this._initialised && status !== PlayerStatus.NotInitialised && status !== PlayerStatus.Initialising) {
      /*Make sure that the status NotInitialised can not be overwritted by a delayed promise*/
      return;
    }
    if (this._status !== status) {
      this._status = status;
      this.statusChange.emit({newStatus: status, item: this.playQueueItem});
      this.removeClass(/status-/);
      this.addClass('status-' + status);
    }
  }

  public getStatus(): PlayerStatus {
    return this._status;
  }

  public setVolume(volume: number): void {
    this._volume = volume;
    if (this._initialised) {
      this.setPlayerVolume(volume);
    }
  }

  public getVolume(): number {
    return this._volume;
  }

  public setSize(size: IPlayerSize) {
    this._size = size;
    this.executeOnInitialised(() => {
      this.setPlayerSize(size);
    });
  }

  protected setAllowedToPlay(isAllowed: boolean): void {
    this._allowedToPlay = isAllowed;
  }

  public isAllowedToPlay(): boolean {
    return this._allowedToPlay;
  }

  protected setAbleToPlay(isAble: boolean): void {
    this._ableToPlay = isAble;
  }

  public isAbleToPlay(): boolean {
    return this._ableToPlay;
  }

  protected onDurationUpdate(duration: number) {
    this.setDuration(duration);
  }

  protected onCurrentTimeUpdate(currentTime: number) {
    this.setCurrentTime(currentTime);
  }

  protected onIsAbleToPlay() {
    this.setAbleToPlay(true);
  }

  protected onWaiting() {
    this.setStatus(PlayerStatus.Waiting);
  }

  protected onReady() {
    this.setStatus(PlayerStatus.Ready);
  }

  protected onRequestPlay() {
    this.setStatus(PlayerStatus.RequestPlay);
  }

  protected onPlaying() {
    this.setAbleToPlay(true);
    if (!this.isAllowedToPlay()) {
      this.pause();
    } else {
      this._forcePlayStart = false;
      this._forcePlayStartTry = 0;
      this._seekTo = null;
      this.setStatus(PlayerStatus.Playing);
    }
    this._error = null;
  }

  protected onPaused() {
    if (this._forcePlayStart && this._forcePlayStartTry < 5) {
      this._forcePlayStartTry++;
      this.play(this._seekTo);
    } else {
      this._forcePlayStartTry = 0;
      this.setStatus(PlayerStatus.Paused);
    }
  }

  protected onEnded() {
    this.setStatus(PlayerStatus.Ended);
  }

  protected onStopped() {
    this.setStatus(PlayerStatus.Stopped);
  }

  protected onError(err?: string) {
    if (!navigator.onLine) {
      const onlineListener = () => {
        window.removeEventListener('online', onlineListener);
        this.preload();
        this.seekPlayerTo(this.getCurrentTime());
        this.play();
      };
      window.addEventListener('online', onlineListener.bind(this));
      this.setStatus(PlayerStatus.Waiting);
    } else {
      if (err) {
        this._error = isString(err) ? err : JSON.stringify(err);
      } else {
        this._error = 'The player could not be started because an error occurred';
      }
      this.setStatus(PlayerStatus.Error);
    }
  }

  private resolveOnStatus(requiredStatus: PlayerStatus): Promise<any> {
    if (!this._subscriptionsPerState[requiredStatus]) {
      this._subscriptionsPerState[requiredStatus] = new Promise((resolve) => {
        if (this.getStatus() === requiredStatus) {
          resolve();
          this._subscriptionsPerState[requiredStatus] = null;
        } else {
          const subscription = this.statusChange
            .pipe(
              filter(statusEv => statusEv.newStatus === requiredStatus)
            )
            .subscribe(() => {
              resolve();
              subscription.unsubscribe();
              this._subscriptionsPerState[requiredStatus] = null;
            });
        }
      });
    }

    return this._subscriptionsPerState[requiredStatus];
  }

  private resolveOnOneOfStatus(requiredStates: PlayerStatus[]): Promise<any> {
    const promises = [];
    requiredStates.forEach((status) => {
      promises.push(this.resolveOnStatus(status));
    });
    return Promise.race(promises);
  }

  private executeInitialisingQueue(promiseQueue: Function[]) {
    if (promiseQueue.length > 0) {
      const promise = promiseQueue.shift();
      return Promise.resolve(promise.apply(this)).then(() => {
        return this.executeInitialisingQueue(promiseQueue);
      });
    } else {
      return Promise.resolve();
    }
  }

  private waitForViewReady(): Promise<any> {
    return this._viewReadyPromise;
  }

  private executeOnInitialised(callback: Function) {
    if (this._initialised) {
      callback.apply(this);
    } else {
      this._initialiseCallbacks.push(callback.bind(this));
    }
  }

  private updateTrackDuration(newDuration: number) {
    if (newDuration) {
      this._initialTrackDuration = newDuration;
      this.setDuration(newDuration);
    } else {
      this._initialTrackDuration = null;
    }
  }

  public initialise(options?: IPlayerOptions): Promise<any> {
    this.setCurrentTime(0);
    this.setStatus(PlayerStatus.Initialising);
    if (!this._initialisePromise) {
      this._initialisePromise = new Promise(resolve => {
        const promiseQueue = [];

        if (!this._ngOnInitCompleted) {
          promiseQueue.push(this.waitForViewReady);
        }

        if (!this._playerSdkIsInitialised) {
          promiseQueue.push(this.initialisePlayerSDK);
        }

        if (!this._playerIsInitialised) {
          promiseQueue.push(() => {
            return this.initialisePlayer(options);
          });
        }

        this.updateTrackDuration(this.playQueueItem.track.duration);

        return this.executeInitialisingQueue(promiseQueue).then(() => {
          this._playerSdkIsInitialised = true;
          this._playerIsInitialised = true;
          this._initialised = true;

          this.bindListeners();
          if (isNumber(this.getVolume())) {
            this.setPlayerVolume(this.getVolume());
          }
          this._initialiseCallbacks.forEach((callback: Function) => {
            callback.apply(this);
          });
          this._initialiseCallbacks = [];
          this.setStatus(PlayerStatus.Initialised);
          resolve();
        });
      });
    }

    return this._initialisePromise;
  }

  public deInitialize(): void {
    this.unBindListeners();
    if (this._initialised) {
      this.stop();
      this.deInitialisePlayer();
    }
    this.setDuration(0);
    this._initialised = false;
    this._initialisePromise = null;
    this.setAllowedToPlay(false);
    this.setStatus(PlayerStatus.NotInitialised);
  }

  public preload(startTime?: number): void {
    this.setCurrentTime(startTime);
    this.executeOnInitialised(() => {
      this.preloadTrack(this.playQueueItem.track, startTime);
    });
  }

  public play(from?): Promise<any> {
    this.setCurrentTime(from);
    this.setAllowedToPlay(true);
    this.executeOnInitialised(() => {
      this._forcePlayStart = true;
      if (isNumber(from)) {
        this.seekTo(from);
      }
      this.startPlayer();
    });
    return this.resolveOnStatus(PlayerStatus.Playing);
  }

  public pause(): Promise<any> {
    this._forcePlayStart = false;
    if (this._initialised) {
      this.pausePlayer();
      return this.resolveOnOneOfStatus([PlayerStatus.Stopped, PlayerStatus.Paused]);
    } else {
      return Promise.resolve();
    }
  }

  public stop(): Promise<any> {
    this.setAllowedToPlay(false);
    this._forcePlayStart = false;
    if (this._initialised) {
      this.stopPlayer();
      return this.resolveOnOneOfStatus([PlayerStatus.Stopped, PlayerStatus.Paused]);
    } else {
      return Promise.resolve();
    }
  }

  public seekTo(to: number): Promise<any> {
    this._seekTo = to;
    this.currentTimeChange.emit({progress: to, item: this.playQueueItem});
    this.executeOnInitialised(() => {
      this.seekPlayerTo(to);
    });
    return this.resolveOnStatus(PlayerStatus.Playing);
  }

  public fadeIn(duration: number): Observable<number> {
    const obs: Observable<number> = EaseService.easeInCirc(1, 0, duration);
    const subscription = obs.subscribe(newVal => {
      if (this._initialised) {
        this.setPlayerVolume(this.getVolume() - newVal);
      }
    });
    return obs;
  }

  public fadeOut(duration: number): Observable<number> {
    const obs: Observable<number> = EaseService.easeOutSine(0, 1, duration);
    const subscription = obs.subscribe(newVal => {
      if (this._initialised) {
        this.setPlayerVolume(this.getVolume() - newVal);
      }
    });
    return obs;
  }

  public updatePlayQueueItem(newItem: PlayqueueItemAuxappModel) {
    if (this._playQueueItem && this._playQueueItem.id && newItem.id && this._playQueueItem.id === newItem.id) {
      return Promise.resolve();
    } else {
      this._playQueueItem = newItem;
      return this.updateTrack(this._playQueueItem.track);
    }
  }

  public updateTrack(track: ITrack): Promise<any> {
    if (this.track && this.track.id === track.id) {
      return Promise.resolve();
    } else {
      this.track = track;
      this.setStatus(PlayerStatus.Updating);
      this.updateTrackDuration(track.duration);
      if (this.getStatus() === PlayerStatus.Playing) {
        return this.stop().then(() => {
          this.preload();
        });
      } else {
        this.preload();
        return Promise.resolve();
      }
    }
  }

  public removeClass(className: string | RegExp) {
    if (!this.getPlayerEl() || !this.getPlayerEl().nativeElement) {
      return;
    }
    if (className instanceof RegExp) {
      const removeClassNames: string[] = [];
      this.getPlayerEl().nativeElement.classList.forEach((foundClassName) => {
        if (foundClassName.match(className)) {
          removeClassNames.push(foundClassName);
        }
      });
      removeClassNames.forEach((removeClassName: string) => {
        this.removeClass(removeClassName);
      });
    } else {
      this.getPlayerEl().nativeElement.classList.remove(className);
    }
  }

  public addClass(className: string) {
    if (!this.getPlayerEl() || !this.getPlayerEl().nativeElement) {
      return;
    }
    this.getPlayerEl().nativeElement.classList.add(className);
  }

  public setOpacity(opacity: number) {
    this.getPlayerEl().nativeElement.style.opacity = opacity;
  }

  public getError() {
    return this._error;
  }

  ngOnInit(): void {
    this._viewReadyResolver();
    this._ngOnInitCompleted = true;
    this.initialise();
  }
}
