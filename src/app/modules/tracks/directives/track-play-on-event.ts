import {Directive, ElementRef, OnInit, Input, OnDestroy} from '@angular/core';
import {Tracks} from '../collections/tracks';
import {Track} from '../models/track';
import {PlayQueue} from '../../player/collections/play-queue';
import {PlayQueueItem} from '../../player/models/play-queue-item';

@Directive({
  selector: '[appTrackPlayOn]'
})
export class TrackPlayOnEventDirective implements OnInit, OnDestroy {
  @Input()
  appTrackPlayOn: String;

  @Input()
  track: Track;

  @Input()
  events: Array<String>;

  @Input()
  tracks: Tracks<Track>;

  constructor(private el: ElementRef) {
  }

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private togglePlay() {

    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  private registerListener(event: String) {
    this.el.nativeElement.addEventListener(event, this.togglePlay.bind(this));
  }

  private unRegisterListener(event: String) {
    this.el.nativeElement.removeEventListener(event, this.togglePlay.bind(this));
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

      if (this.tracks) {
        this.tracks.forEach((track: Track, index) => {
          if (!this.playQueue.get(track)) {
            this.playQueue.add({track: track});
          }
        });
      }

      const playQueueItem: PlayQueueItem = this.playQueue.add({track: this.track});
      playQueueItem.play();
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
      this.events.forEach((ev: String) => {
        this.registerListener(ev);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.appTrackPlayOn) {
      this.unRegisterListener(this.appTrackPlayOn);
    } else if (this.events) {
      this.events.forEach((ev: String) => {
        this.unRegisterListener(ev);
      });
    }
  }
}
