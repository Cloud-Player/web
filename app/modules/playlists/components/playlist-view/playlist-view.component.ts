import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Playlist} from '../../models/playlist.model';

@Component({
  moduleId: module.id,
  selector: 'play-list-view',
  templateUrl: 'playlist-view.template.html',
  styleUrls: ['playlist-view.style.css'],
  providers: [Playlist]
})

export class PlayListViewComponent implements OnInit{
  constructor(private route: ActivatedRoute,private playlist: Playlist) { }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.playlist.clear();
      this.playlist.set({id: params.id});
      this.playlist.fetch();
    });
  }

}
