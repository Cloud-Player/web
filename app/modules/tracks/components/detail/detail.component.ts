import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {Track} from '../../models/track.model';

@Component({
  selector: 'my-track-detail',
  template: require('./detail.template.html'),
  providers: [Track]
})

export class TracksDetailComponent implements OnInit {
  constructor(private track: Track,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.track.set('id', id);
      this.track.fetch().then((track) => {
        console.log(track);
      });
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
