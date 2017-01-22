import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Session} from '../../models/session.model';
import {AuthenticatedUserPlaylist} from '../../models/authenticated_user_playlist.model';

@Component({
  selector: 'user-play-list-view',
  template: require('./user-playlist-view.template.html'),
  styles: [require('./user-playlist-view.style.scss')]
})

export class UserPlayListViewComponent implements OnInit {
  playlist: AuthenticatedUserPlaylist = new AuthenticatedUserPlaylist();
  session = Session.getInstance();

  constructor(private route: ActivatedRoute) {
  }

  private fetchPlaylist() {
    if (this.session.isValid() && this.playlist.id) {
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
