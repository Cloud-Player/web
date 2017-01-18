import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  moduleId: module.id,
  selector: 'user-play-list-view',
  templateUrl: 'user-playlist-view.template.html',
  styleUrls: ['user-playlist-view.style.css'],
})

export class UserPlayListViewComponent implements OnInit {
  playlist: AuthenticatedUserPlaylist = new AuthenticatedUserPlaylist();
  session = Session.getInstance();

  constructor(private route: ActivatedRoute) {
  }

  private fetchPlaylist(){
    if(this.session.get('user').authenticated && this.playlist.id){
      this.playlist.fetch();
    }
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.playlist.clear();
      this.playlist.set({id: params.id});
      this.fetchPlaylist();
    });

    this.session.get('user').on('change:authenticated', this.fetchPlaylist(), this);
  }

}
