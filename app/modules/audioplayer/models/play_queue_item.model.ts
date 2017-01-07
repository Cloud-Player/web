import {Track} from '../../tracks/models/track.model';
import {BaseModel} from '../../backbone/models/base.model';

export class PlayQueueItem extends BaseModel {

  defaults() {
    return {
      status: 'NULL'
    };
  }

  nested(){
    return {
      track: Track
    };
  };

  queue(): void {
    this.set({
      status: 'QUEUED'
    });
  }

  play(): void {
    this.set('status', 'PLAYING');
  }

  pause(): void {
    this.set('status', 'PAUSED');
  }

  stop(): void {
    this.set('status', 'STOPPED');
  }

  isQueued(): boolean {
    return this.get('status') === 'QUEUED' || this.isPlaying() || this.isPaused();
  }

  isPlaying(): boolean {
    return this.get('status') === 'PLAYING';
  }

  isPaused(): boolean {
    return this.get('status') === 'PAUSED';
  }

  isStopped(): boolean {
    return this.get('status') === 'STOPPED';
  }

  isScheduled(): boolean {
    return this.get('status') === 'NULL';
  }
}
