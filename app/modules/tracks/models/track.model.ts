import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {SoundcloudImageModel} from '../../main/models/soundcloud-image.model';
import {PlayQueue} from '../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../audioplayer/models/play_queue_item.model';

@Injectable()
export class Track extends SoundcloudModel {
  endpoint = '/tracks';

  private setIsUserFavourited(): void {
    if (this.get('id') && Session.getInstance().get('user').get('likes').length > 0) {
      if (Session.getInstance().get('user').get('likes').findWhere({id: this.id})) {
       this.set('user_favorite', true);
      } else {
        this.set('user_favorite', false);
      }
    }
  }

  nested() {
    return {
      user: User,
      artwork_url: SoundcloudImageModel
    };
  }

  getResourceUrl(): string {
    return `${this.get('stream_url')}?client_id=${this.clientId}`;
  }

  isPlaying(): boolean {
    let playingItem = PlayQueue.getInstance().getPlayingItem();
    return (playingItem && playingItem.get('track').get('id') === this.get('id'));
  }

  play(): void {
    PlayQueue.getInstance().addAndPlay({track: this.toJSON()});
  }

  pause(): void {
    if (this.isPlaying()) {
      PlayQueue.getInstance().getPlayingItem().pause();
    }
  }

  queue(): void {
    PlayQueue.getInstance().queue({track: this.toJSON()});
  }

  isQueued(): boolean {
    let queuedItems = PlayQueue.getInstance().getQueuedItems();
    if (queuedItems && queuedItems.find((item: PlayQueueItem) => {
        return item.get('track').get('id') === this.id;
      })) {
      return true;
    } else {
      return false;
    }
  }

  initialize() {
    Session.getInstance().get('user').get('likes').on('add remove reset', this.setIsUserFavourited, this);
    this.on('change:id', this.setIsUserFavourited, this);
    this.setIsUserFavourited();
  }
}
