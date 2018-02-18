import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ITrack} from '../../api/tracks/track.interface';

export interface IPlayerSize {
  height: number;
  width: number;
}

export interface IPlayerOptions {
  size: IPlayerSize;
}

export interface IPlayer {
  durationChange: EventEmitter<{}>;
  statusChange: EventEmitter<{}>;
  currentTimeChange: EventEmitter<{}>;
  track: ITrack;

  getDuration(): number;

  getStatus(): number;

  getCurrentTime(): number;

  isAbleToPlay(): boolean;

  initialise(options?: IPlayerOptions): Promise<any>;

  deInitialize(): void;

  preload(startTime?: number): void;

  play(from?: number): Promise<any>;

  pause(): Promise<any>;

  stop(): Promise<any>;

  seekTo(to: number): Promise<any>;

  setVolume(volume: number): void;

  getVolume(volume: number): void;

  fadeIn(duration: number): Observable<number>;

  fadeOut(duration: number): Observable<number>;

  updateTrack(track: ITrack): Promise<any>;

  addClass(className: string): void;

  removeClass(className: string | RegExp): void;

  getError(): string;

  setSize(size: IPlayerSize): void;

  setOpacity(opacity: number): void;
}
