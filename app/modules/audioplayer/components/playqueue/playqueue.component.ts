/**
 * Created by kaischulz on 30.11.16.
 */

import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';

@Component({
  moduleId: module.id,
  selector: 'play-queue',
  templateUrl: 'playqueue.template.html',
  styleUrls: ['playqueue.style.css']

})

export class PlayQueueComponent implements OnInit {
  private playQueue: PlayQueue;

  constructor() {
    this.playQueue = PlayQueue.getInstance();
  }
}
