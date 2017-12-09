import {Observable} from 'rxjs/Observable';
import {ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNumber} from 'underscore';
import {PlayerStatus} from './player-status.enum';
import {Track} from '../../tracks/models/track.model';
import {EaseService} from '../../shared/services/ease.service';

export abstract class AbstractPlayer implements OnInit {
  private _duration: number;
  private _currentTime: number;
  private _volume: number;
  private _status: PlayerStatus;
  private _ableToPlay: boolean;
  private _allowedToPlay: boolean;
  private _initialised = false;
  private _initialisePromise: Promise<any>;
  private _seekTo: number;
  private _subscriptionsPerState = {};
  private _viewReadyPromise: Promise<any>;
  private _viewReadyResolver: Function;
  private _ngOnInitCompleted = false;
  private _playerIsInitialised = false;
  private _playerSdkIsInitialised = false;
  private _initialiseCallbacks: Function[] = [];

  @Input()
  public track: Track;

  @Output()
  public durationChange = new EventEmitter();

  @Output()
  public currentTimeChange = new EventEmitter();

  @Output()
  public statusChange = new EventEmitter();

  protected abstract initialisePlayerSDK(): Promise<any>;

  protected abstract initialisePlayer(): Promise<any>;

  protected abstract deInitialisePlayer(): void;

  protected abstract bindListeners(): void;

  protected abstract unBindListeners(): void;

  protected abstract setPlayerVolume(volume: number): void;

  protected abstract startPlayer(): void;

  protected abstract pausePlayer(): void;

  protected abstract stopPlayer(): void;

  protected abstract seekPlayerTo(to: number): void;

  protected abstract preloadTrack(track: Track, startTime?: number): void;

  protected abstract getPlayerEl(): ElementRef;

  constructor() {
    this.setStatus(PlayerStatus.NotInitialised);
    this._viewReadyPromise = new Promise((resolve) => {
      this._viewReadyResolver = resolve;
    });
  }

  protected setDuration(duration: number) {
    if (isNumber(duration) && duration > 0) {
      this._duration = duration;
      this.durationChange.emit(duration);
    }
  }

  public getDuration(): number {
    return this._duration;
  }

  protected setCurrentTime(currentTime: number): void {
    if (isNumber(currentTime) && currentTime > 0) {
      this._currentTime = currentTime;
      this.currentTimeChange.emit(currentTime);
    }
  }

  public getCurrentTime(): number {
    return this._currentTime;
  }

  protected setStatus(status: PlayerStatus) {
    this._status = status;
    this.statusChange.emit(status);
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

  protected onPlaying() {
    this.setAbleToPlay(true);
    if (!this.isAllowedToPlay()) {
      this.pause();
    } else {
      this.setStatus(PlayerStatus.Playing);
    }
  }

  protected onPaused() {
    this.setStatus(PlayerStatus.Paused);
  }

  protected onEnded() {
    this.setStatus(PlayerStatus.Ended);
  }

  protected onStopped() {
    this.setStatus(PlayerStatus.Stopped);
  }

  protected onError() {
    if (!navigator.onLine) {
      const onlineListener = () => {
        window.removeEventListener('online', onlineListener);
        if (this.isAllowedToPlay()) {
          this.preload();
          this.seekPlayerTo(this.getCurrentTime());
          this.play();
        }
      };
      window.addEventListener('online', onlineListener.bind(this));
      this.setStatus(PlayerStatus.Waiting);
    } else {
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
            .filter(newState => newState === requiredStatus)
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

  public initialise(): Promise<any> {
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
          promiseQueue.push(this.initialisePlayer);
        }

        return this.executeInitialisingQueue(promiseQueue).then(() => {
          this._playerSdkIsInitialised = true;
          this._playerIsInitialised = true;

          this.bindListeners();
          if (isNumber(this.getVolume())) {
            this.setPlayerVolume(this.getVolume());
          }
          this._initialiseCallbacks.forEach((callback: Function) => {
            callback.apply(this);
          });
          this._initialiseCallbacks = [];
          this.setStatus(PlayerStatus.Initialised);
          this._initialised = true;
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
      this.preloadTrack(this.track, startTime);
    });
  }

  public play(from?): Promise<any> {
    this.setCurrentTime(from);
    this.setAllowedToPlay(true);
    this.executeOnInitialised(() => {
      if (isNumber(from)) {
        this.seekTo(from);
      }
      this.startPlayer();
    });
    return this.resolveOnStatus(PlayerStatus.Playing);
  }

  public pause(): Promise<any> {
    if (this._initialised) {
      this.pausePlayer();
      return this.resolveOnOneOfStatus([PlayerStatus.Stopped, PlayerStatus.Paused]);
    } else {
      return Promise.resolve();
    }
  }

  public stop(): Promise<any> {
    this.setAllowedToPlay(false);
    if (this._initialised) {
      this.stopPlayer();
      return this.resolveOnOneOfStatus([PlayerStatus.Stopped, PlayerStatus.Paused]);
    } else {
      return Promise.resolve();
    }
  }

  public seekTo(to: number): Promise<any> {
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
    const obs: Observable<number> = EaseService.easeInCirc(0, 1, duration);
    const subscription = obs.subscribe(newVal => {
      if (this._initialised) {
        this.setPlayerVolume(this.getVolume() - newVal);
      }
    });
    return obs;
  }

  public updateTrack(track: Track): Promise<any> {
    if (track.id === this.track.id) {
      return Promise.resolve();
    } else {
      this.setStatus(PlayerStatus.Updating);
      this.track = track;
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
    this.getPlayerEl().nativeElement.classList.add(className);
  }

  ngOnInit(): void {
    this._viewReadyResolver();
    this.initialise();
  }
}
