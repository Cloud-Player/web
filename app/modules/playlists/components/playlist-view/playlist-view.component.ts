import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'play-list-view',
  styles: [ require('./playlist-view.style.scss') ],
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
