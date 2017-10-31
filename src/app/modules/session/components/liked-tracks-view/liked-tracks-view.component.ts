import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {Playlist} from '../../../playlists/models/playlist.model';

@Component({
  selector: 'liked-track-view',
  styles: [ require('./liked-tracks-view.style.scss') ],
  template: require('./liked-tracks-view.template.html'),
  providers: [Playlist]
})

export class LikedTracksViewComponent implements OnInit {
  private session = Session.getInstance();

  private user = this.session.get('user');

  ngOnInit(): void {
    if(this.user.get('authenticated')){
      this.user.get('likes').fetch({reset: true});
    }
  }

}
