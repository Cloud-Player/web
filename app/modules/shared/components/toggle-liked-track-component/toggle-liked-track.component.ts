import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Session} from '../../../session/models/session.model';
import './toggle-liked-track.style.scss';

@Component({
  selector: 'toggle-liked-track',
  template: require('./toggle-liked-track.template.html'),
  styleUrls: ['/toggle-liked-track.style.css']
})
export class ToggleLikedTrackComponent {

  @Input() track: Track;

  hasLikedTrack(): boolean {
    if (this.track && this.track.get('id') && Session.getInstance().get('user').get('likes').length > 0) {
      return !!Session.getInstance().get('user').get('likes').findWhere({id: this.track.id});
    }
  }

  like(): void {
    Session.getInstance().get('user').get('likes').create(this.track.toJSON());
  }

  dislike(): void {
    let likedTrack = Session.getInstance().get('user').get('likes').get(this.track.toJSON());
    if (likedTrack) {
      likedTrack.destroy();
    }
  }

  toggleLike(): void {
    if (!this.hasLikedTrack()) {
      this.like();
    } else {
      this.dislike();
    }
  }

}
