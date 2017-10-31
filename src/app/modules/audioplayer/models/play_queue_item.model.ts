import {Track} from '../../tracks/models/track.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';

export class PlayQueueItem extends SoundcloudModel {

  defaults() {
    return {
      status: 'NULL'
    };
  }

  nested() {
    return {
      track: Track
    };
  }

  queue(): void {
    this.set({
      status: 'QUEUED'
    });
  }

  unQueue(): void {
    this.set({
      status: 'NULL'
    });
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this);
      collection.add(this);
    }
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
