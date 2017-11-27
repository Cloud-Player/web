import {EventEmitter} from '@angular/core';
import {Track} from '../../tracks/models/track.model';
import {Observable} from 'rxjs/Observable';

export interface IPlayer {
  readonly duration: number;
  readonly status: number;
  readonly currentTime: number;
  readonly isInitialised: boolean;
  readonly canPlay: boolean;
  durationChange: EventEmitter<{}>;
  statusChange: EventEmitter<{}>;
  currentTimeChange: EventEmitter<{}>;
  track: Track;
  volume: number;

  initialisePlayerSDK(): Promise<any>;

  initialisePlayer(): Promise<any>;

  bindListeners(): void;

  unBindListeners(): void;

  initialise(): void;

  deInitialize(): void;

  preload(): void;

  play(from?: number): void;

  pause(): void;

  stop();

  seekTo(to: number): void;

  fadeIn(duration: number): Observable<number>;

  fadeOut(duration: number): Observable<number>;

  updateTrack(track: Track);
}
