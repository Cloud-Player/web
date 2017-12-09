import {
  Component, ElementRef, OnDestroy, OnInit, Renderer2
} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {CoverSizes} from '../../../shared/components/track-cover/track-cover.component';
import {IPlayer} from '../../src/player.interface';
import {AbstractPlayer} from '../../src/abstract-player.class';

@Component({
  selector: 'app-soundcloud-player',
  styleUrls: ['./soundcloud-player.scss'],
  templateUrl: './soundcloud-player.html'
})
export class SoundcloudPlayerComponent extends AbstractPlayer implements IPlayer, OnDestroy {
  private _listeners: Function[] = [];
  private _audio: HTMLAudioElement;

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
    this._audio.volume = volume;
  }

  protected preloadTrack(track: Track) {
    this._audio.src = track.getResourceUrl();
    this._audio.load();
    this.track.comments.fetch();
  }

  protected startPlayer(): void {
    this._audio.play().then(null, () => {
      console.warn('Audio Element could not be started!');
      this.setAbleToPlay(false);
      this.onStopped();
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

  public getCoverSize(): CoverSizes {
    return CoverSizes.Large;
  }

  public getPlayerEl(): ElementRef {
    return this.el;
  }

  ngOnDestroy(): void {
    delete this._audio;
  }
}
