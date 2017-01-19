import {Component, OnInit} from '@angular/core';

import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';
import '!!style!css!sass!./index.style.scss';

@Component({
  selector: 'my-dashboard',
  styles: [ require('./index.style.scss') ],

  template: require('./index.template.html'),
  providers: [Tracks]
})

export class DashboardIndexComponent implements OnInit {
  title = 'Top Tracks';

  constructor(private tracks: Tracks<Track>) {
  }

  ngOnInit(): void {
    this.tracks.fetch();
  }
}
