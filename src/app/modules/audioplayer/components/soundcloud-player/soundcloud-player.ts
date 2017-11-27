import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer, Renderer2} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {PlayerStatus} from '../../enums/player-status';
import {IPlayer} from '../../interfaces/player';
import {EaseService} from '../../../shared/services/ease.service';
import {Observable} from 'rxjs/Observable';
import {CoverSizes} from '../../../shared/components/track-cover/track-cover.component';

@Component({
  selector: 'app-soundcloud-player',
  styleUrls: ['./soundcloud-player.scss'],
  templateUrl: './soundcloud-player.html'
})
export class SoundcloudPlayerComponent implements IPlayer, OnDestroy, OnInit {
  private _initialised = false;
  private _duration: number;
  private _currentTime: number;
  private _status: PlayerStatus;
  private _audio: HTMLAudioElement;
  private _listeners: Function[] = [];
  private _volume: number;
  private _initialisePlayerPromise;
  private _initialisePromise;

  constructor(private renderer: Renderer2) {
    this._audio = new Audio();
    this.setStatus(PlayerStatus.NotInitialised);
  }

  public canPlay: boolean;

  @Input()
  public track: Track;

  @Output()
  public durationChange = new EventEmitter();

  @Output()
  public currentTimeChange = new EventEmitter();

  @Output()
  public statusChange = new EventEmitter();

  private setDuration(duration: number) {
    this._duration = duration;
    this.durationChange.emit(duration);
  }

  private setCurrentTime(currentTime: number): void {
    this._currentTime = currentTime;
    this.currentTimeChange.emit(currentTime);
  }

  private setStatus(status: PlayerStatus) {
    this._status = status;
    this.statusChange.emit(status);
  }

  public bindListeners() {
    this.unBindListeners();
    this._listeners = [
      this.renderer.listen(this._audio, 'canplay', () => {
        this.setStatus(PlayerStatus.Ready);
        this.canPlay = true;
      }),
      this.renderer.listen(this._audio, 'durationchange', () => {
        this.setDuration(this._audio.duration);
      }),
      this.renderer.listen(this._audio, 'timeupdate', () => {
        this.setCurrentTime(this._audio.currentTime);
      }),
      this.renderer.listen(this._audio, 'loadStart', () => {
        this.setStatus(PlayerStatus.Waiting);
      }),
      this.renderer.listen(this._audio, 'waiting', () => {
        this.setStatus(PlayerStatus.Waiting);
      }),
      this.renderer.listen(this._audio, 'playing', () => {
        this.setStatus(PlayerStatus.Playing);
      }),
      this.renderer.listen(this._audio, 'ended', () => {
        this.setStatus(PlayerStatus.Ended);
      }),
      this.renderer.listen(this._audio, 'error', () => {
        this.setStatus(PlayerStatus.Error);
      })
    ];
  }

  public unBindListeners() {
    this._listeners.forEach((unbindListener: Function) => {
      unbindListener();
    });
  }

  public get volume(): number {
    return this._volume;
  }

  public set volume(volume: number) {
    this._volume = volume;
    this._audio.volume = volume;
  }

  public get duration(): number {
    return this._duration;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public get status(): PlayerStatus {
    return this._status;
  }

  public get isInitialised(): boolean {
    return this._initialised;
  }

  public initialisePlayerSDK(): Promise<any> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  public initialisePlayer(): Promise<boolean> {
    if (!this._initialisePlayerPromise) {
      this._initialisePlayerPromise =
        new Promise((resolve) => {
          if (this._initialised) {
            resolve(true);
            this._initialisePlayerPromise = null;
          } else {
            this._initialised = true;
            this._audio.src = this.track.getResourceUrl();
            resolve(true);
            this._initialisePlayerPromise = null;
          }
        });
    }

    return this._initialisePlayerPromise;
  }

  public preload() {
    this._audio.load();
  }

  public initialise(): Promise<any> {
    if (!this._initialisePromise) {
      this._initialisePromise = new Promise(resolve => {
        if (this._initialised) {
          resolve();
          this._initialisePromise = null;
        } else {
          this._initialisePromise =
            this.initialisePlayerSDK().then(() => {
              this.initialisePlayer().then(() => {
                this._initialised = true;
                this.volume = this.volume;
                this.preload();
                this.pause();
                this.bindListeners();
                this.setStatus(PlayerStatus.Idle);
                resolve();
                this._initialisePromise = null;
              });
            });
        }
      });
    }

    return this._initialisePromise;
  }

  public seekTo(to: number) {
    this._audio.currentTime = to;
    this._audio.play();
  }

  public play(from: number = 0): void {
    this.initialise().then(() => {
      if (from) {
        this.seekTo(from);
      } else {
        this._audio.play();
      }
    });
  }

  public pause(): void {
    this._audio.pause();
    this.setStatus(PlayerStatus.Paused);
  }

  public stop(): void {
    this._audio.pause();
    this._audio.currentTime = 0;
    this.setStatus(PlayerStatus.Stopped);
  }

  public getCoverSize(): CoverSizes {
    return CoverSizes.Large;
  }

  public fadeIn(duration: number): Observable<number> {
    if (this.status === PlayerStatus.Waiting
    ) {
      this.statusChange
        .filter(event => event === PlayerStatus.Ready)
        .subscribe(() => {
          this.fadeIn(duration);
          this.statusChange.unsubscribe();
        });
    } else {
      const obs: Observable<number> = EaseService.easeInCirc(1, 0, duration);
      obs.subscribe(newVal => {
        if (this._audio) {
          this._audio.volume = this.volume - newVal;
        }
      });
      return obs;
    }
  }

  public fadeOut(duration: number): Observable<number> {
    const obs: Observable<number> = EaseService.easeInCirc(0, 1, duration);
    obs.subscribe(newVal => {
      if (this._audio) {
        this._audio.volume = this.volume - newVal;
      }
    });
    return obs;
  }

  public updateTrack(track: Track) {
    if (track && track.id === this.track.id) {
      return;
    }
    this.deInitialize();
    this.track = track;
    this.initialise();
    this.play();
  }

  public deInitialize(): void {
    this.setStatus(PlayerStatus.NotInitialised);
    this.unBindListeners();
    this.stop();
    this._audio.src = '';
    this.track.comments.reset();
    this._initialisePromise = null;
    this._initialisePlayerPromise = null;
    this._initialised = false;
    this._duration = null;
  }

  ngOnInit(): void {
    this.track.comments.fetch();
    this.initialise();
  }

  ngOnDestroy(): void {
    delete this._audio;
  }
}
