import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {ImageSizes} from '../../../shared/src/image-sizes.enum';
import {ITracks} from '../../../api/tracks/tracks.interface';
import {ITrack} from '../../../api/tracks/track.interface';
import {debounce} from 'underscore';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {PlayqueueAuxappModel} from '../../../api/playqueue/playqueue-auxapp.model';

@Component({
  selector: 'app-track-list-item',
  styleUrls: ['./track-list-item.scss'],
  templateUrl: './track-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackListItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() track: ITrack;

  @Input() tracks: ITracks<ITrack>;

  private playQueue: PlayqueueAuxappModel = PlayqueueAuxappModel.getInstance();
  private _debouncedUpdate: Function;

  public providerMap: ProviderMap = ProviderMap.map;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this._debouncedUpdate = debounce(this.update.bind(this), 10);
  }

  private update() {
    this.cdr.detectChanges();
  }

  private bindTrackChangeListener(track) {
    track.on('change sync', this._debouncedUpdate, this);
  }

  private unBindTrackChangeListener(track) {
    track.off('change sync', this._debouncedUpdate, this);
  }

  gotoDetail(track: ITrack): void {
    const link = ['/tracks', track.id];
    this.router.navigate(link);
  }

  addToQueue(track: ITrack) {
    const existingTrack = this.playQueue.items.getItemByTrackId(track.id);
    if (existingTrack) {
      existingTrack.queue();
    } else {
      this.playQueue.items.queue({track: track});
    }
  }

  removeFromQueue(track: ITrack) {
    const playQueueItem = this.playQueue.items.getItemByTrackId(track.id);
    if (playQueueItem) {
      return playQueueItem.unQueue();
    }
  }

  isQueued() {
    const playQueueItem = this.playQueue.items.getItemByTrackId(this.track.id);
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
    this.bindTrackChangeListener(this.track);
    this.playQueue.items.on('change:status add remove', this._debouncedUpdate, this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.track && changes.track.previousValue) {
      this.unBindTrackChangeListener(changes.track.previousValue);
    }
    if (changes.track && changes.track.currentValue) {
      this.bindTrackChangeListener(changes.track.currentValue);
    }
    this._debouncedUpdate();
  }

  ngOnDestroy() {
    this.unBindTrackChangeListener(this.track);
    this.playQueue.items.off('change:status add remove', this._debouncedUpdate, this);
  }
}
