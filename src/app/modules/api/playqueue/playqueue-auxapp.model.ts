import {AuxappModel} from '../auxapp/auxapp.model';
import {nested} from '../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {PlayqueueItemsAuxappCollection} from './playqueue-item/playqueue-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item/playqueue-item-auxapp.model';
import {ITrack} from '../tracks/track.interface';

export class PlayqueueAuxappModel extends AuxappModel {
  private static instance: PlayqueueAuxappModel;

  endpoint = '/queue';

  @attributesKey('items')
  @nested()
  items: PlayqueueItemsAuxappCollection<PlayqueueItemAuxappModel>;

  private initialItem: PlayqueueItemAuxappModel;

  static getInstance(): PlayqueueAuxappModel {
    if (!PlayqueueAuxappModel.instance) {
      PlayqueueAuxappModel.instance = new PlayqueueAuxappModel();
    }
    return PlayqueueAuxappModel.instance;
  }

  public setInitialTrack(track: ITrack, startTime: number = 0) {
    this.initialItem = new PlayqueueItemAuxappModel({track: track.clone(), progress: startTime});
  }

  parse(attributes) {
    delete attributes.items;
    return attributes;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'mine', {silent: true});
    const superCall = super.fetch.apply(this, ...args).then(() => {
      if (this.initialItem) {
        this.items.setInitialItem(this.initialItem);
      }
      this.items.fetch().then(() => {
        this.initialItem = null;
      });
      return this;
    });
    this.set('id', id, {silent: true});
    return superCall;
  }

  save(): any {
    if (this.id) {
      const persistTracks = [];
      this.items.each((item) => {
        if (item.isNew() && !item.isRecommended()) {
          persistTracks.push(item.toJSON());
          item.isSyncing = true;
        }
      });
      if (persistTracks.length === 0) {
        return new Promise((resolve) => {
          resolve(this);
        });
      }
      return this.request(`${this.url()}/item`, 'POST', {
        data: persistTracks
      }).then((responseItems: Array<any>) => {
        responseItems.forEach((responseItem) => {
          const queueItems = this.items.filter((item: PlayqueueItemAuxappModel) => {
            return item.track.id === responseItem.track_id;
          });
          queueItems.forEach((queueItem) => {
            delete responseItem.progress;
            queueItem.set(PlayqueueItemAuxappModel.prototype.parse.call(queueItem, responseItem));
            queueItem.isSyncing = false;
          });
        });
      });
    }
  }

  destroy() {
    this.items.reset();
    let destroyPromise = super.destroy();
    if (!destroyPromise) {
      destroyPromise = Promise.resolve();
    }
    return destroyPromise;
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

