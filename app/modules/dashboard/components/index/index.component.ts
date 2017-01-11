import {Component, OnInit} from '@angular/core';

import {Tracks} from '../../../tracks/collections/tracks.collection';
import {Track} from '../../../tracks/models/track.model';

@Component({
  selector: 'my-dashboard',
  template: require('./index.template.html'),
  styleUrls: ['./index.style.scss'],
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
