import {Component, OnInit} from '@angular/core';

import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'index.template.html',
  styleUrls: ['index.style.scss'],
  providers: [Tracks]
})

export class DashboardIndexComponent implements OnInit {
  title = 'Top Tracks';

  constructor(private tracks: Tracks) {
  }

  ngOnInit(): void {
    this.tracks.fetch();
  }
}
