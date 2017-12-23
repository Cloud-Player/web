import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {Track} from '../../models/track';
import {TrackSoundcloud} from '../../models/track-soundcloud';

@Component({
  selector: 'app-track-detail-view',
  styleUrls: ['./detail-view.scss'],
  templateUrl: './detail-view.html'
})

export class TrackDetailViewComponent implements OnInit {
  public track: Track;

  constructor(private route: ActivatedRoute,
              private location: Location) {
    this.track = new TrackSoundcloud();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.track.id = params['id'];
      this.track.fetch();
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.track.save(null, {wait: true})
      .then(() => this.goBack());
  }
}
