import {Directive, ElementRef, Renderer, OnInit, Input, SimpleChanges, OnDestroy} from '@angular/core';
import moment = require('moment');
import Timer = NodeJS.Timer;
import {Track} from '../../tracks/models/track.model';
import {Tracks} from '../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../audioplayer/models/play_queue_item.model';

@Directive({
  selector: '[playTrackOn]'
})
export class PlayTrackOnEventDirective implements OnInit{
  private interval: Timer;

  @Input()
  playTrackOn: any;

  @Input()
  track: Track;

  @Input()
  events: Array<String>;

  @Input()
  tracks: Tracks<Track>;

  constructor(private el: ElementRef) {
  }

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private registerListener(event: String){
    this.el.nativeElement.addEventListener(event, ()=>{
      if(this.isPlaying()){
        this.pause();
      } else {
        this.play();
      }
    });
  }

  isPlaying(): boolean {
    let playingItem = this.playQueue.getPlayingItem();
    return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
  }

  play(): void {
    this.playQueue.filter((model) => {
      return !model.isQueued();
    }).forEach((model) => {
      this.playQueue.remove(model);
    });

    if (this.tracks) {
      this.tracks.forEach((track: Track) => {
        if (!this.playQueue.get(track)) {
          this.playQueue.add({track: track});
        }
      });
    }

    let playQueueItem = this.playQueue.add({track: this.track});
    playQueueItem.play();
  }

  pause(): void {
    if (this.isPlaying()) {
      PlayQueue.getInstance().getPlayingItem().pause();
    }
  }

  ngOnInit(): void {
    if(this.playTrackOn){
      this.registerListener(this.playTrackOn);
    } else if(this.events){
      this.events.forEach((ev: String)=>{
        this.registerListener(ev);
      });
    }

  }
}
