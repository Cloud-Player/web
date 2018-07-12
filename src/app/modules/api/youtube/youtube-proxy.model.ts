import {AuxappModel} from '../auxapp/auxapp.model';
import {ModelSaveOptions} from 'backbone';

export class YoutubeProxyModel extends AuxappModel {
  basePath() {
    return '/proxy/youtube';
  }

  sync(method: string, model: any, options: any = {}) {
    const id = model.get(model.idAttribute);
    model.queryParams.id = id;
    this.set(this.idAttribute, null, {silent: true});
    options.url = this.url();
    this.set(this.idAttribute, id, {silent: true});
    const superCall = super.sync.call(this, method, model, options);
    delete model.queryParams.id;
    return superCall;
  }

  save(attributes?: any, options: ModelSaveOptions = {}): Promise<any> {
    options.patch = false;
    return super.save.call(this, attributes, options);
  }
}
