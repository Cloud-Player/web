import {EventEmitter} from '@angular/core';
import {Track} from '../../tracks/models/track.model';

export interface IPlayer {
  readonly duration: number;
  readonly status: number;
  readonly currentTime: number;
  readonly isBuffering: boolean;
  readonly isInitialised: boolean;
  durationChange: EventEmitter<{}>;
  statusChange: EventEmitter<{}>;
  currentTimeChange: EventEmitter<{}>;
  track: Track;

  initialise(): void;

  play(from?: number): void;

  pause(): void;

  stop();
}
