import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'app-play-list-view',
  styleUrls: ['./playlist-view.style.scss'],
  templateUrl: './playlist-view.template.html'
})

export class PlayListViewComponent implements OnInit {
  playlist: Playlist;
  constructor(private route: ActivatedRoute) {
    this.playlist = new Playlist();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.playlist.clear();
      this.playlist.set({id: params.id});
      this.playlist.fetch();
    });
  }

}
