import {Component, OnInit} from '@angular/core';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';

@Component({
  selector: 'cloud-player',
  styles: [require('./main.style.scss')],
  template: require('./main.template.html')
})

export class MainComponent implements OnInit {

  private playQueue: PlayQueue<PlayQueueItem>;
  private isAuthenticated: boolean = false;
  private item: PlayQueueItem;
  private session: Session;
  private track: Track;

  constructor() {
    this.session = Session.getInstance();
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.item = this.playQueue.getCurrentItem();
    this.playQueue.on('add change:status', () => {
      if (this.playQueue.hasCurrentItem()) {
        this.item = this.playQueue.getCurrentItem();
        this.track = this.item.get('track');
      }
    });
    this.session.get('user').on('change:authenticated', (user: User) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.get('user'));
    }
  }

  private setAuthenticated(user: User) {
    if (user.get('authenticated')) {
      user.fetch().then(() => {
        this.isAuthenticated = true;
        user.get('likes').fetch();
      });
    } else {
      this.isAuthenticated = false;
    }
  };
}
