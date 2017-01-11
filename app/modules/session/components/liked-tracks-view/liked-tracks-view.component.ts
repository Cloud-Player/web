import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {Playlist} from '../../../playlists/models/playlist.model';

@Component({
  selector: 'liked-track-view',
  template: require('./liked-tracks-view.template.html'),
  styleUrls: ['./liked-tracks-view.style.scss'],
  providers: [Playlist]
})

export class LikedTracksViewComponent implements OnInit {
  private session = Session.getInstance();

  private user = this.session.get('user');

  ngOnInit(): void {
    this.user.get('likes').fetch({reset: true});
  }

}
