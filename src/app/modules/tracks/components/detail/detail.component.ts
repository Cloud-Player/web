import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {Track} from '../../models/track.model';

@Component({
  selector: 'app-my-track-detail',
  styleUrls: ['./detail.style.scss'],
  templateUrl: './detail.template.html'
})

export class TracksDetailComponent implements OnInit {
  public track: Track;
  constructor(private route: ActivatedRoute,
              private location: Location) {
    this.track = new Track();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this.track.set('id', id);
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
