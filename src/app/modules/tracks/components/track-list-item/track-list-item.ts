import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PlayQueue} from '../../../player/collections/play-queue';
import {PlayQueueItem} from '../../../player/models/play-queue-item';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {debounce} from 'underscore';

@Component({
  selector: 'app-track-list-item',
  styleUrls: ['./track-list-item.scss'],
  templateUrl: './track-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackListItemComponent implements OnInit, OnDestroy {

  @Input() track: ITrack;

  @Input() tracks: ITracks<ITrack>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();
  private _debouncedUpdate: Function;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this._debouncedUpdate = debounce(this.update.bind(this), 10);
  }

  private update() {
    this.cdr.detectChanges();
  }

  gotoDetail(track: ITrack): void {
    const link = ['/tracks', track.id];
    this.router.navigate(link);
  }

  addToQueue(track: ITrack) {
    this.playQueue.queue({track: track});
  }

  removeFromQueue(track: ITrack) {
    const playQueueItem = this.playQueue.get(track);
    if (playQueueItem) {
      return playQueueItem.unQueue();
    }
  }

  isQueued() {
    const playQueueItem = this.playQueue.get(this.track);
    if (playQueueItem) {
      return playQueueItem.isQueued();
    } else {
      return false;
    }
  }

  getSize() {
    if (ClientDetector.isMobileDevice()) {
      return ImageSizes.Small;
    } else {
      return ImageSizes.Medium;
    }
  }

  ngOnInit() {
    this.track.on('change', this._debouncedUpdate, this);
    this.playQueue.on('change:status remove', this._debouncedUpdate, this);
  }

  ngOnDestroy() {
    this.track.off('change', this._debouncedUpdate, this);
    this.playQueue.off('change:status remove', this._debouncedUpdate, this);
  }
}
