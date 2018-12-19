import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ITrack} from '../../api/tracks/track.interface';
import {ITracks} from '../../api/tracks/tracks.interface';
import {Subscription} from 'rxjs';
import {ToastService} from '../../shared/services/toast';
import {ToastModel} from '../../shared/models/toast';
import {ToastTypes} from '../../shared/src/toast-types.enum';
import {ClientDetector} from '../../shared/services/client-detector.service';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';
import {PlayQueueItemStatus} from '../../player/src/playqueue-item-status.enum';

@Directive({
  selector: '[appTrackPlayOn]'
})
export class TrackPlayOnEventDirective implements OnInit, OnDestroy {
  private _subscriptions: Subscription;

  @Input()
  appTrackPlayOn: string;

  @Input()
  track: ITrack;

  @Input()
  events: Array<string>;

  @Input()
  tracks: ITracks<ITrack>;

  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private toastService: ToastService,
              private userAnalyticsService: UserAnalyticsService) {
    this._subscriptions = new Subscription();
  }

  private playQueue: PlayqueueAuxappModel = PlayqueueAuxappModel.getInstance();

  private togglePlay() {

    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  private registerListener(event: string) {
    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, event, this.togglePlay.bind(this))
    );
  }

  private isPlaying(): boolean {
    const playingItem = this.playQueue.items.getPlayingItem();
    return (playingItem && playingItem.track.id === this.track.id);
  }

  private showNotSupportedOnMobileToast() {
    const toast = new ToastModel();
    toast.type = ToastTypes.Info;
    toast.title = 'Not supported yet';
    toast.message =
      `Due to mobile browser restrictions the playback of ${this.track.provider_id}
       tracks is not supported on this device yet.
       We are working on a solution.`;
    this.toastService.addToast(toast);
  }

  private play(): void {
    if (ClientDetector.isMobileDevice() && !this.track.supportsMobilePlayBack) {
      this.showNotSupportedOnMobileToast();
      return;
    }
    const existingPlayQueueItem = this.playQueue.items.getItemByTrackId(this.track.id);
    if (existingPlayQueueItem) {
      existingPlayQueueItem.play();
    } else {
      this.playQueue.destroy();
      this.tracks.forEach((track: ITrack) => {
        this.playQueue.items.add({track: track.clone(), status: PlayQueueItemStatus.Scheduled});
      });
      this.playQueue.items.getItemByTrackId(this.track.id).play();
      this.userAnalyticsService.trackEvent('play_track', `${this.track.provider_id}:${this.track.title}`, 'appTrackPlayOn');
    }
  }

  private pause(): void {
    if (this.isPlaying()) {
      this.playQueue.items.getPlayingItem().pause();
    }
  }

  ngOnInit(): void {
    this.el.nativeElement.style.cursor = 'pointer';
    if (this.appTrackPlayOn) {
      this.registerListener(this.appTrackPlayOn);
    } else if (this.events) {
      this.events.forEach((ev: string) => {
        this.registerListener(ev);
      });
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
