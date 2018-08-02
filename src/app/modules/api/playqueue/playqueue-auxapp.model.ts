import {AuxappModel} from '../auxapp/auxapp.model';
import {nested} from '../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {PlayqueueItemsAuxappCollection} from './playqueue-item/playqueue-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item/playqueue-item-auxapp.model';

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

  save() {
    if (this.id) {
      let index = 0;
      this.items.each((item) => {
        if (index < 3) {
          item.save();
        }
        index++;
      });
    }
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

