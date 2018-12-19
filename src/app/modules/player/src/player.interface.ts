import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {ITrack} from '../../api/tracks/track.interface';
import {PlayerStatus} from './player-status.enum';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';

export interface IPlayerSize {
  height: number;
  width: number;
}

export interface IPlayerOptions {
  size: IPlayerSize;
}

export interface IPlayerUpdates {
  durationChange: EventEmitter<{duration: number, item: PlayqueueItemAuxappModel}>;
  statusChange: EventEmitter<{ newStatus: PlayerStatus, item: PlayqueueItemAuxappModel }>;
  currentTimeChange: EventEmitter<{progress: number, item: PlayqueueItemAuxappModel}>;
}

export interface IPlayer extends IPlayerUpdates{
  playQueueItem: PlayqueueItemAuxappModel;
  supportsMultiplePlayerInstances: boolean;
  supportsCrossfade: boolean;
  isHeadlessPlayer: boolean;

  getDuration(): number;

  getStatus(): PlayerStatus;

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

  updatePlayQueueItem(item: PlayqueueItemAuxappModel): Promise<any>;

  addClass(className: string): void;

  removeClass(className: string | RegExp): void;

  getError(): string;

  setSize(size: IPlayerSize): void;

  setOpacity(opacity: number): void;
}
