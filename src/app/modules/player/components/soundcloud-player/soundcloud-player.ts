import {Component, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {IPlayer, IPlayerSize} from '../../src/player.interface';
import {AbstractPlayer} from '../../src/abstract-player.class';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';

@Component({
  selector: 'app-soundcloud-player',
  styleUrls: ['./soundcloud-player.scss'],
  templateUrl: './soundcloud-player.html'
})
export class SoundcloudPlayerComponent extends AbstractPlayer implements IPlayer, OnDestroy {
  private _listeners: Function[] = [];
  private _audio: HTMLAudioElement;

  public bigComments = false;

  @Input()
  public track: TrackSoundcloudModel;

  public supportsMultiplePlayerInstances = true;
  public supportsCrossfade = true;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    super();
  }

  protected bindListeners() {
    this.unBindListeners();
    this._listeners = [
      this.renderer.listen(this._audio, 'canplay', this.onIsAbleToPlay.bind(this)),
      this.renderer.listen(this._audio, 'loadStart', this.onWaiting.bind(this)),
      this.renderer.listen(this._audio, 'waiting', this.onWaiting.bind(this)),
      this.renderer.listen(this._audio, 'playing', this.onPlaying.bind(this)),
      this.renderer.listen(this._audio, 'pause', this.onPaused.bind(this)),
      this.renderer.listen(this._audio, 'ended', this.onEnded.bind(this)),
      this.renderer.listen(this._audio, 'error', this.onError.bind(this)),
      this.renderer.listen(this._audio, 'durationchange', () => {
        this.onDurationUpdate(this._audio.duration);
      }),
      this.renderer.listen(this._audio, 'timeupdate', () => {
        this.onCurrentTimeUpdate(this._audio.currentTime);
      })
    ];
  }

  protected unBindListeners() {
    this._listeners.forEach((unbindListener: Function) => {
      unbindListener();
    });
  }

  protected initialisePlayerSDK(): Promise<any> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected initialisePlayer(): Promise<boolean> {
    return new Promise((resolve) => {
      this._audio = new Audio();
      this._audio.src = this.track.getResourceUrl();
      resolve(true);
    });
  }

  protected deInitialisePlayer(): void {
    this._audio.src = '';
    this.track.comments.reset();
  }

  protected setPlayerVolume(volume: number) {
    volume = volume < 0 ? 0 : volume;
    volume = volume > 1 ? 1 : volume;
    this._audio.volume = volume;
  }

  protected setPlayerSize(size: IPlayerSize) {
    if (size.width >= 720) {
      this.bigComments = true;
    } else {
      this.bigComments = false;
    }
  }

  protected preloadTrack(track: TrackSoundcloudModel) {
    this._audio.src = track.getResourceUrl();
    this._audio.load();
    this.track.comments.fetch();
  }

  protected startPlayer(): void {
    this.onRequestPlay();
    this._audio.play().then(null, (err) => {
      console.warn('Audio Element could not be started!', err);
      this.setAbleToPlay(false);
      this.onPaused();
      this.onError(err);
    });
  }

  protected pausePlayer(): void {
    this._audio.pause();
  }

  protected stopPlayer(): void {
    this._audio.pause();
    this._audio.currentTime = 0;
  }

  protected seekPlayerTo(to: number): void {
    this._audio.currentTime = to;
  }

  public getCoverSize(): ImageSizes {
    return ImageSizes.Large;
  }

  public getPlayerEl(): ElementRef {
    return this.el;
  }

  ngOnDestroy(): void {
    delete this._audio;
  }
}
