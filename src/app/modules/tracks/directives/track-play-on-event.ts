import {Directive, ElementRef, OnInit, Input, OnDestroy, Renderer2} from '@angular/core';
import {PlayQueue} from '../../player/collections/play-queue';
import {PlayQueueItem} from '../../player/models/play-queue-item';
import {ITrack} from '../../api/tracks/track.interface';
import {ITracks} from '../../api/tracks/tracks.interface';
import {Subscription} from 'rxjs/Subscription';

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

  constructor(private el: ElementRef, private renderer2: Renderer2) {
    this._subscriptions = new Subscription();
  }

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

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
    const playingItem = this.playQueue.getPlayingItem();
    return (playingItem && playingItem.track.id === this.track.id);
  }

  private play(): void {
    const existingPlayQueueItem = this.playQueue.get(this.track.id);
    if (existingPlayQueueItem) {
      existingPlayQueueItem.play();
    } else {
      this.playQueue.filter((model) => {
        return !model.isQueued();
      }).forEach((model) => {
        this.playQueue.remove(model);
      });

      const playQueueItem: PlayQueueItem = this.playQueue.add({track: this.track});
      playQueueItem.play();

      if (this.tracks) {
        this.tracks.forEach((track: ITrack, index) => {
          if (!this.playQueue.get(track.id)) {
            this.playQueue.add({track: track});
          }
        });
      }
    }
  }

  private pause(): void {
    if (this.isPlaying()) {
      PlayQueue.getInstance().getPlayingItem().pause();
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
