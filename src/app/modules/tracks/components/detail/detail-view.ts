import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {TrackSoundcloudModel} from '../../../api/tracks/track-soundcloud.model';

@Component({
  selector: 'app-track-detail-view',
  styleUrls: ['./detail-view.scss'],
  templateUrl: './detail-view.html'
})

export class TrackDetailViewComponent implements OnInit {
  public track: TrackSoundcloudModel;

  constructor(private route: ActivatedRoute,
              private location: Location) {
    this.track = new TrackSoundcloudModel();
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
