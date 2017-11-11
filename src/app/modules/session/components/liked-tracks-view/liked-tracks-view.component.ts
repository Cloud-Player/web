import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';

@Component({
  selector: 'app-liked-track-view',
  styleUrls: ['./liked-tracks-view.style.scss'],
  templateUrl: './liked-tracks-view.template.html'
})

export class LikedTracksViewComponent implements OnInit {
  private session = Session.getInstance();
  public user = this.session.user;

  ngOnInit(): void {
    if (this.user.authenticated) {
      this.user.likes.fetch({reset: true});
    }
  }

}
