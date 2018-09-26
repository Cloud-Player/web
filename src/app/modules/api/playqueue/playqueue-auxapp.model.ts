import {AuxappModel} from '../auxapp/auxapp.model';
import {nested} from '../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {PlayqueueItemsAuxappCollection} from './playqueue-item/playqueue-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item/playqueue-item-auxapp.model';
import {PlayQueueItemStatus} from '../../player/src/playqueue-item-status.enum';

export class PlayqueueAuxappModel extends AuxappModel {
  private static instance: PlayqueueAuxappModel;

  endpoint = '/queue';

  @attributesKey('items')
  @nested()
  items: PlayqueueItemsAuxappCollection<PlayqueueItemAuxappModel>;

  static getInstance(): PlayqueueAuxappModel {
    if (!PlayqueueAuxappModel.instance) {
      PlayqueueAuxappModel.instance = new PlayqueueAuxappModel();
    }
    return PlayqueueAuxappModel.instance;
  }

  parse(attributes) {
    delete attributes.items;
    return attributes;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'mine');
    const superCall = super.fetch.apply(this, ...args).then(() => {
      this.items.fetch();
      return this;
    });
    this.set('id', id);
    return superCall;
  }

  save(): any {
    if (this.id) {
      const persistTracks = [];
      this.items.each((item) => {
        if (item.isNew() && !item.isStopped() && !item.isRecommended()) {
          persistTracks.push(item.toJSON());
          item.isSyncing = true;
        }
      });
      return this.request(`${this.url()}/item`, 'POST', {
        data: persistTracks
      }).then((responseItems: Array<any>) => {
        responseItems.forEach((responseItem) => {
          const queueItem = this.items.find((item: PlayqueueItemAuxappModel) => {
            return item.track.id === responseItem.track_id;
          });
          if (queueItem) {
            queueItem.set(PlayqueueItemAuxappModel.prototype.parse.call(queueItem, responseItem));
            queueItem.isSyncing = false;
          }
        });
      });
    }
  }

  destroy() {
    this.items.reset();
    return super.destroy();
  }

  initialize() {
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.items.setEndpoint(this.id);
    });
  }
}

