import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';

@Component({
  moduleId: module.id,
  selector: 'play-list',
  templateUrl: 'playlist.template.html',
  styleUrls: ['playlist.style.css'],
  providers: [Tracks]
})

export class PlayListComponent {

  @Input() tracks: Tracks;

  constructor(private router: Router) { }

  gotoDetail(track: Track): void {
    let link = ['/tracks', track.id];
    this.router.navigate(link);
  }

}
