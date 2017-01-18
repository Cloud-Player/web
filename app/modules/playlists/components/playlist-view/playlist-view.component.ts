import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Playlist} from '../../models/playlist.model';
import './playlist-view.style.scss';

@Component({
  selector: 'play-list-view',
  template: require('./playlist-view.template.html'),
  providers: [Playlist]
})

export class PlayListViewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private playlist: Playlist) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.playlist.clear();
      this.playlist.set({id: params.id});
      this.playlist.fetch();
    });
  }

}
