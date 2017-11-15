import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer, Renderer2} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {PlayerStatus} from '../../enums/player-status';
import {IPlayer} from '../../interfaces/player';

@Component({
  selector: 'app-soundcloud-player',
  styleUrls: ['./soundcloud-player.scss'],
  templateUrl: './soundcloud-player.html'
})
export class SoundcloudPlayerComponent implements IPlayer, OnDestroy {
  private _initialised = false;
  private _buffering = false;
  private _duration: number;
  private _currentTime: number;
  private _status: PlayerStatus;
  private _audio: HTMLAudioElement;
  private _listeners: Function[];

  constructor(private renderer: Renderer2) {
    this._audio = new Audio();
    this._listeners = [
      this.renderer.listen(this._audio, 'canplay', () => {
        this.setDuration(this._audio.duration);
        this.setBuffering(false);
        this.setStatus(PlayerStatus.Ready);
      }),
      this.renderer.listen(this._audio, 'timeupdate', () => {
        this.setCurrentTime(this._audio.currentTime);
      }),
      this.renderer.listen(this._audio, 'loadStart', () => {
        this.setBuffering(true);
        this.setStatus(PlayerStatus.Waiting);
      }),
      this.renderer.listen(this._audio, 'waiting', () => {
        this.setBuffering(true);
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

  private setBuffering(isBuffering: boolean) {
    this._buffering = isBuffering;
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

  public get isBuffering(): boolean {
    return this._buffering;
  }

  public get isInitialised(): boolean {
    return this._initialised;
  }

  public initialise(): void {
    this._audio.src = this.track.getResourceUrl();
    this._audio.load();
    this._initialised = true;
  }

  public play(from: number = 0): void {
    if (!this._initialised) {
      this.initialise();
    }
    this._audio.currentTime = from;
    this._audio.play();
    this._audio.volume = 0.1;
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

  ngOnDestroy(): void {
    this._listeners.forEach((unbindListener: Function) => {
      unbindListener();
    });
    this.stop();
    this._audio.src = '';
    delete this._audio;
  }
}
