import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';

@Component ({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'index.template.html',
  styleUrls: ['index.style.scss']
})

export class AudioPlayerComponent implements OnInit {

  private playQueue: PlayQueue;
  private track: any;

  constructor() {
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.track = this.playQueue.getCurrentTrack();
  }

}
