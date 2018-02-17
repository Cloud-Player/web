import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {ModelSaveOptions} from 'backbone';

export class SoundcloudProxyModel extends CloudplayerModel {
  basePath() {
    return '/proxy/soundcloud';
  }

  save(attributes?: any, options: ModelSaveOptions = {}): any {
    options.patch = false;
    return super.save.call(this, attributes, options);
  }
}
