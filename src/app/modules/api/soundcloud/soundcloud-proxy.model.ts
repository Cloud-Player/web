import {AuxappModel} from '../auxapp/auxapp.model';
import {ModelSaveOptions} from 'backbone';

export class SoundcloudProxyModel extends AuxappModel {
  basePath() {
    return '/proxy/soundcloud';
  }

  save(attributes?: any, options: ModelSaveOptions = {}): any {
    options.patch = false;
    return super.save.call(this, attributes, options);
  }
}
