import {ElementRef, EventEmitter} from '@angular/core';
import {Track} from '../../tracks/models/track.model';
import {Observable} from 'rxjs/Observable';

export interface IPlayer {
  durationChange: EventEmitter<{}>;
  statusChange: EventEmitter<{}>;
  currentTimeChange: EventEmitter<{}>;
  track: Track;

  getDuration(): number;

  getStatus(): number;

  getCurrentTime(): number;

  isAbleToPlay(): boolean;

  initialise(options?: { preload: boolean }): Promise<any>;

  deInitialize(): void;

  preload(): void;

  play(from?: number): Promise<any>;

  pause(): Promise<any>;

  stop(): Promise<any>;

  seekTo(to: number): Promise<any>;

  setVolume(volume: number): void;

  getVolume(volume: number): void;

  fadeIn(duration: number): Observable<number>;

  fadeOut(duration: number): Observable<number>;

  updateTrack(track: Track): Promise<any>;

  addClass(className: string): void;

  removeClass(className: string|RegExp): void;
}
