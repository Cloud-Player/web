import {Track} from '../../tracks/models/track.model';

export class PlayQueueItem extends Track {

  defaults() {
    return _.extend(super.defaults(), {
      status: 'NULL'
    });
  }

  queue(priority: number): void {
    this.set({
      status: 'QUEUED',
      prirotiy: priority
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
    return this.get('status') === 'QUEUED';
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
